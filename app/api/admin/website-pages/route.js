import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WebPage from "@/models/WebPage";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();

        const allStaticPages = [
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            
            // Software Development
            { name: "CRM Development", path: "/crm", category: "Solutions", subcategory: "Software Development" },
            { name: "CMS Development", path: "/cms", category: "Solutions", subcategory: "Software Development" },
            { name: "Salesforce Solutions", path: "/salesforce", category: "Solutions", subcategory: "Software Development" },
            { name: "Dashboard", path: "/dashboard", category: "Solutions", subcategory: "Software Development" },
            
            // Web Development
            { name: "Next.js Development", path: "/next-js", category: "Solutions", subcategory: "Web Development" },
            { name: "React Development", path: "/react", category: "Solutions", subcategory: "Web Development" },
            { name: "Web Design", path: "/web-design", category: "Solutions", subcategory: "Web Development" },

            // E-Commerce
            { name: "OpenCart Development", path: "/opencart-development", category: "Solutions", subcategory: "E-Commerce" },
            { name: "Magento Development", path: "/magento-development", category: "Solutions", subcategory: "E-Commerce" },
            { name: "eBay Store Management", path: "/ebay-store-management", category: "Solutions", subcategory: "E-Commerce" },
            { name: "Amazon Store Management", path: "/amazon-store-management", category: "Solutions", subcategory: "E-Commerce" },
            { name: "WordPress Development", path: "/wordpress-development-customization", category: "Solutions", subcategory: "E-Commerce" },

            // Mobile App Development
            { name: "iPhone App Development", path: "/iphone-apps-development", category: "Solutions", subcategory: "Mobile App Development" },
            { name: "iPad App Development", path: "/ipad-app-development", category: "Solutions", subcategory: "Mobile App Development" },
            { name: "Android App Development", path: "/android-application-development", category: "Solutions", subcategory: "Mobile App Development" },

            // Technology Solution
            { name: "Node.js Development", path: "/node-js", category: "Solutions", subcategory: "Technology Solution" },
            { name: "React Native Development", path: "/react-native", category: "Solutions", subcategory: "Technology Solution" },

            // Digital Marketing
            { name: "SEO Services", path: "/seo-service", category: "Solutions", subcategory: "Digital Marketing" },
            { name: "SEO Packages", path: "/seo-package", category: "Solutions", subcategory: "Digital Marketing" },
            { name: "Social Networking Apps", path: "/social-networking", category: "Solutions", subcategory: "Digital Marketing" },
            { name: "Content Writing", path: "/content-writing", category: "Solutions", subcategory: "Digital Marketing" },
            { name: "AI SEO", path: "/ai-seo", category: "Solutions", subcategory: "Digital Marketing" },

            // AI Development Solutions
            { name: "Generative AI", path: "/generative-ai", category: "Solutions", subcategory: "AI Development Solutions" },
            { name: "AI Services", path: "/ai-services", category: "Solutions", subcategory: "AI Development Solutions" },
            { name: "AI Agent Development", path: "/ai-agent-development", category: "Solutions", subcategory: "AI Development Solutions" },
            { name: "AI Chatbot Development", path: "/ai-chatbot-development", category: "Solutions", subcategory: "AI Development Solutions" },
            { name: "RAG Development", path: "/rag-development", category: "Solutions", subcategory: "AI Development Solutions" },

            // Other Pages
            { name: "Blog", path: "/blog" },
            { name: "Career", path: "/career" },
            { name: "Contact Us", path: "/contact" },
            { name: "Cookies Policy", path: "/cookies" },
            { name: "Events", path: "/events" },
            { name: "News", path: "/news" },
            { name: "Portfolio", path: "/portfolio" },
            { name: "Privacy Policy", path: "/privacy-policy" },
            { name: "HTML Sitemap", path: "/sitemap" },
            { name: "Terms & Conditions", path: "/terms" }
        ];

        // Default content seeded on first insert — never overwrites saved changes
        const LEGAL_DEFAULT_CONTENT = {
            "/android-application-development": {
                heroTitle: "Android Application Development Company",
                heroHighlight: "In India",
                heroDesc: "",
                heroImage: "/Banner/android.webp",
                services: [
                    { icon: "Code2", title: "Native App Development", desc: "Built specifically for Android using Java, Kotlin, and Android Studio for maximum hardware compatibility and a seamless experience." },
                    { icon: "Globe", title: "Hybrid App Development", desc: "Cross-platform solutions utilizing HTML5, JavaScript, CSS, and React Native to reach a wider audience across multiple devices." },
                    { icon: "Layout", title: "Customised Android Apps", desc: "Highly scalable, packed with relevant features, and intuitive UI/UX to ensure your customers can navigate easily without any hassle." },
                    { icon: "ShieldCheck", title: "Enterprise-Grade Apps", desc: "Robust and highly secured applications designed to streamline organizational processes, decrease downtime, and boost productivity." },
                    { icon: "Navigation", title: "GPS & GIS Capabilities", desc: "Integrate powerful mapping, routing, and product tracking features seamlessly into your Android mobile application." },
                    { icon: "Camera", title: "Camera & Video Integration", desc: "Increase coverage and security with advanced media integrations like face verification, QR scanning, and media sharing." }
                ],
                steps: [
                    { title: "Requirement Gathering", desc: "Understanding your business model, roadmap creation, and setting milestones." },
                    { title: "UI/UX Design", desc: "Designing an uncompromised, engaging, appealing, and user-friendly interface." },
                    { title: "Prototyping", desc: "Listing features and building an initial blueprint to eliminate early bugs." },
                    { title: "App Development", desc: "Coding the final product while incorporating your feedback transparently." },
                    { title: "QA & Testing", desc: "Conducting harsh tests for functions, performance, and advanced security." },
                    { title: "Deployment & Support", desc: "Launching on the Google Play Store followed by proactive maintenance." }
                ],
                benefits: [
                    { icon: "Zap", title: "High ROI & Lower Costs", desc: "Interactive applications that boost customer acquisition and retention with minimal maintenance overhead." },
                    { icon: "Rocket", title: "Quicker Deployment", desc: "Reduced time-to-market using an expansive array of advanced tools, giving you a strong competitive edge." },
                    { icon: "Layers", title: "Numerous Platforms", desc: "Java compatibility ensures seamless integration with a multitude of diverse operating systems." },
                    { icon: "Cpu", title: "Versatility & Scalability", desc: "Compatible with smartphones, smartwatches, Android TV, IoT, AR, and VR for maximum future-proofing." },
                    { icon: "Lock", title: "Improved Security", desc: "Tackling safety concerns natively with the latest built-in security features and strict encryption tools." },
                    { icon: "Settings", title: "Custom Options", desc: "As an open-source platform, it enables businesses to make versatile and highly tailor-made adaptations." }
                ]
            },
            "/ai-seo": {
                hero: {
                    title: "AI SEO Services in India",
                    highlight: "",
                    description: "",
                    bannerImage: "/Banner/ai_seo.webp",
                    ctaText: "",
                    ctaLink: ""
                },
                intro: {
                    title: "Next-Generation",
                    highlight: "AI SEO",
                    titleEnd: "Services",
                    description: "The landscape of Search Engine Optimization is evolving rapidly. At Recenturesoft, we integrate cutting-edge Artificial Intelligence with proven SEO strategies to give your business an unfair advantage in search engine rankings."
                },
                whyTitle: "Why AI for SEO?",
                whyDesc1: "Traditional SEO relies heavily on manual research and guesswork. AI SEO changes the game by processing massive amounts of data in seconds. It understands user intent, analyzes competitors with pinpoint accuracy, and generates content briefs that are perfectly aligned with what search engines want to see.",
                whyDesc2: "Our AI SEO services not only save time but also deliver highly accurate, data-backed results that continuously adapt to Google's ever-changing algorithms.",
                whyCards: [
                    { icon: "Cpu", title: "Smart Algorithms", desc: "Data-driven insights tailored for your target audience." },
                    { icon: "TrendingUp", title: "Faster Growth", desc: "Achieve higher rankings in a fraction of the usual time." }
                ],
                featuresTitle: "Our AI SEO Features",
                features: [
                    { icon: "Bot", title: "AI-Powered Keyword Research", desc: "We use advanced artificial intelligence tools to find low-competition, high-conversion keywords that traditional methods miss." },
                    { icon: "Zap", title: "Automated Content Optimization", desc: "Our AI systems analyze top-ranking pages and provide actionable recommendations to optimize your content for maximum relevance." },
                    { icon: "Target", title: "Predictive SEO Analysis", desc: "Anticipate search engine algorithm changes and user behavior trends using machine learning models for proactive SEO strategies." },
                    { icon: "Globe", title: "Smart Technical SEO", desc: "Automated site audits that instantly identify and help resolve technical issues like crawl errors, broken links, and slow pages." },
                    { icon: "Rocket", title: "AI Link Building Outreach", desc: "Leverage natural language processing to find the best link-building opportunities and personalize outreach campaigns at scale." },
                    { icon: "BarChart3", title: "Real-time Performance Tracking", desc: "Get dynamic reports powered by AI that don't just show numbers but explain what they mean for your business growth." }
                ],
                cta: {
                    title: "Dominate Search Rankings with AI",
                    description: "Don't let your competitors outsmart you. Partner with Recenturesoft and let our Artificial Intelligence SEO strategies drive targeted traffic and exponential growth to your website.",
                    buttonText: "Get Started With AI SEO"
                }
            },
            "/wordpress-development-customization": {
                hero: {
                    title: "WordPress",
                    highlight: "Customization",
                    description: "Create stunning, high-performance, and SEO-optimized websites with our custom WordPress development and theme customization services.",
                    bannerImage: "/Banner/Wordpress.webp",
                    ctaText: "",
                    ctaLink: ""
                },
                intro: {
                    heading: "WordPress Development & Customization Company in India",
                    desc: "Combine innovation, flexibility, and mature technology with Recenturesoft. We provide businesses with high-class WordPress Development Services at competitive costs, ensuring ultimate client satisfaction and robust business growth."
                },
                concept: {
                    heading: "The WordPress Concept",
                    desc1: "WordPress is a simple-to-use, open-source content management system that was originally developed as a blogging platform and has now transformed into an end-to-end content platform supporting all kinds of online portals, eCommerce sites, and corporate networks.",
                    desc2: "Our seasoned web developers leverage its countless opportunities for innovation and customization to proffer robust websites that enhance your business results at reasonable development costs."
                },
                reasonsTitle: "Why Build A Website With WordPress?",
                reasons: [
                    { icon: "PenTool", title: "Easy-to-Build", desc: "WordPress websites are easy to manage, while our experts craft complex themes and extensions behind the scenes." },
                    { icon: "Zap", title: "Super Smooth", desc: "The best module for end-users. It's incredibly user-friendly and doesn't require technical knowledge to operate." },
                    { icon: "Layers", title: "One for All", desc: "The only CMS that amplifies all kinds of projects, be it a blog, eCommerce website, or a corporate business site." },
                    { icon: "Globe", title: "It's Universal", desc: "A global open-source portal used by millions. Your site will always be backed by massive community popularity." },
                    { icon: "Plug", title: "Unlimited Plugins", desc: "Easily add any custom feature or functionality utilizing existing plugins or let us build custom extensions." },
                    { icon: "ShieldCheck", title: "Highly Reliable", desc: "Exceedingly reliable architecture ensures your website remains online, optimized, and completely bug-free." }
                ],
                servicesTitle: "Our Range Of WordPress Services",
                services: [
                    { icon: "Layout", title: "WordPress Theme Development", desc: "Custom WordPress theme development to compel more visitors with visually stunning and responsive designs." },
                    { icon: "Globe", title: "WordPress Website Development", desc: "Full-stack development including API integrations and headless architecture for an optimized B2B/B2C experience." },
                    { icon: "ShoppingCart", title: "WordPress eCommerce", desc: "Blend UI/UX approaches with tech skills to deliver brilliantly designed online shopping portals your consumers can't resist." },
                    { icon: "Code2", title: "Custom WP Development", desc: "With expertise in PHP frameworks and MySQL, we render an unparalleled level of service combining the latest digital trends." },
                    { icon: "Plug", title: "Plugin Development", desc: "Deliver easy-to-integrate and scalable custom WordPress plugins that keep your visitors deeply engaged." },
                    { icon: "TrendingUp", title: "WordPress SEO", desc: "Affordable and reliable SEO services to enable your website to rank high on search engines like Google and Bing." },
                    { icon: "Cpu", title: "Advanced Integration", desc: "Incorporate custom functionality, payment gateways, and CRM platforms seamlessly with your WordPress core." },
                    { icon: "RefreshCw", title: "Migration & Maintenance", desc: "Secure, hassle-free migrations from other CMS platforms and consistent support to keep your site hack-proof." }
                ],
                chooseUsTitle: "Why Recenturesoft?",
                chooseUs: [
                    { icon: "Rocket", title: "Agile Development", desc: "Certified scrum masters delivering the best solutions in shorter turnaround times." },
                    { icon: "HeartHandshake", title: "Client Engagement", desc: "Continuous feedback integration throughout the entire development process." },
                    { icon: "Clock", title: "On-time Delivery", desc: "Detailed project sheets to assure completely timely delivery without compromise." },
                    { icon: "Lock", title: "Secure & Clean Code", desc: "Well-commented coding practices ensuring a safe, secure, and lightning-fast website." }
                ],
                processTitle: "Our Development Approach",
                processSteps: [
                    "Planning & Requirement Analysis",
                    "Wireframes & Web Design",
                    "Development & Functionality Integration",
                    "QA Testing & Bug Fixing",
                    "Final Delivery & Deployment"
                ],
                cta: {
                    title: "Overcome Technology Obstacles Today",
                    desc: "We offer an extraordinary balance between cost-effectiveness and successful web development. Get in touch with our WordPress experts to receive a robust, professional, and reliable website.",
                    btnText: "Partner With Us"
                }
            },
            "/web-design": {
                hero: {
                    title: "Next-Gen Web",
                    highlight: "Design",
                    description: "We create stunning, AI-enhanced, and user-friendly web designs that offer an all-immersive digital brand experience for your customers.",
                    bannerImage: "/Banner/webdesign.webp",
                    ctaText: "",
                    ctaLink: ""
                },
                intro: {
                    title: "Allow Web Design Company in India to make your website user-friendly",
                    subtitle: "Your company is more than just a pretty picture on the screen.",
                    description1: "At Recenturesoft, the leading web design company in India, we believe that your online presence is an extrapolation of you, your product, and the tone that you set for your brand’s story. We create stunning web designs and push the envelope beyond static three-column layouts to give an all-immersive digital brand experience that resonates with your viewers. We are a team of strategic and creative techies with over 15 years of expertise in creating web designs that inform, delight, and inspire.",
                    description2: "In short - we bring your product offerings to life through next-generation web technologies and AI.",
                    description3: "Our developers, who are experts at eCommerce web design, dive deep into your industry and product aesthetics to ensure that your website represents everything that you and your business stand for. We analyse and optimise customer experience by making a well-structured, AI-enhanced, responsive web design to make your brand look like a million bucks and dramatically improve conversions."
                },
                servicesTitle: "What We Do?",
                services: [
                    { icon: "MonitorPlay", title: "Immersive UI/UX", desc: "Create exclusive user experiences that compliment a strong, modern user interface, driven by user psychology." },
                    { icon: "TrendingUp", title: "Conversion Optimization", desc: "Increase on-site engagement and drive sales with strategic layouts designed for maximum conversion." },
                    { icon: "Zap", title: "Lightning Fast & Scalable", desc: "Ensure scalability and blazing fast load times using modern frameworks like React and Next.js." },
                    { icon: "Cpu", title: "AI-Powered Personalization", desc: "Integrate AI algorithms to deliver tailored content and smart interactions for the desired end-user experience." }
                ],
                middleDesc: "We are a website design company that can craft gorgeous one-page websites through parallax scrolling, design-driven informational websites for potential and active customers, and AI-powered e-commerce websites to facilitate seamless online purchasing. We can also redesign your existing website’s clunky menus, update legacy layouts, and ensure a clean, intuitive flow throughout the platform.",
                whyTitle: "Why Recenturesoft?",
                whySubtitle: "The Recenturesoft Advantage",
                whyFeatures: [
                    "Prompt delivery framework with the best coding quality",
                    "AI-driven monitoring and regular automated updates",
                    "Over 50 international clients successfully scaled",
                    "Dedicated in-house team of full-stack engineers"
                ],
                techTitle: "Our Technology Stack",
                techStack: [
                    { icon: "Code2", title: "Modern Frontend", desc: "React, Next.js, Vue, TailwindCSS & Modern JavaScript" },
                    { icon: "Layers", title: "Robust Backend", desc: "Node.js, Python/Django, PHP, Java & Cloud Architectures" },
                    { icon: "ShieldCheck", title: "Secure Databases", desc: "PostgreSQL, MongoDB, MySQL, Oracle & MS SQL" },
                    { icon: "Sparkles", title: "AI & Innovation", desc: "Generative AI integrations, Machine Learning models & Smart APIs" }
                ],
                ctaDesc: "We have helped over 50 international clients with website design services, content creation, branding, and designing.",
                ctaTitle: "If you too have a project for us, then ring us or drop a message and let’s get started!"
            },
            "/dashboard": {
                hero: {
                    title: "Custom Dashboard",
                    highlight: "Development",
                    description: "Consolidate complex data into intuitive, real-time visual interfaces that empower your team to make faster, smarter decisions.",
                    bannerImage: "/Banner/dashboard.webp",
                    ctaText: "",
                    ctaLink: ""
                },
                contentTitle: "Transform Raw Data into",
                contentSubtitle: "Actionable Insights",
                introParagraphs: [
                    "In today's fast-paced digital economy, data is your most valuable asset. However, raw data without proper visualization is just noise. At RecentureSoft, we specialize in developing custom, high-performance dashboard applications that consolidate complex datasets into intuitive, easy-to-understand visual interfaces.",
                    "Whether you need an internal admin panel, a client-facing analytics portal, or a complex financial trading dashboard, our engineering team uses cutting-edge technologies like React, Next.js, and advanced charting libraries to build solutions that empower decision-making."
                ],
                features: [
                    { icon: "LayoutDashboard", title: "Customizable Interfaces", desc: "Drag-and-drop widgets and personalized layouts tailored to your unique business requirements.", highlights: ["Drag & Drop widgets", "Personalized layouts", "Role-based views"] },
                    { icon: "BarChart3", title: "Real-time Analytics", desc: "Monitor KPIs and metrics in real-time with automatically refreshing data streams.", highlights: ["Live data streams", "Instant KPI tracking", "Automated refresh"] },
                    { icon: "Database", title: "Data Integration", desc: "Seamlessly connect multiple data sources, APIs, and databases into a single unified view.", highlights: ["Multi-source syncing", "REST & GraphQL APIs", "Legacy system support"] },
                    { icon: "Activity", title: "Interactive Reporting", desc: "Generate dynamic, interactive reports that allow users to drill down into the specifics.", highlights: ["Drill-down charts", "Export to PDF/Excel", "Scheduled email reports"] },
                    { icon: "ShieldCheck", title: "Enterprise Security", desc: "Role-based access control and advanced encryption to keep your data secure.", highlights: ["End-to-end encryption", "Granular permissions", "SSO integration"] },
                    { icon: "Zap", title: "High Performance", desc: "Optimized queries and rendering to ensure your dashboard loads instantly even with big data.", highlights: ["Query optimization", "Edge caching", "Virtualization"] }
                ]
            },
            "/solutions": {
                hero: {
                    badge: "Our Expertise",
                    title: "Engineering",
                    highlight: "Digital Excellence",
                    description: "Discover our comprehensive suite of enterprise-grade solutions. We architect scalable, secure, and blazing fast digital products."
                },
                cta: {
                    title: "Transform Your Architecture",
                    description: "Ready to upgrade your tech stack with our premium engineering solutions? Let's build the future together.",
                    primaryBtnText: "Start Your Project",
                    secondaryBtnText: "Schedule Consultation"
                }
            },
            "/cookies": {
                lastUpdated: "June 25, 2026",
                heroTitle: "Cookies Policy",
                heroDesc: "We use cookies to improve your experience. Learn what cookies are, how we use them, and how you can manage your preferences.",
                sections: [
                    { title: "1. What Are Cookies?", content: "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.\n\nCookies do not typically contain any information that personally identifies a user, but personal information that we store about you may be linked to the information stored in and obtained from cookies." },
                    { title: "2. How We Use Cookies", content: "RecentureSoft uses cookies for several reasons, including:\n- To enable certain functions of the website, such as secure login and session management.\n- To provide analytics and understand how our website is being used to improve our services.\n- To store your preferences and personalized settings.\n- To deliver advertisements that are relevant to your interests." },
                    { title: "3. Types of Cookies", content: "We use different types of cookies to run our website and services:\n- Strictly Necessary Cookies: Essential for you to browse the website and use its features.\n- Performance Cookies: Collect information about how you use our website (e.g., which pages you visit most).\n- Functionality Cookies: Allow our website to remember choices you make (e.g., language preferences).\n- Targeting/Advertising Cookies: Used to deliver ads more relevant to you and your interests." },
                    { title: "4. Third-Party Cookies", content: "In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and integrate with external services (like Google Analytics or social media widgets).\n\nThese third parties may also place cookies on your device when you visit our website." },
                    { title: "5. Managing Cookies", content: "You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies.\n\nIf you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted." },
                    { title: "6. Policy Updates", content: "We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons.\n\nPlease re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies." },
                    { title: "7. Contact Us", content: "If you have any questions about our use of cookies or other technologies, please contact us at:\n\nRecentureSoft Infotech\nprivacy@recenturesoft.com" }
                ],
                faqs: [
                    { question: "Are cookies safe?", answer: "Yes, cookies are simply text files and cannot transmit viruses or damage your computer." },
                    { question: "Do I have to accept cookies?", answer: "No, you can configure your browser to block all cookies. However, blocking strictly necessary cookies may cause parts of the website to not work properly." }
                ]
            },
            "/privacy-policy": {
                lastUpdated: "June 17, 2026",
                heroDesc: "We believe in full transparency. Learn exactly how we collect, use, and protect your personal information in our simple, easy-to-read policy.",
                sections: [
                    { title: "1. Introduction", content: "Welcome to our Privacy Policy. This document explains how we collect, use, disclose, and safeguard your information when you visit our website and use our software services. Please read this privacy policy carefully.\n\nBy using our services, you consent to the data practices described in this statement. If you do not agree with the terms of this privacy policy, please do not access the site." },
                    { title: "2. User Information", content: "We collect information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products, or otherwise contact us.\n\n- Personal Data: Name, email address, phone number, and physical address.\n- Derivative Data: Information our servers automatically collect when you access the site, such as your IP address, browser type, and operating system." },
                    { title: "3. Cookies Policy", content: "We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience.\n\nMost browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site." },
                    { title: "4. Third-Party Links", content: "The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us.\n\nOnce you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information." },
                    { title: "5. Information Sharing", content: "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.\n\n- Vendors & Consultants: Third-party vendors who perform services for us.\n- Business Transfers: In connection with any merger or sale of company assets." },
                    { title: "6. Information Security", content: "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable." },
                    { title: "7. Data Retention", content: "We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law." },
                    { title: "8. User Rights", content: "Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances.\n\nTo request to review, update, or delete your personal information, please submit a request form through our contact page." },
                    { title: "9. Grievance Redressal", content: "If you have any questions or concerns about our privacy practices or your data, you have the right to file a grievance with our designated Data Protection Officer.\n\nWe take all grievances seriously and aim to resolve them within 30 business days." },
                    { title: "10. Contact Information", content: "If you have questions or comments about this notice, you may email us or by post to:\n\nRecentureSoft Infotech\n123 Innovation Drive, Tech Park\nprivacy@recenturesoft.com" }
                ]
            },
            "/terms": {
                lastUpdated: "June 25, 2026",
                heroDesc: "Please read these terms carefully before using our services. They outline your rights, responsibilities, and our commitment to you.",
                sections: [
                    { title: "1. Introduction", content: "Welcome to RecentureSoft. By accessing our website and utilizing our software services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.\n\nThese terms constitute a legally binding agreement made between you and RecentureSoft, concerning your access to and use of our services." },
                    { title: "2. User Obligations", content: "By using our services, you represent and warrant that:\n- All registration information you submit will be true, accurate, current, and complete.\n- You will maintain the accuracy of such information and promptly update it as necessary.\n- You have the legal capacity and you agree to comply with these Terms of Service.\n- You will not use the services for any illegal or unauthorized purpose." },
                    { title: "3. Our Services", content: "RecentureSoft provides software development and technology consulting services. We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice." },
                    { title: "4. Intellectual Property", content: "Unless otherwise indicated, the Services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Services are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws." },
                    { title: "5. Third-Party Links", content: "The Services may contain links to third-party websites or services that are not owned or controlled by RecentureSoft. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services." },
                    { title: "6. Limitation of Liability", content: "In no event will RecentureSoft or its directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Services." },
                    { title: "7. Governing Law", content: "These Terms shall be governed and construed in accordance with the laws applicable in the jurisdiction of RecentureSoft's principal place of business, without regard to its conflict of law provisions." },
                    { title: "8. Contact Information", content: "If you have questions about these Terms, please contact us at:\n\nRecentureSoft Infotech\nprivacy@recenturesoft.com" }
                ]
            },
            "/salesforce": {
                heroTitle: "Salesforce",
                heroHighlight: "Solutions",
                heroDesc: "Leverage the world's leading CRM platform to transform your sales, marketing, and customer service strategy with our full-cycle consulting.",
                heroImage: "/Banner/salesforce.webp",
                sec1Title: "Increase Business Efficiency with Salesforce Integration Company in India",
                sec1P1: "The road to gaining customers goes through the digital landscape. Recenturesoft delivers full-cycle Salesforce consulting services to help businesses leverage the world’s leading CRM platforms in the entirety of its benefits for your industry.",
                sec1P2: "We provide personalised services, quick response, and smooth user-interface to your digitally connected customers. Our Salesforce solutions are focussed to create innovative platforms which enable organisations to reimagine their relationships with customers and add a new dimension across all channels and at every touch point.",
                sec1P3: "Recenturesoft’s Salesforce puts your target customers at the centre of everything we do. We aim to support organisations to get the most out of their Salesforce implementation to boost sales, improve efficiency and productivity, and improve customer service. All this, while reducing your operational costs and time-to-market to the minimum.",
                sec2Title: "What we do?",
                whatWeDoList: [
                    "Strategic assessment",
                    "Build enterprise cloud computing capability",
                    "Improve agility and delivery speed of your services"
                ],
                sec3Title: "Salesforce Integration Company in India",
                sec3P1: "We help you achieve real, tangible, and significant business results. We innovate to transform your sales, marketing, customer service, and commerce cloud strategy and yield higher revenue. With the combined strength of our technological expertise and CRM solution–Salesforce, Recenturesoft can help you accelerate digital transformation with better performance and customer-centric business value.",
                sec4Title: "What we bring to your project?",
                sec4Subtitle: "Recenturesoft’s team is qualified to deliver Salesforce flagship products, including:",
                whatWeBringList: [
                    "Roll-out of the sales cloud",
                    "Launch of the marketing cloud",
                    "Roll-out of the community cloud",
                    "Launch of the service cloud"
                ],
                sec4P1: "Recenturesoft comprehends the idea of being connected with the customers and understands the importance of your customers’ relationship with your business. Hence, we offer Salesforce solutions which are comprehensive, quick, scalable, and easy to use and apply.",
                sec5Title: "Our salesforce solutions deliver:",
                whatWeDeliverList: [
                    "Improved business efficiency",
                    "Proper and balanced distribution of work",
                    "Maximum ROI and profit margins",
                    "Withhold the existing customer and add new ones"
                ],
                sec5P1: "We also provide Salesforce add-ons to improve the functionality and value to your marketing and sales activities. Our cost-effective Salesforce solutions provide you with suitable license options that fit the scope and demands of your business.",
                sec6Title: "What we can do",
                whatWeCanDoList: [
                    "Transform scattered customer or partner data across systems and departments in a systematic manner",
                    "Facilitate adoption of the CRM system",
                    "Improve sales processes, increase sales productivity",
                    "Increase lead conversion rate",
                    "Add a personal touch to your marketing activities",
                    "Align your sales, marketing, and support teams",
                    "Deliver consistent customer service across all departments",
                    "Uniform shopping experience across all online channels",
                    "Faster customer service."
                ],
                sec6P1: "We can track your customers’ activity at each end, their purchase and sales habits, provide you with their history of purchase orders, invoices, and sales orders to help you identify your target audience for a particular product. We even help with cross-selling or upselling by providing old data. Our Salesforce solutions systematically take customers communication, feedback, problems, and solutions and help you improve your services.",
                sec6P2: "We welcome you to tap into the rich 10 year-experience of our Salesforce consultants. After having worked with a variety of industries, we have positioned ourselves to deliver precise solutions to increase sales and customer engagement in IT, business services, manufacture, automotive, wellness, and other sectors.",
                sec6P3: "If this has enticed you to influence your customers in a positive way, then connect with Recenturesoft today!",
                sec6P4: "Drop us an email or call, or if you feel like going by the traditional way, let’s catch up over tea and discuss future propositions."
            },
            "/seo-service": {
                introTitle: "What are the pros of an SEO Company in India?",
                introDesc: "Are you struggling to generate high-quality traffic for your website? Let your digital footprint disrupt your competitors with Recenturesoft's Ecommerce SEO services! We provide highly adaptable marketing services to increase your search engine ranking consistently.",
                approachTitle: "Our Strategic Approach",
                approachDesc: "From day 1, we kick start your SEO campaign by delivering creative strategies that help Google understand you and your brand better.",
                approaches: [
                    { title: "Deep Dive Analysis", desc: "A 200+ point on-site SEO analysis of your organization, server, competitors, and products." },
                    { title: "UX & IA Rework", desc: "Refining usability, site architecture, and crafting attention-grabbing title and meta descriptions." },
                    { title: "Targeted Keyword Research", desc: "Industry-specific keyword analysis, mapping updates, and number crunching to measure conversions." },
                    { title: "ROI Tracking", desc: "Regular tests for continual improvements via Conversion Path Analysis and Calls-to-action tweaks." }
                ],
                whyTitle: "Why Recenturesoft?",
                whyDesc: "Among the thousands of fly-by-night SEO Agencies, the good news is you have found us. We provide a host of customizable services tailored to boost your digital presence and make your webpage a leading industry resource.",
                servicesTitle: "Our SEO Service Offerings Include",
                services: [
                    { title: "Competitor Analysis", desc: "Turn competition into opportunities. We gauge competitors by the clicks they get and emulate winning content and keywords." },
                    { title: "On-Page Optimisation", desc: "Optimize over 15 on-page factors like meta tags, website speed, and UX to ensure thrilling load times and seamless navigation." },
                    { title: "Off-Page Optimisation", desc: "Bring your website the best organic exposure possible, increase visitors, and activate high-quality connections across the web." },
                    { title: "Content Marketing", desc: "Influential content acts as fuel. Our writers ensure solid keyword density that rapidly indexes and elevates your thought leadership." },
                    { title: "Social Media", desc: "Aggressive social media strategies built for platforms like Facebook and Twitter to dramatically increase your brand value." },
                    { title: "Link Building", desc: "Powerful, non-cookie-cutter link building. We place your brand in high-quality directories, PR sites, and blogs to stimulate engagement." }
                ],
                locationsTitle: "Our Presence Across India",
                locations: [
                    "Ahmedabad", "Ambala", "Amritsar", "Bhopal", 
                    "Bhubaneswar", "Coimbatore", "Delhi", "Kolkata", 
                    "Meerut", "Nagpur", "Noida", "Panchkula", 
                    "Pondicherry", "Varanasi"
                ],
                ctaTitle: "Top Search Ranking is a Coveted Position",
                ctaDesc: "We can help you get there. Just give us a call or drop a message and let's collaborate to accelerate your digital growth.",
                ctaBtnText: "Boost Your SEO Today"
            },
            "/social-networking": {
                hero: {
                    title: "SMO Company in India",
                    highlight: "",
                    description: "",
                    bannerImage: "/Banner/social_networking.webp",
                    bannerOpacity: 70,
                    ctaText: "Get in Touch",
                    ctaLink: "",
                    hideContactButton: false
                },
                intro: {
                    visible: true,
                    title: "Get Popular with an SMO Company in India",
                    highlightText: "SMO Company",
                    description: "With a plethora of social media platforms existing today, it's just next to impossible to manage all of them at the same time. That's where our SMM (Social Media Management) services come into the picture!"
                },
                approach: {
                    visible: true,
                    title: "Our Strategic Approach",
                    description1: "Our SEM and SEO services are executed after fully knowing your specifications. At our company, our online marketing professionals work closely with you while delivering their social marketing campaigns.",
                    description2: "We are considered as the trusted SEO/SMO service providers in India who can make you a leader in your field and build the best brand awareness for you.",
                    cards: [
                        { icon: "Target", title: "Custom Strategies", description: "Tailored perfectly for your unique brand voice.", visible: true },
                        { icon: "BarChart3", title: "Data-Driven", description: "Tracking customer behavior for maximum ROI.", visible: true }
                    ]
                },
                features: {
                    visible: true,
                    title: "Our SMO Offerings",
                    cards: [
                        { icon: "Share2", title: "Social Media Management", description: "It's next to impossible to manage all platforms at the same time. We execute quality SMO services to strengthen your brand online.", visible: true },
                        { icon: "Crosshair", title: "Targeted Automatons", description: "Use the best technology to improve your brand presence and deliver your brand's true message and value correctly.", visible: true },
                        { icon: "TrendingUp", title: "Maximum ROI", description: "Aimed at enhancing the sales of our clients' business by creating highly customized strategies for their brand.", visible: true },
                        { icon: "MapPin", title: "Local Maps & Optimization", description: "Proprietary technology and local maps integration that makes our clients' site outrank competitors in specific keyword searches.", visible: true },
                        { icon: "Users", title: "Customer Tracking", description: "We track your customers' behavior continuously to maximize your Return on Investment and refine campaigns.", visible: true },
                        { icon: "Smile", title: "Wipe Out Business Stress", description: "You would love working with us as we try to wipe out your business-related stress in one go. Experts always at your service.", visible: true }
                    ]
                },
                cta: {
                    visible: true,
                    icon: "Sparkles",
                    title: "Working With Recenturesoft",
                    description: "All our experts are at your service whenever you need any help. We work towards providing total satisfaction to our customers with our excellent work.",
                    buttonText: "Get Started Today",
                    buttonLink: ""
                }
            }
        };

        let pages = await WebPage.find().sort({ createdAt: 1 }).lean();

        const bulkOps = allStaticPages.map((page) => {
            const defaultContent = LEGAL_DEFAULT_CONTENT[page.path];
            return {
                updateOne: {
                    filter: { path: page.path },
                    update: { 
                        $setOnInsert: {
                            name: page.name,
                            path: page.path,
                            status: "active",
                            ...(defaultContent ? { content: defaultContent } : {})
                        },
                        $set: { category: page.category || "", subcategory: page.subcategory || "" }
                    },
                    upsert: true
                }
            };
        });
        await WebPage.bulkWrite(bulkOps);

        // Backfill: for pages already in DB with no content, seed it now
        for (const [path, defaultContent] of Object.entries(LEGAL_DEFAULT_CONTENT)) {
            await WebPage.updateOne(
                { path, $or: [{ content: { $exists: false } }, { content: null }, { content: {} }] },
                { $set: { content: defaultContent } }
            );
        }

        pages = await WebPage.find().sort({ createdAt: 1 }).lean();

        return NextResponse.json({ success: true, pages });
    } catch (error) {
        console.error("Error fetching pages:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();

        if (!data.name || !data.path) {
            return NextResponse.json({ success: false, message: "Name and path are required" }, { status: 400 });
        }

        const formattedPath = data.path.startsWith("/") ? data.path : `/${data.path}`;

        const existing = await WebPage.findOne({ path: formattedPath });
        if (existing) {
            return NextResponse.json({ success: false, message: "Page with this path already exists" }, { status: 400 });
        }

        const newPage = await WebPage.create({
            name: data.name,
            path: formattedPath,
            status: "active",
            category: data.category || "",
            subcategory: data.subcategory || "",
            templateType: data.templateType || "default"
        });

        return NextResponse.json({ success: true, page: newPage });
    } catch (error) {
        console.error("Error creating page:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const data = await req.json();

        if (!data.id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }

        const updateData = {};
        if (data.status !== undefined) updateData.status = data.status;
        if (data.seoTitle !== undefined) updateData.seoTitle = data.seoTitle;
        if (data.seoDescription !== undefined) updateData.seoDescription = data.seoDescription;
        if (data.content !== undefined) updateData.content = data.content;
        if (data.category !== undefined) updateData.category = data.category;
        if (data.subcategory !== undefined) updateData.subcategory = data.subcategory;
        if (data.templateType !== undefined) updateData.templateType = data.templateType;

        const updatedPage = await WebPage.findByIdAndUpdate(
            data.id,
            updateData,
            { new: true }
        );

        if (!updatedPage) {
            return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
        }

        if (data.status !== undefined) {
            const mainSiteUrl = process.env.MAIN_SITE_URL || "http://localhost:3000";
            const revalSecret = process.env.REVALIDATION_SECRET;

            try {
                await fetch(`${mainSiteUrl}/api/revalidate-pages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(revalSecret ? { "x-revalidate-secret": revalSecret } : {}),
                    },
                    body: JSON.stringify({
                        path: updatedPage.path,
                    }),
                });
            } catch (revalErr) {
                console.warn("[website-pages] Revalidation ping failed:", revalErr.message);
            }
        }

        return NextResponse.json({ success: true, page: updatedPage });
    } catch (error) {
        console.error("Error updating page:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }

        const deletedPage = await WebPage.findByIdAndDelete(id);

        if (!deletedPage) {
            return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Page deleted successfully" });
    } catch (error) {
        console.error("Error deleting page:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

