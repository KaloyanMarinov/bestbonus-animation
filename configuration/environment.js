/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  paths: {
    /* Path to source files directory */
    source: path.resolve(__dirname, '../resources/assets/'),

    /* Path to built files directory */
    output: path.resolve(__dirname, '../resources/dist/'),
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
  limits: {
    /* Image files size in bytes. Below this value the image file will be served as DataURL (inline base64). */
    images: 80192,

    /* Font files size in bytes. Below this value the font file will be served as DataURL (inline base64). */
    fonts: 10000,
  },
};
