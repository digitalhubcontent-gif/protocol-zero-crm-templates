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

    // The am() function is used to create transparent backgrounds and borders like am('10')
    // We can't entirely get rid of it because it's used for backgrounds and borders.
    // HOWEVER, for TEXT, we should be using `var(--text-accent)` instead of `am('XX')`.

    // Let's replace ONLY `color: am(...)` with `color: 'var(--text-accent)'`
    // We tried this before: content = content.replace(/color:\s*am\(['"`]\d+['"`]\)/g, "color: 'var(--text-accent)'");
    // Let's look at the actual code in contact/page.tsx:
    // <p style={{ fontSize: '0.5rem', color: am('40'), letterSpacing: '0.12em', marginBottom: 12 }}>

    // Try a more robust regex that catches any `color: am(`
    content = content.replace(/color:\s*am\([^)]+\)/g, "color: 'var(--text-accent)'");

    // Also we need to make sure that the actual accent color for borders in light mode is visible.
    // Right now am() hardcodes `#f59e0b`.
    // Let's change the am() definition to be dynamic via CSS variables?
    // We can't easily do opacity on a hex CSS variable unless we use rgb.

    // Wait, let's just change the accent declaration in the files to ALSO be adaptive if possible? No, we can't because it's inline JS hex.
    // But we did add `--text-accent` globally.

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated color: am()', file);
        changedFiles++;
    }
});

console.log(`Done. Updated am() in ${changedFiles} files.`);
