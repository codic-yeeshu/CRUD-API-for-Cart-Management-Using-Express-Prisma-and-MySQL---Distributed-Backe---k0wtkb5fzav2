const API_AUTH_KEY = "8a60348b-d4a4-564a-9b45-aab518adb7f4";

const authenticate = (req, res, next) => {
  const apiAuthKey = req.headers["apiauthkey"];
  try {
    if (!apiAuthKey)
      return res.status(403).json({
        error: "apiauthkey is missing or invalid",
      });

    if (!(apiAuthKey === API_AUTH_KEY))
      return res.status(403).json({
        error: "Failed to authenticate apiauthkey",
      });
    next();
  } catch (err) {
    console.log("error in middleware");
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authenticate;
