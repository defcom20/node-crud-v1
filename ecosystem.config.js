module.exports = {
  apps: [{
    name: "app1",
    script: "./app.js",
    watch: true,
    env: {
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV
    },
    env_production: {
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV
    }
  }]
}
