const fs = require('fs');
const path = require('path');

// Gmail compose link - opens Gmail in new tab with pre-filled email
const to = 'digitalhubcontent@gmail.com';
const subject = encodeURIComponent('Custom Project Inquiry — PROTOCOL_ZERO');
const body = encodeURIComponent(
    'Hi,\n\n' +
    'I came across your PROTOCOL_ZERO CRM templates.\n\n' +
    'I am looking for a custom solution for my project. Here are some details:\n\n' +
    'Project Type: [CRM / SaaS Dashboard / Enterprise Software / Other]\n' +
    'Timeline: [Flexible / Within 1 month / Within 3 months]\n' +
    'Budget Range: [Open to discuss]\n\n' +
    'Brief Description:\n' +
    '[Please describe what you need built]\n\n' +
    'Best regards,\n' +
    '[Your Name]'
);

const gmailLink = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + subject + '&body=' + body;

// Collect all files that have mailto:digitalhubcontent
const allFiles = [];

// CrmLayout
allFiles.push(path.join(__dirname, 'src', 'components', 'crm-layout', 'CrmLayout.tsx'));
// Library
allFiles.push(path.join(__dirname, 'src', 'app', 'library', 'page.tsx'));
// Main pricing
allFiles.push(path.join(__dirname, 'src', 'app', 'pricing', 'page.tsx'));

// All template features pages
const td = path.join(__dirname, 'src', 'app', 'templates');
fs.readdirSync(td).forEach(sub => {
    const fp = path.join(td, sub, 'features', 'page.tsx');
    if (fs.existsSync(fp)) allFiles.push(fp);
});

let fixedCount = 0;

allFiles.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Replace any mailto:digitalhubcontent... URL with the Gmail compose link
    content = content.replace(/mailto:digitalhubcontent@gmail\.com[^"']*/g, gmailLink);

    // Also add target="_blank" for the gmail links (these are real URLs, not mailto)
    // Find href="https://mail.google.com..." without target="_blank" after it
    content = content.replace(
        /href="(https:\/\/mail\.google\.com[^"]*)"(?!\s*target)/g,
        'href="$1" target="_blank" rel="noopener noreferrer"'
    );

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed: ' + path.relative(__dirname, filePath));
        fixedCount++;
    } else {
        console.log('No change: ' + path.relative(__dirname, filePath));
    }
});

console.log('Done. Fixed ' + fixedCount + ' files with Gmail compose links.');
console.log('Gmail link preview: ' + gmailLink.substring(0, 120) + '...');
