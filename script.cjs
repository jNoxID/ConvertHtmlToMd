// convert-html-to-md.js
const fs = require("fs");
const path = require("path");
const TurndownService = require("turndown");

const turndownService = new TurndownService();

// Dossiers source et destination
const sourceDir = path.join(__dirname, "articles-html");
const targetDir = path.join(__dirname, "articles-md");

// Créer le dossier cible s'il n'existe pas
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// Lister tous les fichiers HTML
fs.readdirSync(sourceDir).forEach((file) => {
  if (path.extname(file) === ".html") {
    const filePath = path.join(sourceDir, file);
    const html = fs.readFileSync(filePath, "utf8");
    const markdown = turndownService.turndown(html);

    const targetPath = path.join(
      targetDir,
      file.replace(".html", ".md")
    );
    fs.writeFileSync(targetPath, markdown, "utf8");
    console.log(`✅ ${file} converti en Markdown`);
  }
});

console.log("🎉 Conversion terminée !");
