const fs = require('fs');
const path = require('path');

const templates = ['crm-04', 'crm-09', 'crm-10', 'crm-11', 'crm-12'];
// Fix path: __dirname is "scripts" dir.
const baseDir = path.join(__dirname, '../src/app/templates');

// Safe replacements based on generic assumptions for Dark backgrounds.
const replaceRules = [
    // Backgrounds
    { regex: /background:\s*'(#000000|#000|#020405|#050508|#0a0a0b|#0a0a0a|#070709)'/gi, replace: "background: 'var(--bg-primary)'" },
    { regex: /background:\s*'(#0f0f11|#111111|#111|#071019|#131316|#111113|#0d1825|#17171b|#1c1c21|#191919|#1a1a1e|#16161a)'/gi, replace: "background: 'var(--bg-card)'" },
    { regex: /background:\s*'(#16161a|#1a1a1e|#0d1825|#17171b|#1c1c21|#191919)'/gi, replace: "background: 'var(--bg-card)'" },
    { regex: /background:\s*'(#242429)'/gi, replace: "background: 'var(--bg-card-hover)'" },

    // Text colors
    { regex: /color:\s*'(#ffffff|#fff|#f9fafb|#f8fafc|#f1f5f9)'/gi, replace: "color: 'var(--text-primary)'" },
    { regex: /color:\s*'(#d1d5db|#e2e8f0|#e5e7eb|#cbd5e1)'/gi, replace: "color: 'var(--text-secondary)'" },
    { regex: /color:\s*'(#9ca3af|#6b7280|#4b5563|#94a3b8|#64748b|#8a8a8a)'/gi, replace: "color: 'var(--text-muted)'" },

    // Borders
    { regex: /border:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.0[456]\)'/gi, replace: "border: '1px solid var(--border-subtle)'" },
    { regex: /borderBottom:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.0[456]\)'/gi, replace: "borderBottom: '1px solid var(--border-subtle)'" },
    { regex: /borderTop:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.0[456]\)'/gi, replace: "borderTop: '1px solid var(--border-subtle)'" },
    { regex: /borderLeft:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.0[456]\)'/gi, replace: "borderLeft: '1px solid var(--border-subtle)'" },
    { regex: /borderRight:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.0[456]\)'/gi, replace: "borderRight: '1px solid var(--border-subtle)'" },

    { regex: /border:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.0[789]\)'/gi, replace: "border: '1px solid var(--border-card)'" },
    { regex: /borderBottom:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.0[789]\)'/gi, replace: "borderBottom: '1px solid var(--border-card)'" },
    { regex: /borderTop:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.0[789]\)'/gi, replace: "borderTop: '1px solid var(--border-card)'" },

    { regex: /border:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.1[0-5]?\)'/gi, replace: "border: '1px solid var(--border-card)'" },
    { regex: /borderBottom:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.1[0-5]?\)'/gi, replace: "borderBottom: '1px solid var(--border-card)'" },
    { regex: /borderTop:\s*'1px solid rgba\(255,(\s*)255,(\s*)255,(\s*)0\.1[0-5]?\)'/gi, replace: "borderTop: '1px solid var(--border-card)'" },
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (stat.isFile() && file.endsWith('.tsx') && !file.includes('layout.tsx') && !file.includes('data.ts') && !file.includes('page.tsx.bak')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;

            // Make a backup just in case
            fs.writeFileSync(fullPath + '.bak', content, 'utf8');

            // Manual constants replacement at the top of the file
            content = content.replace(/const\s+bg\s*=\s*['"]#[0-9a-fA-F]{3,6}['"];/g, "const bg = 'var(--bg-primary)';");
            content = content.replace(/const\s+card\s*:\s*React\.CSSProperties\s*=\s*{\s*background:\s*['"]#[0-9a-fA-F]{3,6}['"]/g, "const card: React.CSSProperties = { background: 'var(--bg-card)'");

            for (const rule of replaceRules) {
                content = content.replace(rule.regex, rule.replace);
            }

            // Also clean up edge cases where background: '#0a0a0a' is used arbitrarily in objects
            content = content.replace(/background:\s*['"]#0[a-fA-F0-9]{5}['"]/g, "background: 'var(--bg-primary)'");
            content = content.replace(/background:\s*['"]#1[a-fA-F0-9]{5}['"]/g, "background: 'var(--bg-card)'");


            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath.replace(baseDir, '')}`);
            }
        }
    }
}

for (const tmpl of templates) {
    const tmplPath = path.join(baseDir, tmpl);
    if (fs.existsSync(tmplPath)) {
        processDirectory(tmplPath);
    } else {
        console.log("NOT FOUND:", tmplPath);
    }
}
console.log('Done replacing colors.');
