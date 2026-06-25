export async function GET(request) {
    const MOCK_NEWS = [
        {
            title: "Next.js 16 Released with Revolutionary Turbopack Compiler Enhancements",
            description: "Vercel has announced the official release of Next.js 16, introducing native compilation speedups, improved package optimizations, and developer efficiency tool upgrades.",
            image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
            source_id: "vercel_news",
            pubDate: "2026-06-22 12:00:00",
            link: "https://vercel.com/blog"
        },
        {
            title: "OpenAI Announces GPT-5: A Quantum Leap in Multi-Modal Reasoning",
            description: "OpenAI has officially launched GPT-5, showcasing exceptional performance in advanced logical deduction, programming generation, and cross-lingual translation workflows.",
            image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800",
            source_id: "techcrunch",
            pubDate: "2026-06-22 10:30:00",
            link: "https://techcrunch.com"
        },
        {
            title: "The State of Cloud Security 2026: Confronting Sophisticated AI Threats",
            description: "A comprehensive industry report reveals a 120% increase in cloud vulnerability exploitation. Experts outline zero-trust countermeasures for enterprise architectures.",
            image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
            source_id: "wired",
            pubDate: "2026-06-22 09:15:00",
            link: "https://wired.com"
        },
        {
            title: "Venture Capital Rebounds as AI Startups Secure Record-Breaking Series B Funds",
            description: "Global venture investment in artificial intelligence projects reaches a new peak in Q2 2026. Sector analysis predicts steady software velocity growth.",
            image_url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800",
            source_id: "venturebeat",
            pubDate: "2026-06-22 08:00:00",
            link: "https://venturebeat.com"
        },
        {
            title: "Rust Language Gaining Tremendous Traction in Enterprise Infrastructure Projects",
            description: "A developer survey highlights Rust as the most beloved language for systems engineering, citing superior memory safety and zero-cost abstractions as key adoption drivers.",
            image_url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800",
            source_id: "hackernews",
            pubDate: "2026-06-22 07:00:00",
            link: "https://news.ycombinator.com"
        },
        {
            title: "Apple Vision Pro 2 Introduced with Ultralight Carbon Chassis Design",
            description: "Apple has unveiled the next generation of spatial computing headsets, offering double the display resolution, improved battery performance, and spatial audio updates.",
            image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800",
            source_id: "the_verge",
            pubDate: "2026-06-22 06:00:00",
            link: "https://theverge.com"
        }
    ];

    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category") || "all";
        const search = searchParams.get("search") || "";
        const pageToken = searchParams.get("page") || "";

        const apiKey = process.env.NEWSDATA_API_KEY;

        // If API key is missing, return high-quality mocked tech news gracefully
        if (!apiKey || apiKey === "your_api_key") {
            console.warn("NEWSDATA_API_KEY is not defined. Serving fallback mock technology news.");
            return Response.json({
                results: MOCK_NEWS,
                nextPage: null
            });
        }

        // Map UI categories to NewsData search terms under technology category
        const categoryMap = {
            all: '"information technology" OR software OR developer OR cybersecurity OR ai',
            technology: '"information technology" OR software OR developer OR programming',
            ai: 'ai OR "artificial intelligence" OR "machine learning"',
            cybersecurity: 'cybersecurity OR "data security" OR "cyber attack"',
            cloud: '"cloud computing" OR aws OR azure',
            programming: 'programming OR coding OR developer',
            startups: 'startup OR startups OR venture'
        };

        const catQuery = categoryMap[category] || "";
        let qTerms = "";

        if (search.trim()) {
            qTerms = search.trim();
            if (catQuery) {
                qTerms = `(${qTerms}) AND (${catQuery})`;
            }
        } else if (catQuery) {
            qTerms = catQuery;
        }

        let newsUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&category=technology&language=en`;
        if (qTerms) {
            newsUrl += `&q=${encodeURIComponent(qTerms)}`;
        }
        if (pageToken) {
            newsUrl += `&page=${encodeURIComponent(pageToken)}`;
        }

        const res = await fetch(newsUrl, {
            next: { revalidate: 3600 } // 1 hour caching
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error(`NewsData API error status ${res.status}: ${errText}`);
            // Serve mock fallback on rate limit (status 429) or other errors to protect page availability
            return Response.json({
                results: MOCK_NEWS,
                nextPage: null,
                warning: "Serving mock news due to API rate limit or validation error."
            });
        }

        const data = await res.json();
        
        if (data.status === "error") {
            console.error("NewsData API error payload:", data);
            return Response.json({
                results: MOCK_NEWS,
                nextPage: null,
                warning: "Serving mock news due to API payload error."
            });
        }

        return Response.json({
            results: data.results || [],
            nextPage: data.nextPage || null
        });
    } catch (error) {
        console.error("NewsData API integration error:", error);
        return Response.json({
            results: MOCK_NEWS,
            nextPage: null,
            warning: "Serving mock news due to server integration crash."
        });
    }
}