
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelsSchema = new Schema({
  date: { type: Date, default: new Date(Date.now()) },
  topic: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false,
  },
  friends: {
    type: String,
    required: false,
  },
  media: {
    type: String,
    required: false,
  },
  poster_path: {
    type: String
  },
  public: {
    type: String,
    default: "false"
  },
  starred: {
    type: Number,
    default: 0
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  deleted: [{
    date: { type: Date, default: new Date(Date.now()) },
    status: {
      type: Boolean,
      default: false
    }
  }],
  messages: [{
    date: { type: Date, default: new Date(Date.now()) },
    starred: {
        type: Boolean,
        default: false
    },  
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    ref_channel: {
        type: Schema.Types.ObjectId,
        ref: "Channel"
    },
    sent_messages: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    }
  }],
  members: [{
    date: { type: Date, default: new Date(Date.now()) },
    admin: {
      type: Boolean,
      default: false
    },
    ref_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  }],
  media_ref: [{
    date: { type: Date, default: new Date(Date.now()) },
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

const Channel = mongoose.model("Channel", ChannelsSchema);

module.exports = Channel;
