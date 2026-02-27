const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'app', 'templates');
const subdirs = fs.readdirSync(templatesDir);

const subject = encodeURIComponent('Custom Project Inquiry — PROTOCOL_ZERO');
const body = encodeURIComponent(
    `Hi,

I came across your PROTOCOL_ZERO CRM templates and I'm impressed with the quality of your work.

I'm looking for a custom solution for my project. Here are some details:

Project Type: [CRM / SaaS Dashboard / Enterprise Software / Other]
Timeline: [Flexible / Within 1 month / Within 3 months]
Budget Range: [Open to discuss]

Brief Description:
[Please describe what you need built]

Looking forward to hearing from you.

Best regards,
[Your Name]`
);

const mailtoLink = 'mailto:digitalhubcontent@gmail.com?subject=' + subject + '&body=' + body;

let updatedCount = 0;

for (const sub of subdirs) {
    const pricingPath = path.join(templatesDir, sub, 'pricing', 'page.tsx');
    if (!fs.existsSync(pricingPath)) continue;

    let content = fs.readFileSync(pricingPath, 'utf8');

    if (!content.includes("Contact Sales") && !content.includes("contact")) {
        console.log('No Contact Sales: ' + sub);
        continue;
    }

    // Pattern: price that is 'Custom' or null indicates the enterprise tier.
    // Replace cta: 'Contact Sales' with cta: 'Contact Sales' and add href
    let modified = content;

    // Replace: cta: 'Contact Sales' -> cta: 'Contact Sales', href: 'mailto:...'
    modified = modified.replace(
        /cta:\s*'Contact Sales'/g,
        "cta: 'Contact Sales', href: '" + mailtoLink + "'"
    );

    // For templates that use {price ? ... : 'Contact Sales'} in the button text
    // We need to handle the button → anchor conversion differently for those
    // The pattern is: the button renders tier.cta or conditional text
    // We'll add a data-href prop approach instead — wrap the button click

    // Actually the simplest: just find cta: 'Start Comparing' patterns near price: null/undefined
    // and convert them too. But let's first see which templates this affects.

    if (modified !== content) {
        fs.writeFileSync(pricingPath, modified, 'utf8');
        console.log('Updated data: ' + sub);
        updatedCount++;
    } else {
        // Some templates don't use cta field for Contact Sales
        // They use inline conditional: {price ? 'Start Free Trial' : 'Contact Sales'}
        // For these, we need to add an onClick or convert the button

        // Find the pattern: {price ? '...' : 'Contact Sales'}
        // and add a conditional href approach
        if (content.includes("'Contact Sales'") || content.includes('"Contact Sales"')) {
            console.log('Has Contact Sales but different pattern: ' + sub);
        } else {
            console.log('No Contact Sales text: ' + sub);
        }
    }
}

console.log('Done. Updated ' + updatedCount + ' template pricing pages.');
