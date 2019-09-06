
import { RECEIVED_MESSAGE, LOAD_USER, CLEAR_USER, CREATE_CHANNEL, LOAD_DASHBOARD } from "../../actions/dbActions/types";

const INITIAL_STATE = {
    Users: {},
    Chats: {},
    Channels: []
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOAD_USER:
            console.log(action.payload)
            let userData = action.payload
            return {...state, Users: userData};
        case CLEAR_USER:
            return {...state, Users: {}};
        case RECEIVED_MESSAGE:
            console.log(action.payload)
            let chatData = action.payload
            return {...state, Chats: chatData};
        case CREATE_CHANNEL:
            console.log(action.payload)
            let channelData = action.payload
            return {...state, Channels: channelData};
        case LOAD_DASHBOARD:
            console.log(action.payload)
            console.log("*************************")
            console.log(action.payload.Users)
            console.log(action.payload.Channels)
            let { Channels, Users } = action.payload
            return {...state, Channels: Channels, Users: Users};
        default:
            return state;
    }
}

