const fs = require('fs');

const path = 'c:\\Users\\Paras Tomar\\OneDrive\\Desktop\\RecentureSoft-Admin\\app\\admin\\(dashboard)\\website-pages\\page.jsx';
let content = fs.readFileSync(path, 'utf8');
let lines = content.split('\n');

let newLines = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('{editPage.path === "/wordpress-development-customization" && (') && lines[i+2].includes('setActiveEditTab("wp-hero")')) {
        skip = true;
    }
    
    if (skip && line.includes('</div>') && lines[i+1] && lines[i+1].includes('Main Content Area')) {
        skip = false;
        continue;
    }

    if (line.includes('{/* ===== WORDPRESS DEVELOPMENT PANELS ===== */}')) {
        skip = true;
    }

    if (skip && line.includes('{/* ===== COOKIES PAGE CONTENT PANELS ===== */}')) {
        skip = false;
    }
    
    if (!skip) {
        newLines.push(line);
    }
}

fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log("File updated successfully.");
