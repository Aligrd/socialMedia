const express = require("express");
const fs = require("fs");
const path = require("path");

const jwt = require("jsonwebtoken");

const app = express();

const cors = require("cors");

app.use(express.json());

app.use(cors());

const PORT = 3001;

const db = require("./models");

//Routers
const { userRouter } = require("./routes/Users");
const commentRouter = require("./routes/Commetns");
const postRouter = require("./routes/Posts");
const likeRouter = require("./routes/Likes");

app.use("/users", userRouter);
app.use("/commnets", commentRouter);
app.use("/posts", postRouter);
app.use("/likes", likeRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
  });
});

//TODO Event ->Expriment

// const loggerEvent = new Event();

// const EventEmitter = require("events");

// const emitter = new EventEmitter();

// //Register a listner
// emitter.on("messageLogged", () => {
//   console.log("Listner for messegeLogged in called!");
// });

// emitter.emit("messageLogged");

//Application render

//! send a html file to specefic route and catch it in client end -- solved

// app.use(express.static(path.join(__dirname, "static_files")));

// let filePath = "D://code/full-stack-web/project-/server/static_files/page.html";
// try {
//   fs.readFile(filePath, "utf-8", (err, data) => {
//     console.log(data);
//   });
// } catch (err) {
//   console.log(err);
// }

// app.get("/page", (req, res) => {
//   res.sendFile(filePath);
// });
