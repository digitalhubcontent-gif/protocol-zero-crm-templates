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

    // In crm-03, the am() function looks exactly like:
    // const am = (a: string) => `${accent}${a}`;
    // We want to replace it with a function that converts the hex opacity suffix to a decimal
    // and uses `rgba(var(--crm-accent-rgb), <opacity>)`. 
    // For example, '40' means 0.4 opacity. '05' means 0.05 opacity.
    // The old code appended '40' to '#f59e0b', making '#f59e0b40'.

    const replacement = `const am = (a: string) => \\\`rgba(var(--crm-accent-rgb), \\\${parseInt(a, 16) / 255})\\\`;`;

    // Since we are writing this in JS string, we need to be careful with template literal escaping.
    // Actually it's easier to just do:
    // const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;
    // We'll write this literally into the React files:
    const exactReplacement = "const am = (a: string) => `rgba(var(--crm-accent-rgb), ${parseInt(a, 16) / 255})`;";

    content = content.replace(/const am = \(a: string\) => `\$\{accent\}\$\{a\}`;/g, exactReplacement);

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated am() definition in', file);
        changedFiles++;
    }
});

console.log(`Done. Updated am() definition in ${changedFiles} files.`);
