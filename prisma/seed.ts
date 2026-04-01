import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

// Helper: create modules + lessons for a course (skips if modules already exist)
async function seedCourseContent(
  courseId: string,
  modules: {
    title: string;
    order: number;
    lessons: { title: string; order: number; isFree?: boolean; duration?: number; content?: string }[];
  }[]
) {
  const existing = await db.module.findFirst({ where: { courseId } });
  if (existing) return; // already seeded

  for (const mod of modules) {
    const createdMod = await db.module.create({
      data: { courseId, title: mod.title, order: mod.order },
    });
    for (const lesson of mod.lessons) {
      await db.lesson.create({
        data: {
          moduleId: createdMod.id,
          title: lesson.title,
          order: lesson.order,
          isFree: lesson.isFree ?? false,
          duration: lesson.duration ?? 1800,
          content: lesson.content ?? `<p>${lesson.title}</p>`,
          type: "VIDEO",
        },
      });
    }
  }
}

async function main() {
  console.log("🌱 Seeding database...");

  const passwordHash = await bcrypt.hash("password123", 10);

  // ── Users ────────────────────────────────────────────────────────────────
  const admin = await db.user.upsert({
    where: { email: "admin@mudita.io" },
    update: {},
    create: { name: "Admin User", email: "admin@mudita.io", passwordHash, role: "ADMIN", isActive: true },
  });

  const student1 = await db.user.upsert({
    where: { email: "aisha@example.com" },
    update: {},
    create: { name: "Aisha Mohammed", email: "aisha@example.com", passwordHash, role: "STUDENT", isActive: true },
  });

  const student2 = await db.user.upsert({
    where: { email: "liam@example.com" },
    update: {},
    create: { name: "Liam Chen", email: "liam@example.com", passwordHash, role: "STUDENT", isActive: true },
  });

  const parent1 = await db.user.upsert({
    where: { email: "sara@example.com" },
    update: {},
    create: { name: "Sara Ahmed", email: "sara@example.com", passwordHash, role: "PARENT", isActive: true },
  });

  const tutorUser = await db.user.upsert({
    where: { email: "marcus@example.com" },
    update: {},
    create: { name: "Dr. Marcus Lee", email: "marcus@example.com", passwordHash, role: "TUTOR", isActive: true },
  });

  // Parent-child link
  await db.parentChild.upsert({
    where: { parentId_childId: { parentId: parent1.id, childId: student1.id } },
    update: {},
    create: { parentId: parent1.id, childId: student1.id },
  });

  // Tutor profile
  const tutorProfile = await db.tutorProfile.upsert({
    where: { userId: tutorUser.id },
    update: {},
    create: {
      userId: tutorUser.id,
      bio: "Experienced STEM educator with 10+ years teaching math and coding to children.",
      subjects: ["Math", "Coding", "Robotics"],
      languages: ["English", "Arabic"],
      hourlyRate: 45,
      rating: 4.8,
      isVerified: true,
    },
  });

  // Tutor availability (Mon–Fri, only if not already set)
  const availCount = await db.tutorAvailability.count({ where: { tutorId: tutorProfile.id } });
  if (availCount === 0) {
    for (let day = 1; day <= 5; day++) {
      await db.tutorAvailability.create({
        data: { tutorId: tutorProfile.id, dayOfWeek: day, startTime: "09:00", endTime: "17:00", timezone: "UTC" },
      });
    }
  }

  // ── Ages 3–5 Courses ─────────────────────────────────────────────────────

  const c1 = await db.course.upsert({
    where: { slug: "wonder-lab-science-tiny-explorers" },
    update: {},
    create: {
      title: "Wonder Lab: Science for Tiny Explorers",
      slug: "wonder-lab-science-tiny-explorers",
      description: "Hands-on science experiments for curious minds aged 3–5.",
      ageGroup: "AGES_3_5",
      level: "BEGINNER",
      category: "SCIENCE",
      status: "PUBLISHED",
      isFree: true,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c1.id, [
    {
      title: "Water Wonders",
      order: 1,
      lessons: [
        { title: "Does It Sink or Float?", order: 1, isFree: true, duration: 900 },
        { title: "Mixing Colours with Water", order: 2, isFree: true, duration: 900 },
        { title: "Bubbles Everywhere!", order: 3, isFree: true, duration: 900 },
      ],
    },
    {
      title: "Growing Things",
      order: 2,
      lessons: [
        { title: "Seeds and Soil", order: 1, duration: 1200 },
        { title: "What Do Plants Need?", order: 2, duration: 1200 },
        { title: "Watch It Grow!", order: 3, duration: 1200 },
      ],
    },
    {
      title: "Weather & Sky",
      order: 3,
      lessons: [
        { title: "Light and Shadow", order: 1, duration: 900 },
        { title: "Mixing Colours (Rainbow Science)", order: 2, duration: 900 },
        { title: "Our Final Experiment", order: 3, duration: 1200 },
      ],
    },
  ]);

  const c2 = await db.course.upsert({
    where: { slug: "little-coders-unplugged" },
    update: {},
    create: {
      title: "Little Coders Unplugged",
      slug: "little-coders-unplugged",
      description: "Learn coding logic through storytelling and games — no screen required.",
      ageGroup: "AGES_3_5",
      level: "BEGINNER",
      category: "CODING",
      status: "PUBLISHED",
      isFree: false,
      price: 29,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c2.id, [
    {
      title: "Sequences & Stories",
      order: 1,
      lessons: [
        { title: "The Robot Needs Instructions", order: 1, duration: 900 },
        { title: "Story Sequences", order: 2, duration: 900 },
        { title: "Order the Steps", order: 3, duration: 1200 },
      ],
    },
    {
      title: "Loops & Patterns",
      order: 2,
      lessons: [
        { title: "Patterns in Nature", order: 1, duration: 900 },
        { title: "Do It Again!", order: 2, duration: 900 },
        { title: "Loop Dance Party", order: 3, duration: 1200 },
      ],
    },
    {
      title: "Debugging",
      order: 3,
      lessons: [
        { title: "Something Went Wrong!", order: 1, duration: 900 },
        { title: "Fix the Fairy Tale", order: 2, duration: 900 },
        { title: "Be a Bug Finder", order: 3, duration: 1200 },
      ],
    },
  ]);

  const c3 = await db.course.upsert({
    where: { slug: "tiny-engineers" },
    update: {},
    create: {
      title: "Tiny Engineers",
      slug: "tiny-engineers",
      description: "Build, test, and fix simple structures with everyday materials.",
      ageGroup: "AGES_3_5",
      level: "BEGINNER",
      category: "ENGINEERING",
      status: "PUBLISHED",
      isFree: false,
      price: 29,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c3.id, [
    {
      title: "Build It Up",
      order: 1,
      lessons: [
        { title: "What Is Engineering?", order: 1, duration: 900 },
        { title: "Tower Challenge", order: 2, duration: 1200 },
        { title: "Test Your Tower", order: 3, duration: 1200 },
      ],
    },
    {
      title: "Bridges & Ramps",
      order: 2,
      lessons: [
        { title: "Paper Bridge Design", order: 1, duration: 1200 },
        { title: "Make a Ramp", order: 2, duration: 1200 },
        { title: "Roll It Down", order: 3, duration: 900 },
      ],
    },
    {
      title: "Design & Improve",
      order: 3,
      lessons: [
        { title: "What Went Wrong?", order: 1, duration: 900 },
        { title: "Make It Better", order: 2, duration: 1200 },
        { title: "Share Your Invention", order: 3, duration: 1200 },
      ],
    },
  ]);

  const c4 = await db.course.upsert({
    where: { slug: "space-and-sky" },
    update: {},
    create: {
      title: "Space & Sky",
      slug: "space-and-sky",
      description: "Discover planets, stars, and the moon through songs, stories, and crafts.",
      ageGroup: "AGES_3_5",
      level: "BEGINNER",
      category: "SCIENCE",
      status: "PUBLISHED",
      isFree: false,
      price: 29,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c4.id, [
    {
      title: "The Solar System",
      order: 1,
      lessons: [
        { title: "Meet the Planets", order: 1, duration: 900 },
        { title: "The Sun Is a Star", order: 2, duration: 900 },
        { title: "Planet Song & Craft", order: 3, duration: 1200 },
      ],
    },
    {
      title: "The Moon",
      order: 2,
      lessons: [
        { title: "Moon Shapes", order: 1, duration: 900 },
        { title: "Why Does the Moon Change?", order: 2, duration: 1200 },
        { title: "Moon Phase Calendar", order: 3, duration: 1200 },
      ],
    },
    {
      title: "Stars & Space Travel",
      order: 3,
      lessons: [
        { title: "Stars at Night", order: 1, duration: 900 },
        { title: "Astronauts & Rockets", order: 2, duration: 900 },
        { title: "My Space Mission", order: 3, duration: 1200 },
      ],
    },
  ]);

  const c5 = await db.course.upsert({
    where: { slug: "creative-robot-stories" },
    update: {},
    create: {
      title: "Creative Robot Stories",
      slug: "creative-robot-stories",
      description: "Meet friendly robots and learn how they think, move, and help us.",
      ageGroup: "AGES_3_5",
      level: "BEGINNER",
      category: "AI",
      status: "PUBLISHED",
      isFree: false,
      price: 29,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c5.id, [
    {
      title: "What Is a Robot?",
      order: 1,
      lessons: [
        { title: "Robots Are Everywhere", order: 1, duration: 900 },
        { title: "Robots Need Instructions", order: 2, duration: 900 },
        { title: "Be a Robot", order: 3, duration: 1200 },
      ],
    },
    {
      title: "Robots Learn",
      order: 2,
      lessons: [
        { title: "Teaching Remy", order: 1, duration: 900 },
        { title: "What Can Robots Sense?", order: 2, duration: 900 },
        { title: "Robot Memory Game", order: 3, duration: 1200 },
      ],
    },
    {
      title: "Design a Robot",
      order: 3,
      lessons: [
        { title: "What Problem Will It Solve?", order: 1, duration: 900 },
        { title: "Draw Your Robot", order: 2, duration: 1200 },
        { title: "Share Your Robot Story", order: 3, duration: 1200 },
      ],
    },
  ]);

  // ── Ages 6–8 Courses ─────────────────────────────────────────────────────

  const c6 = await db.course.upsert({
    where: { slug: "coding-adventures-blocks" },
    update: {},
    create: {
      title: "Coding Adventures with Blocks",
      slug: "coding-adventures-blocks",
      description: "Learn real programming using Scratch blocks — no typing required.",
      ageGroup: "AGES_6_8",
      level: "BEGINNER",
      category: "CODING",
      status: "PUBLISHED",
      isFree: true,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c6.id, [
    {
      title: "Meet Scratch",
      order: 1,
      lessons: [
        { title: "What Is Scratch?", order: 1, isFree: true, duration: 1200 },
        { title: "Your First Sprite", order: 2, isFree: true, duration: 1200 },
        { title: "Make It Move", order: 3, isFree: true, duration: 1200 },
      ],
    },
    {
      title: "Stories & Animations",
      order: 2,
      lessons: [
        { title: "Add a Background", order: 1, duration: 1200 },
        { title: "Make Characters Talk", order: 2, duration: 1800 },
        { title: "Animate a Story", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Your First Game",
      order: 3,
      lessons: [
        { title: "Catching Game Setup", order: 1, duration: 1800 },
        { title: "Add a Score", order: 2, duration: 1800 },
        { title: "Share Your Game", order: 3, duration: 1200 },
      ],
    },
  ]);

  const c7 = await db.course.upsert({
    where: { slug: "science-detectives" },
    update: {},
    create: {
      title: "Science Detectives",
      slug: "science-detectives",
      description: "Investigate the world like a scientist — ask questions, experiment, explain.",
      ageGroup: "AGES_6_8",
      level: "BEGINNER",
      category: "SCIENCE",
      status: "PUBLISHED",
      isFree: false,
      price: 35,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c7.id, [
    {
      title: "Forces & Motion",
      order: 1,
      lessons: [
        { title: "Push and Pull", order: 1, duration: 1200 },
        { title: "Sink or Float Experiment", order: 2, duration: 1800 },
        { title: "Ramp Speed Test", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Living Things",
      order: 2,
      lessons: [
        { title: "Plants Need Light", order: 1, duration: 1200 },
        { title: "Animal Habitats", order: 2, duration: 1200 },
        { title: "Life Cycles", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Materials & Changes",
      order: 3,
      lessons: [
        { title: "Solids, Liquids, Gases", order: 1, duration: 1200 },
        { title: "Melting and Freezing", order: 2, duration: 1800 },
        { title: "My Science Report", order: 3, duration: 1800 },
      ],
    },
  ]);

  const c8 = await db.course.upsert({
    where: { slug: "inventor-studio" },
    update: {},
    create: {
      title: "Inventor Studio",
      slug: "inventor-studio",
      description: "Design and build inventions that solve real problems in your home and school.",
      ageGroup: "AGES_6_8",
      level: "BEGINNER",
      category: "ENGINEERING",
      status: "PUBLISHED",
      isFree: false,
      price: 35,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c8.id, [
    {
      title: "Spot the Problem",
      order: 1,
      lessons: [
        { title: "Problems Are Everywhere", order: 1, duration: 1200 },
        { title: "Choose Your Problem", order: 2, duration: 1200 },
        { title: "What Do Users Need?", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Design & Build",
      order: 2,
      lessons: [
        { title: "Sketch Your Idea", order: 1, duration: 1200 },
        { title: "Build a Prototype", order: 2, duration: 1800 },
        { title: "Test It Out", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Improve & Share",
      order: 3,
      lessons: [
        { title: "What Needs Fixing?", order: 1, duration: 1200 },
        { title: "Make Version 2", order: 2, duration: 1800 },
        { title: "Invention Fair Presentation", order: 3, duration: 1800 },
      ],
    },
  ]);

  const c9 = await db.course.upsert({
    where: { slug: "ai-around-us" },
    update: {},
    create: {
      title: "AI Around Us",
      slug: "ai-around-us",
      description: "Spot AI in everyday life and learn how it works in simple, friendly terms.",
      ageGroup: "AGES_6_8",
      level: "BEGINNER",
      category: "AI",
      status: "PUBLISHED",
      isFree: false,
      price: 35,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c9.id, [
    {
      title: "What Is AI?",
      order: 1,
      lessons: [
        { title: "AI Is Everywhere", order: 1, duration: 1200 },
        { title: "How Does AI Learn?", order: 2, duration: 1200 },
        { title: "AI vs. Human", order: 3, duration: 1800 },
      ],
    },
    {
      title: "AI Helpers",
      order: 2,
      lessons: [
        { title: "Voice Assistants", order: 1, duration: 1200 },
        { title: "Recommendation Engines", order: 2, duration: 1200 },
        { title: "AI in Games", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Using AI Wisely",
      order: 3,
      lessons: [
        { title: "When AI Makes Mistakes", order: 1, duration: 1200 },
        { title: "Privacy and AI", order: 2, duration: 1200 },
        { title: "Be an AI Detective", order: 3, duration: 1800 },
      ],
    },
  ]);

  const c10 = await db.course.upsert({
    where: { slug: "smart-safe-online" },
    update: {},
    create: {
      title: "Smart & Safe Online",
      slug: "smart-safe-online",
      description: "Learn how to stay safe, kind, and smart on the internet.",
      ageGroup: "AGES_6_8",
      level: "BEGINNER",
      category: "DIGITAL_LITERACY",
      status: "PUBLISHED",
      isFree: false,
      price: 35,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c10.id, [
    {
      title: "Safe Online",
      order: 1,
      lessons: [
        { title: "Personal Information", order: 1, duration: 1200 },
        { title: "Strong Passwords", order: 2, duration: 1200 },
        { title: "Strangers Online", order: 3, duration: 1200 },
      ],
    },
    {
      title: "Kind Online",
      order: 2,
      lessons: [
        { title: "What Is Cyberbullying?", order: 1, duration: 1200 },
        { title: "How to Respond", order: 2, duration: 1200 },
        { title: "Being Upstander", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Smart Online",
      order: 3,
      lessons: [
        { title: "Is It True?", order: 1, duration: 1200 },
        { title: "Spot Fake News", order: 2, duration: 1800 },
        { title: "My Digital Pledge", order: 3, duration: 1200 },
      ],
    },
  ]);

  // ── Ages 9–12 Courses ─────────────────────────────────────────────────────

  const c11 = await db.course.upsert({
    where: { slug: "scratch-game-studio" },
    update: {},
    create: {
      title: "Scratch Game Studio",
      slug: "scratch-game-studio",
      description: "Design and build complete Scratch games with scoring, levels, and sound.",
      ageGroup: "AGES_9_12",
      level: "INTERMEDIATE",
      category: "CODING",
      status: "PUBLISHED",
      isFree: true,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c11.id, [
    {
      title: "Game Design Foundations",
      order: 1,
      lessons: [
        { title: "Game Ideas & Design Docs", order: 1, isFree: true, duration: 1800 },
        { title: "Sprites, Costumes & Sounds", order: 2, isFree: true, duration: 1800 },
        { title: "Movement & Controls", order: 3, isFree: true, duration: 2400 },
      ],
    },
    {
      title: "Game Mechanics",
      order: 2,
      lessons: [
        { title: "Collision Detection", order: 1, duration: 2400 },
        { title: "Score & Lives", order: 2, duration: 2400 },
        { title: "Levels & Difficulty", order: 3, duration: 2400 },
      ],
    },
    {
      title: "Polish & Publish",
      order: 3,
      lessons: [
        { title: "Music & Sound Effects", order: 1, duration: 1800 },
        { title: "Start Screen & Game Over", order: 2, duration: 1800 },
        { title: "Publish & Get Feedback", order: 3, duration: 1800 },
      ],
    },
  ]);

  const c12 = await db.course.upsert({
    where: { slug: "junior-robotics-automation" },
    update: {},
    create: {
      title: "Junior Robotics & Automation",
      slug: "junior-robotics-automation",
      description: "Program real or simulated robots to complete missions using block coding.",
      ageGroup: "AGES_9_12",
      level: "INTERMEDIATE",
      category: "ROBOTICS",
      status: "PUBLISHED",
      isFree: false,
      price: 49,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c12.id, [
    {
      title: "Robot Basics",
      order: 1,
      lessons: [
        { title: "How Robots Work", order: 1, duration: 1800 },
        { title: "Sensors & Actuators", order: 2, duration: 1800 },
        { title: "Your First Robot Program", order: 3, duration: 2400 },
      ],
    },
    {
      title: "Robot Missions",
      order: 2,
      lessons: [
        { title: "Navigate a Maze", order: 1, duration: 2400 },
        { title: "Delivery Mission", order: 2, duration: 2400 },
        { title: "Sort by Colour", order: 3, duration: 2400 },
      ],
    },
    {
      title: "Automation",
      order: 3,
      lessons: [
        { title: "Loops and Repetition", order: 1, duration: 1800 },
        { title: "Condition-Based Actions", order: 2, duration: 2400 },
        { title: "Design Your Own Mission", order: 3, duration: 2400 },
      ],
    },
  ]);

  const c13 = await db.course.upsert({
    where: { slug: "space-science-missions" },
    update: {},
    create: {
      title: "Space Science & Missions",
      slug: "space-science-missions",
      description: "Explore the solar system, design space missions, and learn real orbital mechanics.",
      ageGroup: "AGES_9_12",
      level: "INTERMEDIATE",
      category: "SCIENCE",
      status: "PUBLISHED",
      isFree: false,
      price: 45,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c13.id, [
    {
      title: "Our Solar System",
      order: 1,
      lessons: [
        { title: "Scale of the Solar System", order: 1, duration: 1800 },
        { title: "Rocky vs. Gas Planets", order: 2, duration: 1800 },
        { title: "Dwarf Planets & Moons", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Spacecraft & Missions",
      order: 2,
      lessons: [
        { title: "How Rockets Work", order: 1, duration: 1800 },
        { title: "Famous Space Missions", order: 2, duration: 1800 },
        { title: "Design a Mars Mission", order: 3, duration: 2400 },
      ],
    },
    {
      title: "Life in Space",
      order: 3,
      lessons: [
        { title: "Living on the ISS", order: 1, duration: 1800 },
        { title: "Could We Live on Mars?", order: 2, duration: 1800 },
        { title: "Search for Life", order: 3, duration: 2400 },
      ],
    },
  ]);

  const c14 = await db.course.upsert({
    where: { slug: "data-detectives" },
    update: {},
    create: {
      title: "Data Detectives",
      slug: "data-detectives",
      description: "Collect, chart, and interpret real data to answer questions that matter.",
      ageGroup: "AGES_9_12",
      level: "INTERMEDIATE",
      category: "DATA_SCIENCE",
      status: "PUBLISHED",
      isFree: false,
      price: 45,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c14.id, [
    {
      title: "Collecting Data",
      order: 1,
      lessons: [
        { title: "What Is Data?", order: 1, duration: 1800 },
        { title: "Surveys & Tally Charts", order: 2, duration: 1800 },
        { title: "Organising Your Data", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Visualising Data",
      order: 2,
      lessons: [
        { title: "Bar Charts & Pie Charts", order: 1, duration: 1800 },
        { title: "Line Graphs", order: 2, duration: 1800 },
        { title: "Choosing the Right Chart", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Interpreting Data",
      order: 3,
      lessons: [
        { title: "Averages & Ranges", order: 1, duration: 1800 },
        { title: "Spotting Patterns", order: 2, duration: 1800 },
        { title: "Data Investigation Project", order: 3, duration: 2400 },
      ],
    },
  ]);

  const c15 = await db.course.upsert({
    where: { slug: "media-smart-kids" },
    update: {},
    create: {
      title: "Media Smart Kids",
      slug: "media-smart-kids",
      description: "Create, critique, and fact-check media like a professional journalist.",
      ageGroup: "AGES_9_12",
      level: "INTERMEDIATE",
      category: "DIGITAL_LITERACY",
      status: "PUBLISHED",
      isFree: false,
      price: 45,
      createdById: admin.id,
    },
  });
  await seedCourseContent(c15.id, [
    {
      title: "Understanding Media",
      order: 1,
      lessons: [
        { title: "What Is Media?", order: 1, duration: 1800 },
        { title: "Who Makes the News?", order: 2, duration: 1800 },
        { title: "Media Ownership & Bias", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Fact-Checking",
      order: 2,
      lessons: [
        { title: "True, False, or Opinion?", order: 1, duration: 1800 },
        { title: "Fact-Check a Story", order: 2, duration: 2400 },
        { title: "Deepfakes & Manipulation", order: 3, duration: 1800 },
      ],
    },
    {
      title: "Create Media",
      order: 3,
      lessons: [
        { title: "Write a News Article", order: 1, duration: 2400 },
        { title: "Film a Short Video Report", order: 2, duration: 2400 },
        { title: "Publish Responsibly", order: 3, duration: 1800 },
      ],
    },
  ]);

  // ── Enrollments ───────────────────────────────────────────────────────────
  await db.enrollment.upsert({
    where: { userId_courseId: { userId: student1.id, courseId: c1.id } },
    update: {},
    create: { userId: student1.id, courseId: c1.id, status: "ACTIVE", progress: 50 },
  });
  await db.enrollment.upsert({
    where: { userId_courseId: { userId: student2.id, courseId: c1.id } },
    update: {},
    create: { userId: student2.id, courseId: c1.id, status: "COMPLETED", progress: 100, completedAt: new Date() },
  });
  await db.enrollment.upsert({
    where: { userId_courseId: { userId: student1.id, courseId: c2.id } },
    update: {},
    create: { userId: student1.id, courseId: c2.id, status: "ACTIVE", progress: 25 },
  });

  // ── Badges ────────────────────────────────────────────────────────────────
  const badge1 = await db.badge.upsert({
    where: { slug: "first-steps" },
    update: {},
    create: { slug: "first-steps", name: "First Steps", description: "Complete your first lesson", icon: "👟", criteria: { minPoints: 10 } },
  });
  await db.badge.upsert({
    where: { slug: "star-learner" },
    update: {},
    create: { slug: "star-learner", name: "Star Learner", description: "Earn 100 points", icon: "⭐", criteria: { minPoints: 100 } },
  });
  await db.badge.upsert({
    where: { slug: "course-champion" },
    update: {},
    create: { slug: "course-champion", name: "Course Champion", description: "Complete 3 courses", icon: "🏆", criteria: { minEnrollments: 3 } },
  });

  // Award badge
  await db.userBadge.upsert({
    where: { userId_badgeId: { userId: student1.id, badgeId: badge1.id } },
    update: {},
    create: { userId: student1.id, badgeId: badge1.id },
  });

  // ── Points ────────────────────────────────────────────────────────────────
  const pointCount = await db.pointTransaction.count({ where: { userId: student1.id } });
  if (pointCount === 0) {
    await db.pointTransaction.createMany({
      data: [
        { userId: student1.id, action: "LESSON_COMPLETED", points: 10 },
        { userId: student1.id, action: "QUIZ_PASSED", points: 25 },
        { userId: student2.id, action: "COURSE_COMPLETED", points: 100 },
        { userId: student2.id, action: "LESSON_COMPLETED", points: 10 },
      ],
    });
  }

  // ── Booking ───────────────────────────────────────────────────────────────
  const bookingCount = await db.booking.count({ where: { studentId: student1.id } });
  if (bookingCount === 0) {
    await db.booking.create({
      data: {
        studentId: student1.id,
        tutorId: tutorProfile.id,
        subject: "Math",
        startTime: new Date(Date.now() + 86400000),
        endTime: new Date(Date.now() + 86400000 + 3600000),
        status: "CONFIRMED",
        price: 45,
        notes: "Need help with fractions",
      },
    });
  }

  // ── Products ──────────────────────────────────────────────────────────────
  await db.product.upsert({
    where: { slug: "robotics-starter-kit" },
    update: {},
    create: {
      name: "Robotics Starter Kit",
      slug: "robotics-starter-kit",
      description: "Build your first robot with this beginner-friendly kit including servo motors, sensors, and step-by-step guide.",
      price: 79,
      ageGroup: "AGES_9_12",
      category: "ROBOTICS",
      status: "ACTIVE",
      stock: 50,
    },
  });
  await db.product.upsert({
    where: { slug: "circuit-explorer-kit" },
    update: {},
    create: {
      name: "Circuit Explorer Kit",
      slug: "circuit-explorer-kit",
      description: "Learn electronics fundamentals with hands-on circuit experiments and color-coded components.",
      price: 49,
      ageGroup: "AGES_6_8",
      category: "ELECTRONICS",
      status: "ACTIVE",
      stock: 100,
    },
  });

  // ── Competitions ──────────────────────────────────────────────────────────
  await db.competition.upsert({
    where: { slug: "global-stem-challenge-2026" },
    update: {},
    create: {
      title: "Global STEM Challenge 2026",
      slug: "global-stem-challenge-2026",
      description: "The world's premier STEM competition for young innovators aged 9-18.",
      rules: "Projects must be original. Teams of 1-3 members.",
      prizes: { first: "$500 + trophy", second: "$250", third: "$100" },
      status: "UPCOMING",
      category: "STEM",
      ageGroup: "AGES_9_12",
      registrationStart: new Date("2026-03-01"),
      registrationEnd: new Date("2026-03-31"),
      startDate: new Date("2026-04-01"),
      endDate: new Date("2026-04-30"),
      maxParticipants: 500,
    },
  });
  await db.competition.upsert({
    where: { slug: "young-coders-hackathon" },
    update: {},
    create: {
      title: "Young Coders Hackathon",
      slug: "young-coders-hackathon",
      description: "A 48-hour online hackathon for budding programmers aged 6-12.",
      rules: "Individual participation only. Use Scratch or Python.",
      prizes: { first: "Mudita Pro 1-year", second: "STEM Kit", third: "Course voucher" },
      status: "UPCOMING",
      category: "CODING",
      ageGroup: "AGES_6_8",
      registrationStart: new Date("2026-04-15"),
      registrationEnd: new Date("2026-05-10"),
      startDate: new Date("2026-05-15"),
      endDate: new Date("2026-05-17"),
      maxParticipants: 200,
    },
  });

  // ── Notifications ─────────────────────────────────────────────────────────
  const notifCount = await db.notification.count({ where: { userId: student1.id } });
  if (notifCount === 0) {
    await db.notification.create({
      data: { userId: student1.id, title: "Welcome to Mudita!", body: "You've successfully joined Mudita LMS. Start exploring courses.", type: "INFO" },
    });
    await db.notification.create({
      data: { userId: student1.id, title: "Badge Earned!", body: "You earned the 'First Steps' badge. Keep learning!", type: "BADGE" },
    });
  }

  console.log("✅ Seed Phase 1 complete — users, Ages 3–5 courses (1–5), badges, products, competitions");
}

main()
  .catch((e) => { console.error("Seed failed:", e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
