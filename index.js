const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const routes = require("./routes");
const dbController = require("./controllers/dbController")

// Database setup
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chatdb", {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}, (err, db) => {
  if (err) console.log(err);
});

// Middlewares setup
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// If we are in production, serve our clients build folder
// This folder is created during production only
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes, (req, res) => {
    // No matching route for URL Found
    res.status(404).json({
        error: '404: Resource not found.'
    })
})

// Socket.io listeners and emitters 
io.on('connection', function (socket) {

  socket.emit("connected", {socket: "connected"}, function (data) {
    console.log(data)
  })

  socket.on("connection", function (data, cb) {
    console.log("Server Socket is connected")
    cb(data)
    socket.on("disconnect", () => console.log("Client disconnected"))
  })


  socket.on("sendMessage", function (data) {
    console.log("sendMessage got hit on the server", data);
    dbController.sendMessage(data, lastMessage => {
      console.log("Back to socket on server")
      console.log(lastMessage)
      socket.emit("messageResponse", {lastMessage})
    })
  });

  socket.on("createChannel", async (data) => {
    console.log("createChannel got hit on the server", data);
    dbController.createChannel(data, response => {
      console.log("Back to socket on server")
      console.log(response)
      socket.emit("channelResponse", response)
    })
  })
  
  socket.on("loadDashboard", async (data, cb) => {
    console.log("loadDashboard got hit on the server", data);
    dbController.loadDashboard(data, response => {
      console.log("Back to socket on server")
      console.log(response)
      cb(response)
    })
  })

});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))