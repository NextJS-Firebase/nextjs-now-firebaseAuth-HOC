// const withSass = require('@zeit/next-sass');

// module.exports = withSass();

require("dotenv").config()

const path = require("path")

const Dotenv = require("dotenv-webpack")

module.exports = {
  target: "serverless",
  webpack: (config) => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      }),
    ]

    return config
  },
}
