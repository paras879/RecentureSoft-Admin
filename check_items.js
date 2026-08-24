const mongoose = require('mongoose');
async function check() {
    await mongoose.connect('mongodb+srv://parastomar851_db_user:India123@cluster0.uab9v6f.mongodb.net/contactdb?retryWrites=true&w=majority&appName=Cluster0');
    const db = mongoose.connection;
    const blocks = await db.collection('globalblocks').find({ name: 'Industries' }).toArray();
    for (const b of blocks) {
        if (b.blockData && b.blockData.blocks) {
            for (const section of b.blockData.blocks) {
                if (section.type === 'cards') {
                    console.log('Total items:', section.items.length);
                    console.log('Item 0:', section.items[0]);
                    console.log('Item 1:', section.items[1]);
                    console.log('Item 2:', section.items[2]);
                }
            }
        }
    }
    process.exit(0);
}
check().catch(console.error);
