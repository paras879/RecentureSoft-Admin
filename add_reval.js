const fs = require('fs');
const path = require('path');

const fetchSnippet = 
        const mainSiteUrl = process.env.MAIN_SITE_URL || 'http://localhost:3000';
        const revalSecret = process.env.REVALIDATION_SECRET;
        try {
            await fetch(\\/api/revalidate-pages\, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(revalSecret ? { 'x-revalidate-secret': revalSecret } : {}),
                },
                body: JSON.stringify({ path: '' }),
            });
        } catch (e) {
            console.error('Failed to ping frontend revalidate', e);
        }
;

const file1 = path.join(process.cwd(), 'app/api/admin/global-blocks/route.js');
let content1 = fs.readFileSync(file1, 'utf8');

if (!content1.includes('mainSiteUrl =')) {
    content1 = content1.replace('revalidateTag("global-blocks");', 'revalidateTag("global-blocks");\n' + fetchSnippet);
    fs.writeFileSync(file1, content1);
}

const file2 = path.join(process.cwd(), 'app/api/admin/global-blocks/[id]/route.js');
let content2 = fs.readFileSync(file2, 'utf8');

if (!content2.includes('mainSiteUrl =')) {
    // There are multiple revalidateTag calls in [id]/route.js (PUT and DELETE)
    // Replace all occurrences of revalidateTag("global-blocks"); with it + the fetchSnippet
    content2 = content2.split('revalidateTag("global-blocks");').join('revalidateTag("global-blocks");\n' + fetchSnippet);
    fs.writeFileSync(file2, content2);
}

console.log('Added frontend revalidation to global-blocks endpoints.');
