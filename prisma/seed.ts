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
