
let config = {
  baseUrl: process.env.VUE_APP_BASE_API_URL,
  loginUrl: process.env.VUE_APP_LOGIN_URL,
  tokenKey: process.env.VUE_APP_TOKEN,
  dev: process.env.VUE_APP_DEV === 'true',
  firstLoginKey: 'FIRST_LOGIN:'
};

export default config;
