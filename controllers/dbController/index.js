
const db = require("../../models");

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

const sendMessage = async (data, callback) => {
  console.log("Inside the controller sendMessage")
  console.log(data)

  let { content, chatId, userId, adminId } = data

  let newMessage = await db.Message.create({ 
    sender: userId,
    content: content,
    channel: {
      ref_channel: chatId,
      admin: (adminId === userId) ? true : false
    }}
  )

  let chatData = await db.Channel.findOneAndUpdate({_id: chatId},
      {$push: {messages: {
        sent_messages: newMessage._id,
        ref_channel: chatId,
        sender: userId
      }}}, {new: true})
      .populate("messages.sender", "username")
      .populate("messages.sent_messages")

  let updatedUser = await db.User.findByIdAndUpdate(userId, 
          {$push: {messages: {
            sent_messages: newMessage.id,
            ref_channel: chatId
          }}}, {new: true})

  console.log("updatedUser")
  console.log(updatedUser)

  if (!isEmpty(chatData)) {
    let lastMessage = {chatId: chatData._id, messages: chatData.messages.pop()}
    console.log("lastMessage")
    console.log(lastMessage)
    callback(lastMessage)
  }
}

const createChannel = async (data, callback) => {
  console.log("I'm inside the controller createChannel")
  console.log(data)
  let { userId } = data

  return new Promise( async (resolve, reject) => {
    let newChannel;
    let updatedUser;
    let channelResponse;

    try {
      let createChannel = await new db.Channel(data)
      await createChannel.save()
      newChannel = await db.Channel.findOneAndUpdate({_id: createChannel._id}, 
        {$push: {admin: userId}}, {new: true})
    } catch (e) {
      console.log("Oooops", e)
    }

    try {
      updatedUser = await db.User.findByIdAndUpdate(userId, 
        {$push: {channels: newChannel.id}}, {new: true}).populate("Channel")
    } catch (e) {
      console.log("Oooops", e)
    }
    
    try {
      channelResponse = await db.Channel.findById(newChannel.id)
    } catch (e) {
      console.log("Oooops", e)
    }
    
    if (channelResponse && updatedUser) {
      let channelData = {Channels: channelResponse, Users: updatedUser};
      console.log("channelData")
      console.log(channelData)
      resolve();
      callback(channelData)
    }
  })
}

const loadDashboard = async (data, callback) => {
  console.log("I'm inside the controller loadDashboard")
  let userId = data
  console.log(userId)

  return new Promise( async (resolve, reject) => {
    let userData;
    let channelData;
    
    try {
      userData = await db.User.findById(userId, 
        "_id username channels show_channels movie_channels inactive_channels messages friends favorite_shows favorite_movies")
        .populate("Channel")
    } catch (e) {
      console.log("Oooops", e)
    }

    try {
      channelData = await db.Channel.find({_id: userData.channels})
        .populate("messages.sent_messages")
        .populate("messages.sender")
        .populate("messages.ref_channel")
    } catch (e) {
      console.log("Oooops", e)
    }
    
    if (userData && channelData) {
      let dashboardData = {Users: userData, Channels: channelData};
      console.log("dashboardData")
      console.log(dashboardData)
      resolve();
      callback(dashboardData)
    } else {reject()}
  })
}

module.exports = { createChannel, sendMessage, loadDashboard };



// const db     = require("../../models");
// const config = require("../../config");
// const Messages = require("../../models/messagesModel")

// //USER FUNCTIONS
// const signUp = async (req, res) => {}
// const signIn = async (req, res) => {}
// const Logout = async (req, res) => {}
// const saveShow = async (req, res) => {}
// const saveMovie = async (req, res) => {}

// // CHANNEL FUNCTIONS
// const addChannel = async (req, res) => {} //create channel
// const inviteToChannel = async (req, res) => {}
// const receiveInvite = async (req, res) => {}

// // MESSAGE FUNCTIONS
// const sendMessage = async (req, res) => {
//   //when send message, all other users but you must get message
//   //message must be stored in message database, grabbing user info
//   console.log(req.body);
//   let {user, channel, content} = req.body;
//   console.log("i'm hit")
//   let newMessage = {};
//     newMessage.user = user;
//     newMessage.channel = channel;
//     newMessage.content = content;
//   let resp = await Messages.create(newMessage);
//     try {
//       console.log(resp +" added"); 
//     } catch (error) {
//       console.log(error)
//     } 
//   }
//   const addShows = async (req, res) => {
//     console.log(req.body);
//     let {showId, name, next_episode_to_air, episode_number, overview, season_number} = req.body;
//     let newShow = {};
//         newShow.showId = showId;
//         newShow.name = name;
//         newShow.next_episode_to_air = next_episode_to_air;
//         newShow.episode_number = episode_number;
//         newShow.overview = overview;
//         newShow.season_number = season_number;
//     let resp = await Shows.create(newShow);
//         try {
//             console.log(resp +"added");
//         } catch (error) {
//             console.log(error)
//         }
//     }
    
// const addMovies = async (req, res) => {
//     console.log(req.body);
//     let{movieId, title, poster_path, release_date, vote_average, overview, runtime, revenue} = req.body;
//     let newMovie = {};
//         newMovie.movieId = movieId;
//         newMovie.title = title;
//         newMovie.poster_path = poster_path;
//         newMovie.release_date = release_date;
//         newMovie.vote_average = vote_average;
//         newMovie.overview = overview;
//         newMovie.runtime = runtime;
//         newMovie.revenue = revenue;
//     let resp = await Movies.create(newMovie);
//         try {
//             console.log(resp +"added");
//         } catch (error) {
//             console.log(error)
//         }
//     }
// console.log("hi")
// module.exports = {addMovies, addShows, sendMessage}
//   // let newNote = await Note.create(note);
//   //          let articleWithNote = await Article.findByIdAndUpdate(_id, {$push: {note: newNote._id}}, {new: true})


  // let newNote = await Note.create(note);
  //          let articleWithNote = await Article.findByIdAndUpdate(_id, {$push: {note: newNote._id}}, {new: true})


// // a user can:
// // - sign up
// // - login
// // - logout
// // - create channels
// // - view one chat (channel) at a time ??
// // - be invited to a channel
// // - invite others to any channel they are active(?) 
// // - write messages
// // - search a list of movies and show  
// // - can save a show or movie as a favorites
// // - can create a channel based on search results 
// // - write a review
// //   - no reviews no spoilers
// // - rate an episode when you mark watched 
// // - mute channel?
// // - unmute channel?
// // - leave a chat and see old history in archive