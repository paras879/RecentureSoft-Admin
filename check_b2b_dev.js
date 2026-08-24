
const mongoose = require("mongoose");
async function check() {
    await mongoose.connect("mongodb+srv://parastomar851_db_user:India123@cluster0.uab9v6f.mongodb.net/contactdb?retryWrites=true&w=majority&appName=Cluster0");
    const db = mongoose.connection;
    const page = await db.collection("webpages").findOne({ $text: { $search: "\"B2B Development\"" } });
    if (page) {
        console.log("Found page: " + page.path);
    } else {
        const regexPage = await db.collection("webpages").findOne({ "content.hero.highlight": { $regex: "B2B Development", $options: "i" } });
        if (regexPage) {
            console.log("Found by highlight: " + regexPage.path);
        } else {
            console.log("Not found.");
        }
    }
    process.exit(0);
}
check().catch(console.error);

