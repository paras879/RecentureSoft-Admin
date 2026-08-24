
const mongoose = require("mongoose");
async function check() {
    await mongoose.connect("mongodb+srv://parastomar851_db_user:India123@cluster0.uab9v6f.mongodb.net/contactdb?retryWrites=true&w=majority&appName=Cluster0");
    const db = mongoose.connection;
    const pages = await db.collection("webpages").find({ "content.crmBlocks.type": "cards" }).toArray();
    for (const page of pages) {
        for (const block of page.content.crmBlocks) {
            if (block.type === "cards") {
                console.log("Page " + page.path + " has a local cards block with title " + block.title + " and " + (block.items ? block.items.length : 0) + " items.");
            }
        }
    }
    process.exit(0);
}
check().catch(console.error);

