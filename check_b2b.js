const mongoose = require('mongoose');
async function check() {
    await mongoose.connect('mongodb+srv://parastomar851_db_user:India123@cluster0.uab9v6f.mongodb.net/contactdb?retryWrites=true&w=majority&appName=Cluster0');
    const db = mongoose.connection;
    const page = await db.collection('webpages').findOne({ path: { $regex: 'b2b-development', $options: 'i' } });
    if (page) {
        console.log('B2B Page Category:', page.category);
        const hasOtherIndustries = page.content && page.content.crmBlocks && page.content.crmBlocks.some(b => b.title === 'Other Industries');
        console.log('Has local Other Industries block:', hasOtherIndustries);
    } else {
        console.log('B2B page not found');
    }
    process.exit(0);
}
check().catch(console.error);
