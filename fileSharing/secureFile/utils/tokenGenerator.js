const crypto = require("crypto");

function generateDownloadToken(fileId, userId) {
  return crypto.createHash("sha256").update(fileId + userId).digest("hex");
}