const fs = require('fs');
const path = require('path');

const dir = '/Users/wave/AnsarAli/bilyx.github.io/public/policy/details';
const files = fs.readdirSync(dir).filter(f => f.endsWith('-details.html') && f !== 'battery-vitals-details.html'); 
// wait, the user's active doc is details-render.js. Let's fix ALL files.
const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('-details.html'));

for (const file of allFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix CSS
    content = content.replace(
        /body\.index-page \{ [\s\S]*?\.app-icon-large \{[^\}]+\}/m,
        `body.index-page { margin: 0; font-family: 'Inter', sans-serif;}
    .wrapper { max-width: 1000px; margin: 20px auto; padding: 20px;}
    .back-btn { color: var(--text-secondary); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: color 0.3s; margin-bottom: 20px;}
    .back-btn:hover { color: var(--app-accent); }
    
    .hero {
      display: flex; align-items: flex-start; gap: 24px; padding: 32px; margin-bottom: 24px;
      background: var(--surface-elevated, #fff); border: 1px solid var(--border-color, #e5e7eb); border-radius: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05); text-align: left;
    }
    .hero-content { flex: 1; }
    .hero h1 { font-family: 'Outfit', sans-serif; font-size: 2.2rem; font-weight: 800; margin: 0 0 10px; color: var(--heading-color); letter-spacing: -0.5px;}
    .hero p { font-size: 1.05rem; color: var(--text-secondary); max-width: 800px; margin: 0 0 24px; line-height: 1.5;}
    
    .btn-play {
      display: inline-flex; align-items: center; gap: 8px; background: var(--app-accent); color: #fff;
      padding: 12px 24px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 1rem;
      transition: all 0.2s ease; border: none;
    }
    .btn-play:hover { transform: translateY(-2px); box-shadow: 0 6px 16px var(--app-glow); color: #fff;}
    .app-icon-large { width: 90px; height: 90px; border-radius: 20px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); flex-shrink: 0;}`
    );

    // Fix HTML Structure for hero
    content = content.replace(
        /<div class="hero">\s*<img src="([^"]+)"[^>]*class="app-icon-large" alt="([^"]+)">\s*<h1>([^<]+)<\/h1>\s*<p>([^<]+)<\/p>\s*<a href="([^"]+)" class="btn-play">[\s\S]*?<\/a>\s*<\/div>/,
        `<div class="hero">
      <img src="$1" class="app-icon-large" alt="$2" onerror="this.style.display='none';">
      <div class="hero-content">
        <h1>$3</h1>
        <p>$4</p>
        <a href="$5" class="btn-play"><i class="bi bi-google-play"></i> Get on Google Play</a>
      </div>
    </div>`
    );

    // Adjust grid bento backgrounds for light mode compatibility
    content = content.replace(
        /\.bento-card \{\s*background: var\(--surface-color\);/g,
        `.bento-card { background: var(--surface-color, #f9fafb);`
    );

    // Some specific fixes for black text in Eye Shield theme
    content = content.replace(
      /color: #000;/g,
      `color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.4);`
    );

    fs.writeFileSync(filePath, content);
}

