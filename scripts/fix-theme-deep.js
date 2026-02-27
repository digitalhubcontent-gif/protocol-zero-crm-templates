const fs = require('fs');
const path = require('path');

const templates = ['crm-04', 'crm-09', 'crm-10', 'crm-11', 'crm-12'];
const baseDir = path.join(__dirname, '..', 'src', 'app', 'templates');

const rules = [
    // ── BACKGROUNDS ──────────────────────────────────────────────
    // Remaining hex backgrounds (dark-only)
    { find: /background:\s*'#0[a-fA-F0-9]{5}'/g, replace: "background: 'var(--bg-primary)'" },
    { find: /background:\s*'#1[a-fA-F0-9]{5}'/g, replace: "background: 'var(--bg-card)'" },

    // Card-like rgba(255,255,255, 0.02-0.08) backgrounds → var(--bg-card)  
    { find: /background:\s*'rgba\(255,\s*255,\s*255,\s*0\.0[2-8]\)'/g, replace: "background: 'var(--bg-card)'" },

    // Subtle / overlay rgba backgrounds (0.02-0.04) → subtle card bg
    { find: /background:\s*'rgba\(255,\s*255,\s*255,\s*0\.0[1]\)'/g, replace: "background: 'var(--bg-secondary)'" },

    // Button-like rgba(255,255,255,0.06-0.12) → var(--bg-card)
    { find: /background:\s*'rgba\(255,\s*255,\s*255,\s*0\.1[0-5]?\)'/g, replace: "background: 'var(--bg-card-hover)'" },

    // ── const bg = '#...' top-level ──────────────────────────────
    { find: /const\s+bg\s*=\s*'#[0-9a-fA-F]{3,6}';/g, replace: "const bg = 'var(--bg-primary)';" },

    // ── const card with hardcoded background ─────────────────────
    { find: /background:\s*'#17171b'/g, replace: "background: 'var(--bg-card)'" },

    // ── TEXT COLORS ──────────────────────────────────────────────
    { find: /color:\s*'#f9fafb'/g, replace: "color: 'var(--text-primary)'" },
    { find: /color:\s*'#f8fafc'/g, replace: "color: 'var(--text-primary)'" },
    { find: /color:\s*'#f1f5f9'/g, replace: "color: 'var(--text-primary)'" },
    { find: /color:\s*'#ffffff'/gi, replace: "color: 'var(--text-primary)'" },
    { find: /color:\s*'#fff'/g, replace: "color: 'var(--text-primary)'" },
    { find: /color:\s*'#d1d5db'/g, replace: "color: 'var(--text-secondary)'" },
    { find: /color:\s*'#e5e7eb'/g, replace: "color: 'var(--text-secondary)'" },
    { find: /color:\s*'#e2e8f0'/g, replace: "color: 'var(--text-secondary)'" },
    { find: /color:\s*'#cbd5e1'/g, replace: "color: 'var(--text-secondary)'" },
    { find: /color:\s*'#9ca3af'/g, replace: "color: 'var(--text-muted)'" },
    { find: /color:\s*'#6b7280'/g, replace: "color: 'var(--text-muted)'" },
    { find: /color:\s*'#4b5563'/g, replace: "color: 'var(--text-muted)'" },
    { find: /color:\s*'#94a3b8'/g, replace: "color: 'var(--text-muted)'" },
    { find: /color:\s*'#64748b'/g, replace: "color: 'var(--text-muted)'" },

    // rgba(255,255,255,...) text colors
    { find: /color:\s*'rgba\(255,\s*255,\s*255,\s*0\.(?:5|[5-9]\d*)\)'/g, replace: "color: 'var(--text-secondary)'" },
    { find: /color:\s*'rgba\(255,\s*255,\s*255,\s*0\.[2-4]\d*\)'/g, replace: "color: 'var(--text-muted)'" },
    { find: /color:\s*'rgba\(255,\s*255,\s*255,\s*0\.1\d*\)'/g, replace: "color: 'var(--text-muted)'" },

    // ── BORDERS ──────────────────────────────────────────────────
    // rgba(255,255,255,0.0x) borders 
    { find: /border:\s*'1px solid rgba\(255,\s*255,\s*255,\s*0\.0[1-6]\)'/g, replace: "border: '1px solid var(--border-subtle)'" },
    { find: /borderBottom:\s*'1px solid rgba\(255,\s*255,\s*255,\s*0\.0[1-6]\)'/g, replace: "borderBottom: '1px solid var(--border-subtle)'" },
    { find: /borderTop:\s*'1px solid rgba\(255,\s*255,\s*255,\s*0\.0[1-6]\)'/g, replace: "borderTop: '1px solid var(--border-subtle)'" },
    { find: /borderLeft:\s*'1px solid rgba\(255,\s*255,\s*255,\s*0\.0[1-6]\)'/g, replace: "borderLeft: '1px solid var(--border-subtle)'" },
    { find: /borderRight:\s*'1px solid rgba\(255,\s*255,\s*255,\s*0\.0[1-6]\)'/g, replace: "borderRight: '1px solid var(--border-subtle)'" },
    // Higher-opacity borders
    { find: /border:\s*'1px solid rgba\(255,\s*255,\s*255,\s*0\.(?:0[7-9]|1[0-5]?)\)'/g, replace: "border: '1px solid var(--border-card)'" },
    { find: /borderBottom:\s*'1px solid rgba\(255,\s*255,\s*255,\s*0\.(?:0[7-9]|1[0-5]?)\)'/g, replace: "borderBottom: '1px solid var(--border-card)'" },
    { find: /borderTop:\s*'1px solid rgba\(255,\s*255,\s*255,\s*0\.(?:0[7-9]|1[0-5]?)\)'/g, replace: "borderTop: '1px solid var(--border-card)'" },
    { find: /borderLeft:\s*'1px solid rgba\(255,\s*255,\s*255,\s*0\.(?:0[7-9]|1[0-5]?)\)'/g, replace: "borderLeft: '1px solid var(--border-card)'" },
    { find: /borderRight:\s*'1px solid rgba\(255,\s*255,\s*255,\s*0\.(?:0[7-9]|1[0-5]?)\)'/g, replace: "borderRight: '1px solid var(--border-card)'" },

    // ── DIVIDERS / SEPARATORS ────────────────────────────────────
    // background: 'rgba(255,255,255,0.06)' used as small dividers → border-subtle color
    { find: /background:\s*'rgba\(255,\s*255,\s*255,\s*0\.06\)'/g, replace: "background: 'var(--border-subtle)'" },

    // ── EVENT HANDLER STYLE RESETS ───────────────────────────────
    // onMouseLeave resets like t.style.borderColor = 'rgba(255,255,255,0.04)'
    { find: /\.style\.borderColor\s*=\s*'rgba\(255,\s*255,\s*255,\s*0\.0[1-6]\)'/g, replace: ".style.borderColor = 'var(--border-subtle)'" },
    { find: /\.style\.borderColor\s*=\s*'rgba\(255,\s*255,\s*255,\s*0\.(?:0[7-9]|1[0-5]?)\)'/g, replace: ".style.borderColor = 'var(--border-card)'" },
    { find: /\.style\.background\s*=\s*'rgba\(255,\s*255,\s*255,\s*0\.0[1-8]\)'/g, replace: ".style.background = 'var(--bg-card)'" },
    { find: /\.style\.background\s*=\s*'rgba\(255,\s*255,\s*255,\s*0\.(?:0[9]|1[0-5]?)\)'/g, replace: ".style.background = 'var(--bg-card-hover)'" },

    // ── PROGRESS BAR TRACK BACKGROUNDS ───────────────────────────
    // Small rgba bg used for progress bars  
    { find: /background:\s*'rgba\(255,\s*255,\s*255,\s*0\.0[3-4]\)'/g, replace: "background: 'var(--border-subtle)'" },

    // ── STROKE on SVG ────────────────────────────────────────────
    { find: /stroke:\s*'rgba\(255,\s*255,\s*255,\s*0\.0[4-8]\)'/g, replace: "stroke: 'var(--border-subtle)'" },
    { find: /stroke:\s*'rgba\(255,\s*255,\s*255,\s*0\.(?:1[0-5]?|2\d*)\)'/g, replace: "stroke: 'var(--border-card)'" },

    // ── FILL on SVG ──────────────────────────────────────────────
    { find: /fill:\s*'rgba\(255,\s*255,\s*255,\s*0\.(?:2|3)\d*\)'/g, replace: "fill: 'var(--text-muted)'" },
    { find: /fill:\s*'rgba\(255,\s*255,\s*255,\s*0\.[4-9]\d*\)'/g, replace: "fill: 'var(--text-secondary)'" },
];

let totalUpdated = 0;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    for (const rule of rules) {
        content = content.replace(rule.find, rule.replace);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        const rel = path.relative(baseDir, filePath);
        console.log(`  Updated: ${rel}`);
        totalUpdated++;
    }
}

function processDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
            processDir(full);
        } else if (e.name === 'page.tsx') {
            processFile(full);
        }
    }
}

for (const tmpl of templates) {
    const tmplPath = path.join(baseDir, tmpl);
    if (fs.existsSync(tmplPath)) {
        console.log(`\nProcessing ${tmpl}...`);
        processDir(tmplPath);
    }
}

console.log(`\nDone! Updated ${totalUpdated} files.`);
