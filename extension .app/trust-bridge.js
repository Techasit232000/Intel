const jwt = require("jsonwebtoken");
const fs = require("fs");

const HARMONY_PUBLIC_KEY = fs.readFileSync("./keys/harmony_public.pem");
const BB_PRIVATE_KEY = fs.readFileSync(process.env.BB_ISS_PRIVATE_KEY);

module.exports = function bridge(harmonyToken) {
  const decoded = jwt.verify(harmonyToken, HARMONY_PUBLIC_KEY, {
    algorithms: ["RS256"],
    issuer: "harmonyos-auth",
    audience: "trust-bridge"
  });

  return jwt.sign(
    { deviceId: decoded.deviceId, origin: "HarmonyOS", trust: "BRIDGED" },
    BB_PRIVATE_KEY,
    { algorithm: "RS256", expiresIn: "5m", issuer: "blackberry-iss" }
  );
};
