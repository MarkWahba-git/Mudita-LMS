export const AGE_GROUPS = [
  { value: "AGES_3_5", label: "Early Learners (3–5)", minAge: 3, maxAge: 5 },
  { value: "AGES_6_8", label: "Kids (6–8)", minAge: 6, maxAge: 8 },
  { value: "AGES_9_12", label: "Juniors (9–12)", minAge: 9, maxAge: 12 },
  { value: "AGES_13_15", label: "Teens (13–15)", minAge: 13, maxAge: 15 },
  { value: "AGES_16_18", label: "Seniors (16–18)", minAge: 16, maxAge: 18 },
] as const;

export const COURSE_CATEGORIES = [
  { value: "math", label: "Mathematics" },
  { value: "coding", label: "Coding & Programming" },
  { value: "science", label: "Science" },
  { value: "robotics", label: "Robotics" },
  { value: "engineering", label: "Engineering" },
  { value: "ai", label: "AI & Machine Learning" },
  { value: "electronics", label: "Electronics" },
  { value: "biology", label: "Biology" },
  { value: "chemistry", label: "Chemistry" },
  { value: "physics", label: "Physics" },
] as const;

export const COURSE_LEVELS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
] as const;

export const USER_ROLES = [
  { value: "STUDENT", label: "Student" },
  { value: "PARENT", label: "Parent" },
  { value: "TUTOR", label: "Tutor" },
  { value: "ADMIN", label: "Admin" },
  { value: "B2B_PARTNER", label: "Organization" },
] as const;

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
