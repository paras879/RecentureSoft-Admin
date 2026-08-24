const mongoose = require('mongoose');

async function check() {
    await mongoose.connect('mongodb+srv://parastomar851_db_user:India123@cluster0.uab9v6f.mongodb.net/contactdb?retryWrites=true&w=majority&appName=Cluster0');
    const db = mongoose.connection;
    const page = await db.collection('webpages').findOne({ path: '/automobile' });
    console.log('Automobile Page Template Type:', page.templateType);
    process.exit(0);
}
check().catch(console.error);
