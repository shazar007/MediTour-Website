const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
      };

      webpackConfig.parallelism = 4;

      const jsRule = webpackConfig.module.rules.find((rule) => rule.oneOf);

      if (jsRule) {
        jsRule.oneOf = jsRule.oneOf.map((rule) => {
          if (
            rule.test &&
            rule.test.toString().includes("js") &&
            rule.use &&
            rule.use.loader &&
            rule.use.loader.includes("babel-loader")
          ) {
            return {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        useBuiltIns: "entry",
                        corejs: "core-js@3",
                      },
                    ],
                    "@babel/preset-react",
                  ],
                  plugins: [
                    [
                      "babel-plugin-styled-components",
                      {
                        pure: true,
                        displayName: true,
                      },
                    ],
                    "@babel/plugin-proposal-class-properties",
                    "@babel/plugin-syntax-dynamic-import",
                    "react-loadable/babel",
                    process.env.NODE_ENV === "development" &&
                      "react-refresh/babel",
                  ].filter(Boolean),
                },
              },
            };
          }
          return rule;
        });
      }

      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        alias: {
          ...(webpackConfig.resolve.alias || {}),
          "@": path.resolve(__dirname, "src"),
        },
      };

      if (process.env.NODE_ENV === "production") {
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          splitChunks: {
            chunks: "all",
            maxInitialRequests: 5,
            minSize: 30000,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  const match = module.context?.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                  );
                  if (match) {
                    return `vendor.${match[1]}`;
                  }
                  // Return a fallback name if no match is found
                  return "vendor.unknown";
                },
              },
            },
          },
        };
      }

      return webpackConfig;
    },
  },

  style: {
    postcss: {
      plugins: [
        require("autoprefixer"),
        ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : []),
      ],
    },
  },
};
