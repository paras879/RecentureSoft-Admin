// Script to update Mobile-First Booking Apps scene to MobileAppGraphic
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
                const key = match[1];
                let value = match[2] || '';
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                } else if (value.startsWith("'") && value.endsWith("'")) {
                    value = value.slice(1, -1);
                }
                process.env[key] = value.trim();
            }
        });
    }
} catch (e) {
    console.error('Error loading .env.local:', e);
}

async function fixMobileScene() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const Service = mongoose.model('Service', new mongoose.Schema({}, { strict: false }), 'Service');
    
    // Find all services to see what scenes they have
    const all = await Service.find({}).lean();
    console.log('\nCurrent services and scenes:');
    all.forEach(s => console.log(`  - "${s.title}" → scene: ${s.scene}`));

    // Update Mobile-First Booking Apps to use MobileAppGraphic
    const result = await Service.updateMany(
        { title: { $regex: /mobile/i } },
        { $set: { scene: 'MobileAppGraphic' } }
    );

    console.log(`\nUpdated ${result.modifiedCount} service(s) to MobileAppGraphic`);

    // Verify
    const updated = await Service.find({ scene: 'MobileAppGraphic' }).lean();
    console.log('Services now using MobileAppGraphic:');
    updated.forEach(s => console.log(`  ✓ ${s.title}`));

    await mongoose.disconnect();
    console.log('\nDone!');
}

fixMobileScene().catch(console.error);
