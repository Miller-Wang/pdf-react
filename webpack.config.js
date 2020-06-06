module.exports = (env) => {
  if (env && env.NODE_ENV === "production") {
    return require("./webpack.prod.js");
  } else {
    return require("./webpack.dev.js");
  }
};
