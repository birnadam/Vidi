
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");

const validateEmail = email => {
    return validator.isEmail(email);
}

const UserSchema = new Schema({
    date: { type: Date, default: new Date(Date.now()) },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: [
            validateEmail,
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 1, // change to 6 before production
        maxlength: 30,
    },
    username: {
        type: String,
        // unique: false,
        required: false,
        default: "username",
        trim: true,
        minlength: 1, // change to 3 before production
        maxlength: 30,
    },
    channels: [{
        type: Schema.Types.ObjectId,
        ref: "Channel"
    }],
    show_channels: [{
        date: { type: Date, default: new Date(Date.now()) },
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
        starred: {
            type: Boolean,
            default: false
        },        
        ref_show: {
            type: Schema.Types.ObjectId,
            ref: "Show"
        },
        active_channels: {
            type: Schema.Types.ObjectId,
            ref: "Channel"
        },
        poster_path: {
            type: String
        }
    }],
    movie_channels: [{
        date: { type: Date, default: new Date(Date.now()) },
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
        starred: {
            type: Boolean,
            default: false
        },        
        ref_movie: {
            type: Schema.Types.ObjectId,
            ref: "Movie"
        },
        active_channels: {
            type: Schema.Types.ObjectId,
            ref: "Channel"
        },
        poster_path: {
            type: String
        }
    }],
    inactive_channels: [{
        date: { type: Date, default: new Date(Date.now()) },
        admin: {
            type: Boolean,
            default: false
        },
        public: {
            type: Boolean,
            default: false
        },
        muted: {
            type: Boolean,
            default: false
        },
        starred: {
            type: Boolean,
            default: false
        },        
        removed_channels: {
            type: Schema.Types.ObjectId,
            ref: "Channel"
        }
    }],
    messages: [{
        date: { type: Date, default: new Date(Date.now()) },
        starred: {
            type: Boolean,
            default: false
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
    friends: [{
        date: { type: Date, default: new Date(Date.now()) },
        invite: {
            type: String,
            enum: ["sent", "received"],
            required: true,
            default: "sent"
        },
        comparison: {
            type: String,
            default: "various stats"
        },
        added_users: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    favorite_shows: [{
        date: { type: Date, default: new Date(Date.now()) },
        rating: {
            type: Schema.Types.ObjectId,
            ref: "Rating",
            required: false
        },
        added_show: {
            type: Schema.Types.ObjectId,
            ref: "Show"
        }
    }],
    favorite_movies: [{
        date: { type: Date, default: new Date(Date.now()) },
        rating: {
            type: Schema.Types.ObjectId,
            ref: "Rating",
            required: false
        },
        added_movie: {
            type: Schema.Types.ObjectId,
            ref: "Movie"
        }
    }]
});


UserSchema.pre("save", async function(next) {
    const user = this;
    try { 
        const salt = await bcrypt.genSalt();
        console.log("salt", salt);
        const hash = await bcrypt.hash(user.password, salt);
        console.log("hash", hash);
        user.password = hash;
        next();
    } catch(e) {
        return next(e);
    }
})

// methods attach to each instance of a document when queried 
UserSchema.methods.comparePassword = async function(candidatePassword, callback){
    const user = this;
    try {
        // compare entered password to existing password
        const isMatch = await bcrypt.compare(candidatePassword, user.password);
        // first parameter is error, second is response object (user or false)
        callback(null, isMatch);
    } catch(e) {
        callback(e);
    }
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
