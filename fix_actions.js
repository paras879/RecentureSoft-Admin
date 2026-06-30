const fs = require('fs');

let content = fs.readFileSync('app/admin/actions.js', 'utf8');

// Replace existing ones
content = content.replace(/checkPermission\('blogs_[a-z]+',\s*'write'\)/g, "checkPermission('blogs', 'manage')");

// We need to add checkPermission to others: createPortfolio, updatePortfolio, createService, updateService, etc.

const modules = {
    'Portfolio': 'portfolio',
    'Service': 'services',
    'JobOpening': 'jobs',
    'Subscriber': 'subscribers',
    // add others if needed
};

for (const [funcName, moduleKey] of Object.entries(modules)) {
    // Add to create
    content = content.replace(
        new RegExp(\export async function create\\\\\(formData\\\\) \\\\{\\\\s+try \\\\{\),
        \export async function create\(formData) {\\n    try {\\n        const hasAccess = await checkPermission('\', 'manage');\\n        if (!hasAccess) return { success: false, error: "Unauthorized to create \." };\
    );
    // Add to update
    content = content.replace(
        new RegExp(\export async function update\\\\\(id, formData\\\\) \\\\{\\\\s+try \\\\{\),
        \export async function update\(id, formData) {\\n    try {\\n        const hasAccess = await checkPermission('\', 'manage');\\n        if (!hasAccess) return { success: false, error: "Unauthorized to update \." };\
    );
    // Add to delete
    content = content.replace(
        new RegExp(\export async function delete\\\\\(id\\\\) \\\\{\\\\s+try \\\\{\),
        \export async function delete\(id) {\\n    try {\\n        const hasAccess = await checkPermission('\', 'manage');\\n        if (!hasAccess) return { success: false, error: "Unauthorized to delete \." };\
    );
}

fs.writeFileSync('app/admin/actions.js', content, 'utf8');
