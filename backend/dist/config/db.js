import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "./env.js";
import Admin from "../models/Admin.js";
import Profile from "../models/Profile.js";
import Home from "../models/Home.js";
const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log("✅ MongoDB Connected");
        // 1. Auto-seed Admin if empty
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash("Nahid@2552", 10);
            await Admin.create({
                name: "Nahid Hossain",
                email: "nahid4510@gmail.com",
                password: hashedPassword,
                bio: "Fullstack Developer",
            });
            console.log("🌱 Seeded production admin account successfully");
        }
        // 2. Auto-seed Profile if empty
        const profileCount = await Profile.countDocuments();
        if (profileCount === 0) {
            await Profile.create({
                name: 'Nahid Hossain',
                title: 'Fullstack Developer',
                bio: 'I build fast, reliable, and scalable web applications with React, Next.js, and TypeScript, backed by clean Node.js APIs and well-structured data. I focus on responsive, polished user experiences with performance and maintainability at the core. My work spans e-commerce platforms, multi-tenant SaaS products, and data-driven dashboards used by thousands of daily users.',
                email: 'nahid4510@gmail.com',
                phone: '+8801617121519',
                location: 'Dhaka, Bangladesh',
                avatar: 'avatars/nahid.jpeg',
                resume: 'resumes/Nahid_Hossain_Resume.pdf',
                github: 'https://github.com/nh-nahid',
                linkedin: 'https://linkedin.com/in/nahid-nh',
                about: "Over the last few years, I've grown into a frontend-focused full-stack developer, building modern, scalable web applications with React, Next.js, TypeScript, and the MERN stack. I enjoy taking ideas from concept to production — designing scalable frontend architectures, developing robust backend APIs, implementing secure authentication systems, integrating third-party services, and optimizing performance to deliver fast, seamless user experiences. I'm passionate about writing clean, maintainable code, solving complex technical challenges, and building intuitive, responsive interfaces that provide real value to users. I care about solid architecture, reliability, and long-term scalability rather than simply following trends, with a focus on building software that works well today and remains easy to maintain and evolve as it grows.",
                subtitle: 'Code with clarity. Ship with confidence.'
            });
            console.log("🌱 Seeded production profile details successfully");
        }
        // 3. Auto-seed Home Config/Stats if empty
        const homeCount = await Home.countDocuments();
        if (homeCount === 0) {
            await Home.create({
                stats: [
                    { value: "1.5+", label: "Years Experience" },
                    { value: "10+", label: "Projects Completed" },
                    { value: "5+", label: "Enterprise Clients" },
                    { value: "99%", label: "Performance Score" }
                ]
            });
            console.log("🌱 Seeded production home stats successfully");
        }
    }
    catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(error);
        process.exit(1);
    }
};
export default connectDB;
