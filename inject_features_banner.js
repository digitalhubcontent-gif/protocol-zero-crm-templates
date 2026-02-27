const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'app', 'templates');
const subdirs = fs.readdirSync(templatesDir);

// Banner WITHOUT event handlers — safe for Server Components
const bannerCode = `
            {/* Custom Development Banner */}
            <div style={{ margin: '64px auto 0', maxWidth: 1200, padding: '32px 40px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Need a custom CRM or SaaS platform?</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Hire the creator of PROTOCOL_ZERO to build your custom software.</p>
                </div>
                <a href="mailto:digitalhubcontent@gmail.com?subject=Custom%20Project%20Inquiry" style={{ padding: '10px 20px', background: 'var(--text-primary)', color: 'var(--bg-primary)', fontSize: '0.875rem', fontWeight: 600, borderRadius: 6, textDecoration: 'none' }}>
                    Contact Developer →
                </a>
            </div>
`;

let updatedCount = 0;

for (const sub of subdirs) {
    const featuresPath = path.join(templatesDir, sub, 'features', 'page.tsx');
    if (!fs.existsSync(featuresPath)) continue;

    let content = fs.readFileSync(featuresPath, 'utf8');

    // Skip if already has the banner
    if (content.includes('Custom Development Banner')) {
        console.log('Skipping ' + sub + ' (already has banner)');
        continue;
    }

    // Insert before </CrmLayout>
    const pattern = /(<\/CrmLayout>)/;
    if (pattern.test(content)) {
        content = content.replace(pattern, bannerCode + '\n        $1');
        fs.writeFileSync(featuresPath, content, 'utf8');
        console.log('Injected: ' + sub);
        updatedCount++;
    } else {
        console.log('WARNING: No </CrmLayout> found in ' + sub);
    }
}

console.log('Done. Injected ' + updatedCount + ' files.');
