const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "./public/assets";
const outputFormat = ".webp";

function convertFolder(folder) {
  fs.readdirSync(folder).forEach(file => {
    const filePath = path.join(folder, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      convertFolder(filePath); // recurse
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      const newFilePath = filePath.replace(/\.(jpe?g|png)$/i, outputFormat);
      sharp(filePath)
        .webp({ quality: 80 })
        .toFile(newFilePath)
        .then(() => console.log(`✅ Converted: ${filePath}`))
        .catch(err => console.error(`❌ Error: ${filePath}`, err));
    }
  });
}

convertFolder(inputDir);
