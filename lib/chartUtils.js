export function generateLast7DaysChartData(records, countKey = "count") {
    const dataByDate = {};
    const chartData = [];
    
    // Initialize the last 7 days with 0 counts
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        
        let label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (i === 0) label = "Today";
        if (i === 1) label = "Yesterday";
        
        const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        dataByDate[dateStr] = { label, [countKey]: 0 };
    }

    // Populate with actual records
    records.forEach(record => {
        if (!record.createdAt) return;
        const dateObj = new Date(record.createdAt);
        const dateStr = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (dataByDate[dateStr]) {
            dataByDate[dateStr][countKey]++;
        }
    });

    // Build array chronologically (from 6 days ago to Today)
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        
        if (dataByDate[dateStr]) {
            chartData.push({
                date: dataByDate[dateStr].label,
                [countKey]: dataByDate[dateStr][countKey]
            });
        }
    }
    
    return chartData;
}
