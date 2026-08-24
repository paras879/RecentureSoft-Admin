const mongoose = require('mongoose');

async function fix() {
    await mongoose.connect('mongodb+srv://parastomar851_db_user:India123@cluster0.uab9v6f.mongodb.net/contactdb?retryWrites=true&w=majority&appName=Cluster0');
    const db = mongoose.connection;
    
    const page = await db.collection('webpages').findOne({ path: '/automobile' });
    console.log('Page Category before:', page.category);
    
    // Make sure it is lowercase 'industries'
    if (page.category !== 'industries' && page.category !== 'Industries') {
        console.log('Fixing category...');
        await db.collection('webpages').updateOne({ path: '/automobile' }, { $set: { category: 'industries' } });
        console.log('Fixed page category');
    }

    const blocks = await db.collection('globalblocks').find({ name: 'Industries' }).toArray();
    for (const b of blocks) {
        console.log('Block targetCategory before:', b.targetCategory);
        if (b.targetCategory === 'Industries') {
            await db.collection('globalblocks').updateOne({ _id: b._id }, { $set: { targetCategory: 'industries' } });
            console.log('Fixed block targetCategory');
        }
    }
    
    process.exit(0);
}
fix().catch(console.error);
