module.exports = {
  images: {
    deviceSizes: [640, 768, 1024, 1280],
  },
  target: 'serverless',
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};
