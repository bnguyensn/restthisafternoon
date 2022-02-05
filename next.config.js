module.exports = {
  swcMinify: true,
  images: {
    deviceSizes: [640, 768, 1024, 1280],
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};
