const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(__dirname, '.env.local');
let uri = '';
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const uriMatch = envContent.match(/MONGODB_URI=(.*)/);
    if (uriMatch) {
        uri = uriMatch[1].trim();
    }
}

if (!uri) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
}

const teamMemberSchema = new mongoose.Schema({
    name: String,
    role: String,
    quote: String,
    image: String,
});

const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

async function seed() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB...");
        
        const count = await TeamMember.countDocuments();
        if (count > 0) {
            console.log("Team members already exist. Clearing old ones just in case...");
            await TeamMember.deleteMany({});
        }

        const teamData = [
            {
                name: "Sarah Jenkins",
                role: "Senior Cloud Architect",
                quote: "Joining RecentureSoft was the best career move. The events, the global culture, and the absolute focus on engineering excellence makes every day exciting.",
                image: "/images/events/testimonial_0.jpg"
            },
            {
                name: "David Chen",
                role: "Lead Frontend Developer",
                quote: "Joining RecentureSoft was the best career move. The events, the global culture, and the absolute focus on engineering excellence makes every day exciting.",
                image: "/images/events/testimonial_1.jpg"
            },
            {
                name: "Priya Sharma",
                role: "Product Manager",
                quote: "Joining RecentureSoft was the best career move. The events, the global culture, and the absolute focus on engineering excellence makes every day exciting.",
                image: "/images/events/testimonial_2.jpg"
            }
        ];

        await TeamMember.insertMany(teamData);
        console.log("Team Members seeded successfully!");
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
