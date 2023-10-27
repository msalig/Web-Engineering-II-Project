const config = require('./config/config');
const app = require("./config/express");
require('./config/mongoose')
/**
 * @openapi
 * /api/:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`);
});

module.exports = app;
