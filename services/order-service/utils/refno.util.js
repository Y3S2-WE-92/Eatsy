const crypto = require("crypto");

const generateRefNo = () => {
  // Use current time + random bytes for uniqueness, and encode in base36 for compactness
  const timestamp = Date.now().toString(36).toUpperCase(); // Shorter than full timestamp
  const random = crypto.randomBytes(2).toString("hex").toUpperCase(); // 4 random hex chars

  return `REF${timestamp}${random}`.slice(0, 10); // Keep total length reasonable
};

module.exports = generateRefNo;
