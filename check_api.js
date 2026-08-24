async function check() {
    try {
        const res = await fetch('https://recenture-soft-admin.vercel.app/api/admin/website-pages');
        const data = await res.json();
        const pages = data.pages || [];
        const autoPage = pages.find(p => p.path === '/automobile' || p.path.includes('automobile'));
        console.log('Automobile Page:', autoPage ? { path: autoPage.path, category: autoPage.category, name: autoPage.name } : 'Not found');
    } catch(e) {
        console.error(e);
    }
}
check();
