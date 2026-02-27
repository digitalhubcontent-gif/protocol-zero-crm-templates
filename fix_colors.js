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

const templatesDir = path.resolve(__dirname, 'src/app/templates/crm-02');
const files = walk(templatesDir);

let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace color: `${accent}40`, `${accent}50`, etc.
    content = content.replace(/color:\s*`\$\{accent\}\d{2}`/g, "color: 'var(--text-accent)'");

    // also replace color: accent with color: 'var(--text-accent)' in most text
    // we have to be careful not to replace border colors or backgrounds

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated', file);
        changedFiles++;
    }
});

console.log(`Done. Updated ${changedFiles} files.`);
