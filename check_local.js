const mongoose = require('mongoose');
async function check() {
    await mongoose.connect('mongodb+srv://parastomar851_db_user:India123@cluster0.uab9v6f.mongodb.net/contactdb?retryWrites=true&w=majority&appName=Cluster0');
    const db = mongoose.connection;
    const pages = await db.collection('webpages').find({ 'content.crmBlocks.title': 'Other Industries' }).toArray();
    for (const page of pages) {
        console.log('Page with local block:', page.path);
        const block = page.content.crmBlocks.find(b => b.title === 'Other Industries');
        console.log('Local block items length:', block.items ? block.items.length : 0);
    }
    process.exit(0);
}
check().catch(console.error);
