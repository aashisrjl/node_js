module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "nodejs",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
// production host railway
// module.exports = {
//   HOST: "monorail.proxy.rlwy.net",
//   USER: "root",
//   PASSWORD: "HduoMkbXQpzERDclZOVBKPljXfXqaQGw",
//   DB: "railway",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };