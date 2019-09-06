
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  date: { type: Date, default: new Date(Date.now()) },
  content: {
    type: String,
    required: false,
  },
  starred: {
    type: Number,
    default: 0
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  edited: [{
    date: { type: Date, default: new Date(Date.now()) },
    status: {
      type: Boolean,
      default: false
    }
  }],
  deleted: [{
    date: { type: Date, default: new Date(Date.now()) },
    status: {
      type: Boolean,
      default: false
    }
  }],
  channel: {
    admin: {
        type: Boolean,
        default: false
    },
    muted: {
        type: Boolean,
        default: false
    },
    public: {
      type: Boolean,
      default: false
    },
    ref_channel: {
        type: Schema.Types.ObjectId,
        ref: "Channel"
    }
  },
  media: [{
    current: {
      type: Boolean,
      default: false
    },
    ref_movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: false
    },
    ref_show: {
        type: Schema.Types.ObjectId,
        ref: "Show",
        required: false
    },
  }]
});

// some guesswork on how to validate authentication on db queries
// MessagesSchema.methods.verifyUser = async function(candidateToken, callback){
//   const user = this;
//   try {
//       // compare sender token to existing token
//       const isMatch = (candidateToken) => {
//         let loggedInUser = localStorage.getItem("token");
//         (candidateToken === loggedInUser) ? true : false;
//       }
//       isMatch(candidateToken);
//       // first parameter is error, second is response object (user or false)
//       callback(null, isMatch);
//   } catch(e) {
//       callback(e);
//   }
// }

const Message = mongoose.model("Message", MessagesSchema);

module.exports = Message;
