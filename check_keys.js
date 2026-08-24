const mongoose = require('mongoose');

async function check() {
    await mongoose.connect('mongodb+srv://parastomar851_db_user:India123@cluster0.uab9v6f.mongodb.net/contactdb?retryWrites=true&w=majority&appName=Cluster0');
    const db = mongoose.connection;
    const blocks = await db.collection('globalblocks').find({ name: 'Industries' }).toArray();
    for (const b of blocks) {
        if (b.blockData && b.blockData.blocks) {
            for (const section of b.blockData.blocks) {
                if (section.type === 'cards') {
                    console.log('Keys in section:', Object.keys(section));
                }
            }
        }
    }
    process.exit(0);
}
check().catch(console.error);
