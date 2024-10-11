const getEnv = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is missing`);
  }

  return value;
};

const ENV = getEnv("ENV", "development");
const PORT = getEnv("PORT", "5000");
const APP_ORIGIN = getEnv("APP_ORIGIN", "http://localhost:3000");
const MONGODB_URI = getEnv("MONGODB_URI");
const SECRET_KEY = getEnv("SECRET_KEY");

module.exports = { ENV, PORT, APP_ORIGIN, MONGODB_URI, SECRET_KEY };
