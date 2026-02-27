const fs = require('fs');
const path = require('path');

const email = 'digitalhubcontent@gmail.com';
const subject = encodeURIComponent('Custom Project Inquiry');
const mailtoLink = `mailto:${email}?subject=${subject}`;

const templatesDir = path.join(__dirname, 'src', 'app', 'templates');
const mainPricingPath = path.join(__dirname, 'src', 'app', 'pricing', 'page.tsx');

function updatePricingPage(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Look for Link href="/contact" or href='/contact' 
    // Specifically around the Enterprise / Contact Sales area

    let modified = content;

    // Pattern 1: main pricing page
    modified = modified.replace(/href=\{tier\.name === 'Enterprise' \? '\/contact' : '\/library'\}/g,
        `href={tier.name === 'Enterprise' ? '${mailtoLink}' : '/library'}`);

    // Pattern 2: Template pricing pages
    // They usually have: href={tier.cta === 'Contact Sales' ? '/contact' : '/templates/crm-01/...'}
    // Or similar logic. Let's just find '/contact' and replace with mailtoLink.
    // We only want to replace '/contact' if it's the standalone string or inside an expression linked to contact.

    // Replace standalone '/contact' string everywhere in pricing files since it's the only place it leads.
    modified = modified.replace(/'\/contact'/g, `'${mailtoLink}'`);
    modified = modified.replace(/"\/contact"/g, `"${mailtoLink}"`);

    if (modified !== content) {
        fs.writeFileSync(filePath, modified, 'utf8');
        console.log(`Updated: ${filePath}`);
    } else {
        console.log(`No change: ${filePath}`);
    }
}

// 1. Update main pricing
updatePricingPage(mainPricingPath);

// 2. Update all template pricing
const subdirs = fs.readdirSync(templatesDir);
for (const sub of subdirs) {
    const pricingPath = path.join(templatesDir, sub, 'pricing', 'page.tsx');
    updatePricingPage(pricingPath);
}

console.log('Done updating pricing pages.');
