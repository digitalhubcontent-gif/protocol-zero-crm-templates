const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'app', 'templates');
const subdirs = fs.readdirSync(templatesDir);

let fixedCount = 0;

for (const sub of subdirs) {
    const featuresPath = path.join(templatesDir, sub, 'features', 'page.tsx');
    if (!fs.existsSync(featuresPath)) continue;

    let content = fs.readFileSync(featuresPath, 'utf8');

    if (!content.includes('Custom Development Banner')) continue;

    // Replace the banner's <a> tag that has onMouseEnter/onMouseLeave with a plain <a> tag
    const oldAnchor = `<a href="mailto:digitalhubcontent@gmail.com?subject=Custom%20Project%20Inquiry" style={{ padding: '10px 20px', background: accent, color: '#fff', fontSize: '0.875rem', fontWeight: 600, borderRadius: 6, textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>`;
    const oldAnchor2 = `<a href="mailto:digitalhubcontent@gmail.com?subject=Custom%20Project%20Inquiry" style={{ padding: '10px 20px', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontSize: '0.875rem', fontWeight: 600, borderRadius: 6, textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>`;

    const newAnchor = `<a href="mailto:digitalhubcontent@gmail.com?subject=Custom%20Project%20Inquiry" style={{ padding: '10px 20px', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontSize: '0.875rem', fontWeight: 600, borderRadius: 6, textDecoration: 'none' }}>`;

    let modified = content;
    modified = modified.replace(oldAnchor, newAnchor);
    modified = modified.replace(oldAnchor2, newAnchor);

    if (modified !== content) {
        fs.writeFileSync(featuresPath, modified, 'utf8');
        console.log('Fixed: ' + sub);
        fixedCount++;
    } else {
        console.log('No match: ' + sub);
    }
}

console.log('Done. Fixed ' + fixedCount + ' files.');
