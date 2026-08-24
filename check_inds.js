
const mongoose = require("mongoose");
async function check() {
    await mongoose.connect("mongodb+srv://parastomar851_db_user:India123@cluster0.uab9v6f.mongodb.net/contactdb?retryWrites=true&w=majority&appName=Cluster0");
    const db = mongoose.connection;
    const pages = await db.collection("webpages").find({ category: { $regex: "industries", $options: "i" } }).toArray();
    const urls = pages.map(p => p.path);
    console.log(urls.join(","));
    process.exit(0);
}
check().catch(console.error);

