const fs = require('fs');
const path = require('path');

// Add target="_blank" to all mailto digitalhubcontent <a> tags that don't have it
const filesToFix = [];

// CrmLayout
filesToFix.push(path.join(__dirname, 'src', 'components', 'crm-layout', 'CrmLayout.tsx'));
// Library
filesToFix.push(path.join(__dirname, 'src', 'app', 'library', 'page.tsx'));

// All template features pages
const templatesDir = path.join(__dirname, 'src', 'app', 'templates');
const subdirs = fs.readdirSync(templatesDir);
for (const sub of subdirs) {
    const fp = path.join(templatesDir, sub, 'features', 'page.tsx');
    if (fs.existsSync(fp)) filesToFix.push(fp);
}

let fixedCount = 0;

for (const filePath of filesToFix) {
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');

    // Find: href="mailto:digitalhubcontent..." without target="_blank" right after
    // Replace with: href="mailto:digitalhubcontent..." target="_blank" rel="noopener noreferrer"
    const oldPattern = /href="(mailto:digitalhubcontent[^"]*)"(?!\s*target)/g;
    const newPattern = 'href="$1" target="_blank" rel="noopener noreferrer"';

    if (oldPattern.test(content)) {
        // Reset regex lastIndex
        content = content.replace(/href="(mailto:digitalhubcontent[^"]*)"(?!\s*target)/g, newPattern);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Added target _blank: ' + path.relative(__dirname, filePath));
        fixedCount++;
    } else {
        console.log('Already has target or no mailto: ' + path.relative(__dirname, filePath));
    }
}

console.log('Done. Added target to ' + fixedCount + ' files.');
