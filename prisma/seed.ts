import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.pointTransaction.deleteMany();
  await db.userBadge.deleteMany();
  await db.lessonProgress.deleteMany();
  await db.quizAttempt.deleteMany();
  await db.enrollment.deleteMany();
  await db.booking.deleteMany();
  await db.certificate.deleteMany();
  await db.notification.deleteMany();
  await db.competitionRegistration.deleteMany();
  await db.tutorAvailability.deleteMany();
  await db.tutorProfile.deleteMany();
  await db.answer.deleteMany();
  await db.question.deleteMany();
  await db.quiz.deleteMany();
  await db.lesson.deleteMany();
  await db.module.deleteMany();
  await db.course.deleteMany();
  await db.badge.deleteMany();
  await db.competition.deleteMany();
  await db.product.deleteMany();
  await db.parentChild.deleteMany();
  await db.user.deleteMany();

  const password = await bcrypt.hash("password123", 10);

  // Users
  const admin = await db.user.create({
    data: { name: "Admin User", email: "admin@mudita.io", password, role: "ADMIN", isActive: true },
  });

  const student1 = await db.user.create({
    data: { name: "Aisha Mohammed", email: "aisha@example.com", password, role: "STUDENT", isActive: true },
  });

  const student2 = await db.user.create({
    data: { name: "Liam Chen", email: "liam@example.com", password, role: "STUDENT", isActive: true },
  });

  const parent1 = await db.user.create({
    data: { name: "Sara Ahmed", email: "sara@example.com", password, role: "PARENT", isActive: true },
  });

  const tutorUser = await db.user.create({
    data: { name: "Dr. Marcus Lee", email: "marcus@example.com", password, role: "TUTOR", isActive: true },
  });

  // Parent-child link
  await db.parentChild.create({ data: { parentId: parent1.id, childId: student1.id } });

  // Tutor profile
  const tutorProfile = await db.tutorProfile.create({
    data: {
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

  // Courses
  const course1 = await db.course.create({
    data: {
      title: "Introduction to Coding for Kids",
      slug: "intro-coding-kids",
      description: "A fun and interactive introduction to programming concepts for young learners aged 6-8.",
      ageGroup: "AGES_6_8",
      level: "BEGINNER",
      category: "CODING",
      status: "PUBLISHED",
      isFree: true,
      hasCertificate: true,
    },
  });

  const course2 = await db.course.create({
    data: {
      title: "Math Adventures: Algebra Basics",
      slug: "math-algebra-basics",
      description: "Build strong algebra foundations through games, puzzles, and real-world problems.",
      ageGroup: "AGES_9_12",
      level: "INTERMEDIATE",
      category: "MATH",
      status: "PUBLISHED",
      isFree: false,
      price: 29,
      hasCertificate: true,
    },
  });

  const course3 = await db.course.create({
    data: {
      title: "Young Robotics Engineers",
      slug: "young-robotics-engineers",
      description: "Learn to design and program robots using block-based coding and simple circuits.",
      ageGroup: "AGES_9_12",
      level: "BEGINNER",
      category: "ROBOTICS",
      status: "PUBLISHED",
      isFree: false,
      price: 39,
      hasCertificate: true,
    },
  });

  // Modules + Lessons for course1
  const mod1 = await db.module.create({
    data: { courseId: course1.id, title: "Getting Started", order: 1 },
  });
  const lesson1 = await db.lesson.create({
    data: { moduleId: mod1.id, title: "What is a Computer?", order: 1, isFree: true, duration: 600, videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", content: "<p>Let's explore what computers are and how they work!</p>" },
  });
  const lesson2 = await db.lesson.create({
    data: { moduleId: mod1.id, title: "Intro to Scratch", order: 2, isFree: true, duration: 900 },
  });

  const mod2 = await db.module.create({
    data: { courseId: course1.id, title: "Your First Program", order: 2 },
  });
  const lesson3 = await db.lesson.create({
    data: { moduleId: mod2.id, title: "Drawing Shapes", order: 1, duration: 1200 },
  });
  const lesson4 = await db.lesson.create({
    data: { moduleId: mod2.id, title: "Making Things Move", order: 2, duration: 900 },
  });

  // Quiz for lesson1
  const quiz1 = await db.quiz.create({
    data: {
      lessonId: lesson1.id,
      title: "Computer Basics Quiz",
      passingScore: 60,
      timeLimit: 300,
    },
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

  // Enrollments
  await db.enrollment.create({
    data: { userId: student1.id, courseId: course1.id, status: "ACTIVE", progress: 50 },
  });
  await db.enrollment.create({
    data: { userId: student2.id, courseId: course1.id, status: "COMPLETED", progress: 100, completedAt: new Date() },
  });
  await db.enrollment.create({
    data: { userId: student1.id, courseId: course2.id, status: "ACTIVE", progress: 25 },
  });

  // Badges
  const badge1 = await db.badge.create({
    data: {
      name: "First Steps",
      description: "Complete your first lesson",
      icon: "👟",
      color: "#3b82f6",
      criteria: { minPoints: 10 },
    },
  });

  const badge2 = await db.badge.create({
    data: {
      name: "Star Learner",
      description: "Earn 100 points",
      icon: "⭐",
      color: "#f59e0b",
      criteria: { minPoints: 100 },
    },
  });

  await db.badge.create({
    data: {
      name: "Course Champion",
      description: "Complete 3 courses",
      icon: "🏆",
      color: "#10b981",
      criteria: { minEnrollments: 3 },
    },
  });

  // Award badge to student
  await db.userBadge.create({
    data: { userId: student1.id, badgeId: badge1.id },
  });

  // Points
  await db.pointTransaction.createMany({
    data: [
      { userId: student1.id, action: "LESSON_COMPLETE", points: 10 },
      { userId: student1.id, action: "QUIZ_PASS", points: 25 },
      { userId: student2.id, action: "COURSE_COMPLETE", points: 100 },
      { userId: student2.id, action: "LESSON_COMPLETE", points: 10 },
    ],
  });

  // Booking
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

  // Products (STEM Kits)
  await db.product.create({
    data: {
      name: "Robotics Starter Kit",
      slug: "robotics-starter-kit",
      description: "Build your first robot with this beginner-friendly kit including servo motors, sensors, and step-by-step guide.",
      price: 79,
      ageGroup: "AGES_9_12",
      category: "ROBOTICS",
      status: "PUBLISHED",
      features: ["4 servo motors", "2 ultrasonic sensors", "Arduino Uno compatible", "Illustrated guide"],
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
      status: "PUBLISHED",
      features: ["50 components", "15 experiment cards", "LED rainbow display", "Battery powered"],
    },
  });

  // Competition
  await db.competition.create({
    data: {
      title: "Global STEM Challenge 2026",
      slug: "global-stem-challenge-2026",
      description: "The world's premier STEM competition for young innovators aged 9-18. Submit your project and compete for prizes.",
      rules: "Projects must be original. Teams of 1-3 members. Submission deadline: April 30, 2026.",
      prizes: "1st place: $500 + trophy\n2nd place: $250\n3rd place: $100",
      status: "UPCOMING",
      startDate: new Date("2026-04-01"),
      endDate: new Date("2026-04-30"),
      registrationDeadline: new Date("2026-03-31"),
      maxParticipants: 500,
    },
  });

  await db.competition.create({
    data: {
      title: "Young Coders Hackathon",
      slug: "young-coders-hackathon",
      description: "A 48-hour online hackathon for budding programmers aged 6-12.",
      rules: "Individual participation only. Use Scratch or Python. Build something creative!",
      prizes: "Top 10 receive Mudita merchandise + 1-year Pro subscription",
      status: "UPCOMING",
      startDate: new Date("2026-05-15"),
      endDate: new Date("2026-05-17"),
      registrationDeadline: new Date("2026-05-10"),
      maxParticipants: 200,
    },
  });

  // Notifications
  await db.notification.create({
    data: {
      userId: student1.id,
      title: "Welcome to Mudita!",
      message: "You've successfully joined Mudita LMS. Start exploring courses.",
      type: "INFO",
    },
  });

  await db.notification.create({
    data: {
      userId: student1.id,
      title: "Badge Earned!",
      message: "You earned the 'First Steps' badge. Keep learning!",
      type: "BADGE",
      isRead: false,
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
