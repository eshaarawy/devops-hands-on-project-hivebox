const { version } = require('../package.json');

const getVersion = async (req, res) => {
    res.json({ version });
  };

module.exports = getVersion;