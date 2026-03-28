import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const passwordHash = await bcrypt.hash("password123", 10);

  // --- Users ---
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

  // Tutor availability (Mon-Fri 9am-5pm)
  for (let day = 1; day <= 5; day++) {
    await db.tutorAvailability.create({
      data: { tutorId: tutorProfile.id, dayOfWeek: day, startTime: "09:00", endTime: "17:00", timezone: "UTC" },
    });
  }

  // --- Courses ---
  const course1 = await db.course.upsert({
    where: { slug: "intro-coding-kids" },
    update: {},
    create: {
      title: "Introduction to Coding for Kids",
      slug: "intro-coding-kids",
      description: "A fun and interactive introduction to programming concepts for young learners aged 6-8.",
      ageGroup: "AGES_6_8",
      level: "BEGINNER",
      category: "CODING",
      status: "PUBLISHED",
      isFree: true,
      createdById: admin.id,
    },
  });

  const course2 = await db.course.upsert({
    where: { slug: "math-algebra-basics" },
    update: {},
    create: {
      title: "Math Adventures: Algebra Basics",
      slug: "math-algebra-basics",
      description: "Build strong algebra foundations through games, puzzles, and real-world problems.",
      ageGroup: "AGES_9_12",
      level: "INTERMEDIATE",
      category: "MATH",
      status: "PUBLISHED",
      isFree: false,
      price: 29,
      createdById: admin.id,
    },
  });

  const course3 = await db.course.upsert({
    where: { slug: "young-robotics-engineers" },
    update: {},
    create: {
      title: "Young Robotics Engineers",
      slug: "young-robotics-engineers",
      description: "Learn to design and program robots using block-based coding and simple circuits.",
      ageGroup: "AGES_9_12",
      level: "BEGINNER",
      category: "ROBOTICS",
      status: "PUBLISHED",
      isFree: false,
      price: 39,
      createdById: admin.id,
    },
  });

  // --- Modules + Lessons for course1 ---
  const mod1 = await db.module.create({
    data: { courseId: course1.id, title: "Getting Started", order: 1 },
  });
  const lesson1 = await db.lesson.create({
    data: {
      moduleId: mod1.id,
      title: "What is a Computer?",
      order: 1,
      isFree: true,
      duration: 600,
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      content: "<p>Let's explore what computers are and how they work!</p>",
    },
  });
  await db.lesson.create({
    data: { moduleId: mod1.id, title: "Intro to Scratch", order: 2, isFree: true, duration: 900 },
  });

  const mod2 = await db.module.create({
    data: { courseId: course1.id, title: "Your First Program", order: 2 },
  });
  await db.lesson.create({
    data: { moduleId: mod2.id, title: "Drawing Shapes", order: 1, duration: 1200 },
  });
  await db.lesson.create({
    data: { moduleId: mod2.id, title: "Making Things Move", order: 2, duration: 900 },
  });

  // --- Quiz for lesson1 ---
  const quiz1 = await db.quiz.create({
    data: { lessonId: lesson1.id, title: "Computer Basics Quiz", passingScore: 60, timeLimit: 300 },
  });

  const q1 = await db.question.create({
    data: { quizId: quiz1.id, text: "What does CPU stand for?", type: "MULTIPLE_CHOICE", order: 1, points: 10 },
  });
  await db.answer.createMany({
    data: [
      { questionId: q1.id, text: "Central Processing Unit", isCorrect: true, order: 1 },
      { questionId: q1.id, text: "Computer Power Unit", isCorrect: false, order: 2 },
      { questionId: q1.id, text: "Central Program Utility", isCorrect: false, order: 3 },
    ],
  });

  const q2 = await db.question.create({
    data: { quizId: quiz1.id, text: "Which of these is an input device?", type: "MULTIPLE_CHOICE", order: 2, points: 10 },
  });
  await db.answer.createMany({
    data: [
      { questionId: q2.id, text: "Monitor", isCorrect: false, order: 1 },
      { questionId: q2.id, text: "Keyboard", isCorrect: true, order: 2 },
      { questionId: q2.id, text: "Speaker", isCorrect: false, order: 3 },
    ],
  });

  // --- Enrollments ---
  await db.enrollment.create({
    data: { userId: student1.id, courseId: course1.id, status: "ACTIVE", progress: 50 },
  });
  await db.enrollment.create({
    data: { userId: student2.id, courseId: course1.id, status: "COMPLETED", progress: 100, completedAt: new Date() },
  });
  await db.enrollment.create({
    data: { userId: student1.id, courseId: course2.id, status: "ACTIVE", progress: 25 },
  });

  // --- Badges ---
  const badge1 = await db.badge.create({
    data: {
      slug: "first-steps",
      name: "First Steps",
      description: "Complete your first lesson",
      icon: "👟",
      criteria: { minPoints: 10 },
    },
  });

  await db.badge.create({
    data: {
      slug: "star-learner",
      name: "Star Learner",
      description: "Earn 100 points",
      icon: "⭐",
      criteria: { minPoints: 100 },
    },
  });

  await db.badge.create({
    data: {
      slug: "course-champion",
      name: "Course Champion",
      description: "Complete 3 courses",
      icon: "🏆",
      criteria: { minEnrollments: 3 },
    },
  });

  // Award badge to student
  await db.userBadge.create({
    data: { userId: student1.id, badgeId: badge1.id },
  });

  // --- Points ---
  await db.pointTransaction.createMany({
    data: [
      { userId: student1.id, action: "LESSON_COMPLETED", points: 10 },
      { userId: student1.id, action: "QUIZ_PASSED", points: 25 },
      { userId: student2.id, action: "COURSE_COMPLETED", points: 100 },
      { userId: student2.id, action: "LESSON_COMPLETED", points: 10 },
    ],
  });

  // --- Booking ---
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

  // --- Products (STEM Kits) ---
  await db.product.create({
    data: {
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

  await db.product.create({
    data: {
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

  // --- Competitions ---
  await db.competition.create({
    data: {
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

  await db.competition.create({
    data: {
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

  // --- Notifications ---
  await db.notification.create({
    data: {
      userId: student1.id,
      title: "Welcome to Mudita!",
      body: "You've successfully joined Mudita LMS. Start exploring courses.",
      type: "INFO",
    },
  });

  await db.notification.create({
    data: {
      userId: student1.id,
      title: "Badge Earned!",
      body: "You earned the 'First Steps' badge. Keep learning!",
      type: "BADGE",
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log(`   Users: admin, 2 students, 1 parent, 1 tutor`);
  console.log(`   Courses: 3 (with modules, lessons, quizzes)`);
  console.log(`   Badges: 3`);
  console.log(`   Products: 2 STEM kits`);
  console.log(`   Competitions: 2`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
