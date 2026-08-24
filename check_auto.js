
const mongoose = require("mongoose");
async function check() {
    await mongoose.connect("mongodb+srv://parastomar851_db_user:India123@cluster0.uab9v6f.mongodb.net/contactdb?retryWrites=true&w=majority&appName=Cluster0");
    const db = mongoose.connection;
    const blocks = await db.collection("globalblocks").find({ name: "Industries" }).toArray();
    if(blocks.length > 0 && blocks[0].blockData && blocks[0].blockData.blocks.length > 0) {
        const cards = blocks[0].blockData.blocks.find(b => b.type === "cards");
        if (cards && cards.items) {
            console.log("First card title: " + cards.items[0].title);
            console.log("Total cards: " + cards.items.length);
        }
    }
    process.exit(0);
}
check().catch(console.error);

