const fs = require('fs');
const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

const newProxy = isDevelopment ? 'http://localhost:5000' : 'http://backend:5000';

if (packageJson.proxy !== newProxy) {
  packageJson.proxy = newProxy;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Updated proxy to ${newProxy}`);
} else {
  console.log(`Proxy is already set to ${newProxy}`);
}
