/**
 * Generates minimal 1x1 PNG placeholders for assets referenced in loadAssets.js
 * when binary assets are not present in the repository.
 */
const fs = require('fs');
const path = require('path');

const PNG_1X1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

const root = path.join(__dirname, '..', 'app', 'assets');

const assetPaths = [
  'images/logo.png',
  'images/facebook.png',
  'images/google.png',
  'images/barcode.png',
  'images/visa.png',
  'images/favorite.png',
  'images/modal/ico_checked.png',
  'images/modal/ico_warning.png',
  'images/gps.png',
  'images/apple.png',
  'images/alert-circle.png',
  'images/circle-warning.png',
  'images/splash_screen.png',
  'images/launcher_icon.png',
  'icons/bag.png',
  'icons/email.png',
  'icons/alert.png',
  'icons/card.png',
  'icons/location.png',
  'icons/tends.png',
  'icons/parking.png',
  'icons/services.png',
  'icons/home.png',
  'icons/finance.png',
  'icons/shopping.png',
  'icons/profile.png',
  'icons/home_selected.png',
  'icons/finance_selected.png',
  'icons/shopping_selected.png',
  'icons/profile_selected.png',
  'icons/user_outlined.png',
  'icons/lock.png',
];

const expoRootAssets = [
  '../assets/images/logo.png',
  '../assets/images/splash-icon.png',
  '../assets/images/favicon.png',
  '../assets/images/android-icon-foreground.png',
  '../assets/images/android-icon-background.png',
  '../assets/images/android-icon-monochrome.png',
];

function writePng(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (fs.existsSync(fullPath)) return;
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, PNG_1X1);
  console.log('created', relativePath);
}

assetPaths.forEach(writePng);

const expoAssetsDir = path.join(__dirname, '..', 'assets', 'images');
fs.mkdirSync(expoAssetsDir, { recursive: true });
expoRootAssets.forEach((rel) => {
  const name = path.basename(rel);
  const fullPath = path.join(expoAssetsDir, name);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, PNG_1X1);
    console.log('created assets/images/', name);
  }
});

console.log('Placeholder assets ready.');
