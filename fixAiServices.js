const fs = require('fs');

const pagePath = "c:/Users/Paras Tomar/OneDrive/Desktop/RecentureSoft-Admin/app/admin/(dashboard)/website-pages/page.jsx";
let content = fs.readFileSync(pagePath, 'utf8');

content = content.split('"/ai-consulting-services"').join('"/ai-services"');

fs.writeFileSync(pagePath, content, 'utf8');
console.log("Replaced /ai-consulting-services with /ai-services");
