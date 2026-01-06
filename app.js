const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/auth.js");
const postsRouter = require("./routes/post.js");
const commentsRouter = require("./routes/comment.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/", indexRouter);
app.use("/auth", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

module.exports = app;
