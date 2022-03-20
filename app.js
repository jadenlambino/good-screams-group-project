const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const homeRouter = require("./routes/home");
const moviesRouter = require("./routes/movies");
const reviewsRouter = require("./routes/reviews");
const listsRouter = require("./routes/lists");
const { environment, sessionSecret } = require("./config");
const { restoreUser } = require("./auth");
const { csrfProtection, asyncHandler } = require("./routes/utils");
const cors = require("cors");
const app = express();

app.use(cors());
// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();
app.use(restoreUser);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/users", loginRouter);
app.use("/home", homeRouter);
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/mylists", listsRouter);

app.use((req, res, next) => {
  const err = new Error("The requested page couldn't be found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (environment === "production" || environment === "test") {
  } else {
    console.error(err);
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render("page-not-found", {
      title: "Page Not Found",
    });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.render("error", {
    title: "Server Error",
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
});

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('The requested page couldn\'t be found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function (err, req, res, next) {
// set locals, only providing error in development
// res.locals.message = err.message;
// res.locals.error = req.app.get("env") === "development" ? err : {};

// render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
