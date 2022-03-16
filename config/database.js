const {
  db: { username, password, database, host },
} = require("./index");

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  production: {
    use_env_variable:
      "postgres://yjbrejcsbzhwix:07245e89b2001a2afc4300b20ecbe3a606b223052bb75188788a7ae20da632ce@ec2-3-216-221-31.compute-1.amazonaws.com:5432/d2rpik8q7g1am1",
    dialect: "postgres",
    seederStorage: "sequelize",
  },
};
