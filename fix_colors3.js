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
        } else if (file.endsWith('.tsx')) {
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

    // Replace color: accent
    content = content.replace(/color:\s*accent(?!\w)/g, "color: 'var(--text-accent)'");

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated', file);
        changedFiles++;
    }
});

console.log(`Done. Updated ${changedFiles} files with color: accent.`);
