const { QuickDB } = require("quick.db");
const db = new QuickDB();

async function isUserJailed(userId) {
    let isJailed = await db.get(`jailed_${userId}`);
    return isJailed !== null;
}

module.exports = { isUserJailed };
