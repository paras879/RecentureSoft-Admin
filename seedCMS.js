const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin:admin@recenturesoft.f6lmd.mongodb.net/?retryWrites=true&w=majority&appName=RecentureSoft";

mongoose.connect(MONGODB_URI).then(async () => {
    console.log("Connected to DB");
    const WebPage = mongoose.models.WebPage || mongoose.model('WebPage', new mongoose.Schema({
        name: String,
        path: String,
        category: String,
        subcategory: String,
        templateType: String,
        isActive: Boolean,
        seoTitle: String,
        seoDescription: String,
        content: mongoose.Schema.Types.Mixed,
    }, { timestamps: true }));

    let page = await WebPage.findOne({ path: '/cms' });
    if (!page) {
        page = new WebPage({
            name: 'CMS',
            path: '/cms',
            category: 'Solutions',
            subcategory: '',
            templateType: 'default',
            isActive: true,
            seoTitle: 'Best CMS Software Development Company In India | RecentureSoft',
            seoDescription: 'RecentureSoft offers top-tier custom CMS software development services in India to manage digital content and streamline business processes.',
            content: {}
        });
        await page.save();
        console.log("Created CMS page in DB");
    } else {
        console.log("CMS page already exists");
    }
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
