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

    // Replace color: am('XX') with color: 'var(--text-accent)'
    content = content.replace(/color:\s*am\([\'\"]\d{2}[\'\"]\)/g, "color: 'var(--text-accent)'");

    // Replace color: am('XX') with color: 'var(--text-accent)' where it's not a direct property
    // Example: <span style={{ color: am('40') }}> -> <span style={{ color: 'var(--text-accent)' }}>
    content = content.replace(/color:\s*am\([\'\"]\d{2}[\'\"]/g, "color: 'var(--text-accent)'");

    // Replace border: `1px solid ${am('XX')}` with border: `1px solid var(--border-strong)` for thick borders
    // and `var(--border-subtle)` for thin borders
    // Actually, wait, am('XX') is just the accent color string.
    // We can't easily guess borders. The user specifically complained about visibility.
    // The am() function is: const am = (a: string) => `${accent}${a}`;
    // Let's replace am('...') in color properties specifically.

    // Some places might have `color: am('...')` in an object
    content = content.replace(/color:\s*am\((['"`])\d+(['"`])\)/g, "color: 'var(--text-accent)'");

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated', file);
        changedFiles++;
    }
});

console.log(`Done. Updated ${changedFiles} files with am() color function.`);
