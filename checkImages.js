// Debug: Check what images are stored in MongoDB for each service
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

try {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                process.env[match[1]] = (match[2] || '').trim();
            }
        });
    }
} catch (e) { console.error(e); }

async function checkImages() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const Service = mongoose.model('Service', new mongoose.Schema({}, { strict: false }), 'Service');
    const all = await Service.find({}).lean();
    
    console.log('=== SERVICE IMAGES REPORT ===\n');
    all.forEach(s => {
        console.log(`📋 "${s.title}"`);
        console.log(`   scene: ${s.scene}`);
        console.log(`   images (array): ${JSON.stringify(s.images || [])}`);
        console.log(`   image (single): ${s.image || '(empty)'}`);
        console.log(`   status: ${s.status}`);
        console.log('');
    });

    await mongoose.disconnect();
}

checkImages().catch(console.error);
