const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const templatesDir = path.resolve(__dirname, 'src/app/templates/crm-03');
const files = walk(templatesDir);

let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace ANY color: am('XX') or color: am("XX") with color: 'var(--text-accent)'
    content = content.replace(/color:\s*am\(['"`]\d+['"`]\)/g, "color: 'var(--text-accent)'");

    // Notice that in Contact page: <p style={{ fontSize: '0.4rem', color: am('35'), ... }}>
    // Which matches the regex above!

    // Also replace `color: am('50')` and similar where they are used in text like <p> and <span>

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated color: am() in', file);
        changedFiles++;
    }
});

console.log(`Done. Updated color: am() in ${changedFiles} files.`);
