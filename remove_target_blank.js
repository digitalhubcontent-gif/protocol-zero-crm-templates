const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, 'src', 'components', 'crm-layout', 'CrmLayout.tsx'),
    path.join(__dirname, 'src', 'app', 'library', 'page.tsx'),
    path.join(__dirname, 'src', 'app', 'pricing', 'page.tsx'),
];

const td = path.join(__dirname, 'src', 'app', 'templates');
fs.readdirSync(td).forEach(s => {
    const f = path.join(td, s, 'features', 'page.tsx');
    if (fs.existsSync(f)) files.push(f);
});

let n = 0;
files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let c = fs.readFileSync(f, 'utf8');
    const original = c;
    // Remove target="_blank" rel="noopener noreferrer" from mailto links
    c = c.replace(/ target="_blank" rel="noopener noreferrer"/g, '');
    if (c !== original) {
        fs.writeFileSync(f, c, 'utf8');
        n++;
        console.log('Fixed: ' + path.relative(__dirname, f));
    }
});

console.log('Removed target=_blank from ' + n + ' files');
