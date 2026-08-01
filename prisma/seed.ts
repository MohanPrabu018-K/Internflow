// ─── InternFlow Database Seed Script ─────────────────────────────────────
// Seeds: departments, colleges, admin user, demo recruiters, 100 candidates
// Run: npx tsx prisma/seed.ts

import { PrismaClient, type Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding InternFlow database...\n");

  // ─── 1. Departments ───────────────────────────────────────
  const departments = [
    { name: "Engineering", slug: "engineering" },
    { name: "Product", slug: "product" },
    { name: "Design", slug: "design" },
    { name: "Marketing", slug: "marketing" },
    { name: "Data Science", slug: "data-science" },
    { name: "Finance", slug: "finance" },
    { name: "Human Resources", slug: "hr" },
    { name: "Operations", slug: "operations" },
    { name: "Sales", slug: "sales" },
    { name: "Legal", slug: "legal" },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { slug: dept.slug },
      update: {},
      create: dept,
    });
  }
  console.log(`✅ Created ${departments.length} departments`);

  // ─── 2. Colleges ──────────────────────────────────────────
  const colleges = [
    { name: "IIT Bombay", city: "Mumbai", state: "Maharashtra" },
    { name: "IIT Delhi", city: "Delhi", state: "Delhi" },
    { name: "IIT Madras", city: "Chennai", state: "Tamil Nadu" },
    { name: "IIT Kanpur", city: "Kanpur", state: "Uttar Pradesh" },
    { name: "IIT Kharagpur", city: "Kharagpur", state: "West Bengal" },
    { name: "BITS Pilani", city: "Pilani", state: "Rajasthan" },
    { name: "NIT Trichy", city: "Tiruchirappalli", state: "Tamil Nadu" },
    { name: "NIT Surathkal", city: "Mangalore", state: "Karnataka" },
    { name: "IIIT Hyderabad", city: "Hyderabad", state: "Telangana" },
    { name: "DTU Delhi", city: "Delhi", state: "Delhi" },
    { name: "VIT Vellore", city: "Vellore", state: "Tamil Nadu" },
    { name: "SRM Chennai", city: "Chennai", state: "Tamil Nadu" },
    { name: "Manipal Institute", city: "Manipal", state: "Karnataka" },
    { name: "Thapar University", city: "Patiala", state: "Punjab" },
    { name: "PES University", city: "Bangalore", state: "Karnataka" },
    { name: "RVCE Bangalore", city: "Bangalore", state: "Karnataka" },
    { name: "COEP Pune", city: "Pune", state: "Maharashtra" },
    { name: "Jadavpur University", city: "Kolkata", state: "West Bengal" },
    { name: "Anna University", city: "Chennai", state: "Tamil Nadu" },
    { name: "Amity Noida", city: "Noida", state: "Uttar Pradesh" },
  ];

  for (const college of colleges) {
    await prisma.college.upsert({
      where: { name: college.name },
      update: {},
      create: college,
    });
  }
  console.log(`✅ Created ${colleges.length} colleges`);

  // ─── 3. Users (Admin + Recruiters) ────────────────────────
  const passwordHash = await bcrypt.hash("password123", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@internflow.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@internflow.com",
      passwordHash,
      role: "ADMIN",
      title: "System Administrator",
      isActive: true,
    },
  });
  console.log(`✅ Created admin: admin@internflow.com / password123`);

  const recruiters = [
    { name: "Priya Sharma", email: "priya@internflow.com" },
    { name: "Rahul Gupta", email: "rahul@internflow.com" },
    { name: "Ananya Patel", email: "ananya@internflow.com" },
    { name: "Vikram Singh", email: "vikram@internflow.com" },
    { name: "Neha Reddy", email: "neha@internflow.com" },
  ];

  const engDept = await prisma.department.findUnique({ where: { slug: "engineering" } });

  for (const rec of recruiters) {
    await prisma.user.upsert({
      where: { email: rec.email },
      update: {},
      create: {
        name: rec.name,
        email: rec.email,
        passwordHash,
        role: "RECRUITER",
        departmentId: engDept?.id,
        title: "Technical Recruiter",
        isActive: true,
      },
    });
  }
  console.log(`✅ Created ${recruiters.length} recruiters`);

  const viewerUser = await prisma.user.upsert({
    where: { email: "viewer@internflow.com" },
    update: {},
    create: {
      name: "Read-Only Viewer",
      email: "viewer@internflow.com",
      passwordHash,
      role: "VIEWER",
      isActive: true,
    },
  });
  console.log(`✅ Created viewer: viewer@internflow.com / password123`);

  // ─── 4. Candidates (100 mock candidates) ──────────────────
  const allDepartments = await prisma.department.findMany();
  const allColleges = await prisma.college.findMany();
  const allRecruiters = await prisma.user.findMany({ where: { role: "RECRUITER" } });

  const roles = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "DevOps Engineer", "Data Scientist", "ML Engineer", "UX Designer",
    "Product Manager", "QA Engineer", "Mobile Developer", "Cloud Engineer",
    "Security Analyst", "Data Analyst", "Site Reliability Engineer",
  ];

  const stages = ["New", "Screening", "Assessment", "Interview", "Selected", "Offer Sent", "Joined"] as const;
  const fNames = ["Aarav", "Ananya", "Arjun", "Diya", "Ishaan", "Kavya", "Manan", "Neha", "Priya", "Rohan", "Samar", "Tara", "Vihaan", "Zara", "Aditya", "Bhavya", "Chirag", "Divya", "Esha", "Farhan"];
  const lNames = ["Mehta", "Sharma", "Patel", "Reddy", "Kumar", "Singh", "Gupta", "Nair", "Joshi", "Verma", "Das", "Rao", "Menon", "Iyer", "Chopra", "Bose", "Sen", "Malik", "Agarwal", "Sethi"];
  const colors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#6366F1"];
  const locations = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Gurgaon"];

  // Delete existing candidates to avoid duplicates
  await prisma.candidate.deleteMany();
  console.log("🗑️  Cleared existing candidates");

  let created = 0;
  for (let i = 0; i < 100; i++) {
    const fName = fNames[i % fNames.length];
    const lName = lNames[i % lNames.length];
    const name = `${fName} ${lName}${i >= 20 ? ` ${Math.floor(i / 20)}` : ""}`;
    const college = allColleges[i % allColleges.length];
    const dept = allDepartments[i % allDepartments.length];
    const recruiter = allRecruiters[i % allRecruiters.length];
    const role = roles[i % roles.length];
    const stage = stages[i % stages.length];
    const cgpa = 6.0 + Math.random() * 4.0;

    const skills: string[] = [];
    if (role.toLowerCase().includes("frontend") || role.toLowerCase().includes("full stack") || role.toLowerCase().includes("ux")) {
      skills.push("React", "TypeScript", "CSS", "HTML");
    }
    if (role.toLowerCase().includes("backend") || role.toLowerCase().includes("full stack") || role.toLowerCase().includes("devops")) {
      skills.push("Node.js", "Python", "SQL", "Docker");
    }
    if (role.toLowerCase().includes("data") || role.toLowerCase().includes("ml")) {
      skills.push("Python", "TensorFlow", "SQL", "Pandas");
    }
    if (role.toLowerCase().includes("mobile")) {
      skills.push("React Native", "Flutter", "Kotlin");
    }
    if (skills.length === 0) skills.push("Communication", "Analytics", "Problem Solving");

    const initials = fName[0] + lName[0];
    const daysAgo = Math.floor(Math.random() * 90);
    const appliedDate = new Date();
    appliedDate.setDate(appliedDate.getDate() - daysAgo);

    const projects = [
      `Campus ${["Connect", "Events", "Network", "Hub"][i % 4]} - A student networking platform`,
      `${["AI Chatbot", "Weather App", "Task Manager", "Blog Engine"][i % 4]} built with modern tech stack`,
    ];

    await prisma.candidate.create({
      data: {
        name,
        initials,
        email: `candidate${i + 1}@example.com`,
        phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        collegeId: college.id,
        departmentId: dept.id,
        role,
        stage,
        rating: Math.floor(Math.random() * 5) + 1,
        cgpa: Math.round(cgpa * 100) / 100,
        year: `${2022 + (i % 4)}`,
        appliedDate,
        location: locations[i % locations.length],
        githubUrl: `https://github.com/${fName.toLowerCase()}${lName.toLowerCase()}`,
        linkedinUrl: `https://linkedin.com/in/${fName.toLowerCase()}-${lName.toLowerCase()}`,
        skills,
        color: colors[i % colors.length],
        assignedRecruiterId: recruiter.id,
        experience: `${Math.floor(Math.random() * 3)} years`,
        projects,
        notes: `Strong candidate for ${role} role.`,
      },
    });
    created++;
    if (created % 20 === 0) console.log(`   📝 ${created}/100 candidates seeded...`);
  }
  console.log(`✅ Created 100 candidates`);

  // ─── 5. Sample Applications ───────────────────────────────
  const sampleCandidates = await prisma.candidate.findMany({ take: 10 });
  for (const candidate of sampleCandidates) {
    await prisma.application.upsert({
      where: { id: `app-${candidate.id}` },
      update: {},
      create: {
        id: `app-${candidate.id}`,
        candidateId: candidate.id,
        role: candidate.role,
        stage: candidate.stage,
        appliedAt: candidate.appliedDate,
      },
    });
  }
  console.log(`✅ Created ${sampleCandidates.length} sample applications`);

  // ─── 6. Settings ──────────────────────────────────────────
  const settings = [
    { key: "company_name", value: "InternFlow Inc." },
    { key: "company_website", value: "https://internflow.com" },
    { key: "default_timezone", value: "Asia/Kolkata" },
    { key: "max_candidates_per_role", value: "50" },
    { key: "auto_archive_days", value: "180" },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log(`✅ Created ${settings.length} settings`);

  console.log("\n🎉 Database seeding complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Admin:     admin@internflow.com / password123");
  console.log("  Recruiter: priya@internflow.com / password123");
  console.log("  Viewer:    viewer@internflow.com / password123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
