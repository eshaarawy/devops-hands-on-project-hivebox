const { version } = require('./package.json');

const getVersion = () => {
  console.log(`Current version: ${version}`);
  return version;
}

module.exports = { getVersion };

// For direct CLI test
if (require.main === module) {
  getVersion();
}
