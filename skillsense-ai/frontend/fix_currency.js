const fs = require('fs');
const files = [
    'app/(dashboard)/institute/placement/page.tsx',
    'app/(dashboard)/student/jobs/page.tsx',
    'app/(dashboard)/government/fund-targeting/page.tsx',
    'app/(dashboard)/industry/demand/page.tsx',
    'components/IndustryPlans.tsx',
    'components/dashboard/SkillPassport.tsx',
    'components/dashboard/CareerPathwayCard.tsx',
    'components/charts/ProgramROIBar.tsx',
    'components/charts/PlacementLineChart.tsx',
    'components/charts/IndustryDemandBar.tsx'
];

files.forEach(f => {
    let p = require('path').join(process.cwd(), f);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');
    
    // Process template literals
    content = content.replace(/`([^`]*)`/g, m => m.replace(/₹/g, '\\u20B9'));
    // Process quotes
    content = content.replace(/'([^']*)'/g, m => m.replace(/₹/g, '\\u20B9'));
    content = content.replace(/"([^"]*)"/g, m => m.replace(/₹/g, '\\u20B9'));
    
    // Process JSX nodes
    content = content.replace(/>([^<]*)</g, m => m.replace(/₹/g, '&#8377;'));
    // Also process cases where it might be adjacent to braces e.g. }₹{
    content = content.replace(/\}₹\{/g, '}&#8377;{');
        
    fs.writeFileSync(p, content);
    console.log('Fixed', p);
});
