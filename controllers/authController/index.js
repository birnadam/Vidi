
const db     = require("../../models");
const jwt    = require("jwt-simple");
const config = require("../../config");

const tokenForUser = user => {
    const timestamp = new Date().getTime();
    // Sub === subject
    // Iat === issues at time
    // It's going to encode the whole 1st object and then add our secret to it
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

module.exports = {
    signUp: async (req, res) => {
        console.log("inside signup authcontroller")
        const { email, password } = req.body;
        if (!email || !password) return res.status(422).json({error: "You must provide an email and password"});
        
        try {
            const existingUser = await db.User.findOne({email});
            if (existingUser) return res.status(422).json({error: "Email is in use"});
            let newUserInfo = req.body.username ? { email, password, username: req.body.username } : { email, password }
            let user = await new db.User(newUserInfo);
            user.save();
            
            console.log(user)
            let userData = {};
            userData.id = user._id;
            userData.username = user.username;
            userData.show_channels = user.show_channels;
            userData.movie_channels = user.movie_channels;
            userData.inactive_channels = user.inactive_channels;
            userData.messages = user.messages;
            userData.friends = user.friends;
            userData.favorite_shows = user.favorite_shows;
            userData.favorite_movies = user.favorite_movies;
            console.log(userData)
            
            // res.json({token: tokenForUser(user)});
            res.json({userData: userData, token: tokenForUser(user)});

        } catch(e) {
            res.status(404).json({e});
        }
    },
    signIn: (req, res) => {
        console.log(req.user)

        let userData = {};
        userData.id = req.user._id;
        userData.username = req.user.username;
        userData.show_channels = req.user.show_channels;
        userData.movie_channels = req.user.movie_channels;
        userData.inactive_channels = req.user.inactive_channels;
        userData.messages = req.user.messages;
        userData.friends = req.user.friends;
        userData.favorite_shows = req.user.favorite_shows;
        userData.favorite_movies = req.user.favorite_movies;

        // res.json({token: tokenForUser(req.user)});
        res.json({userData: userData, token: tokenForUser(req.user)});
    }
}


