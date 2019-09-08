
import { RECEIVED_MESSAGE, LOAD_USER, CLEAR_USER, CREATE_CHANNEL, LOAD_DASHBOARD, ACTIVATE_CHANNEL, UPDATE_PAGE, UPDATE_CHANNELS } from "../../actions/dbActions/types";

const INITIAL_STATE = {
    Users: {},
    Channels: [],
    ActiveChannel: {},
    Admin: {}
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOAD_USER:
            console.log(action.payload)
            let userData = action.payload
            return {...state, Users: userData};
        case CLEAR_USER:
            return {...state, Users: {}, Channels: [], ActiveChannel: {}, Admin: {}};
        case RECEIVED_MESSAGE:
            let { lastMessage } = action.payload
            console.log(lastMessage)
            return {...state, ActiveChannel: {...state.ActiveChannel,
                    messages: [...state.ActiveChannel.messages, lastMessage.messages]}
                };
        case UPDATE_CHANNELS:
            let channelUpdate = action.payload.lastMessage
            return {...state, Channels: state.Channels.filter(channel => 
                channel._id === channelUpdate.chatId
                ? [...state.Channels, [...channel.messages, channelUpdate.messages]] 
                : state.Channels)
                };
        case CREATE_CHANNEL:
            console.log(action.payload)
            let channelData = action.payload
            return {...state, Channels: [...state.Channels, channelData]};
        case LOAD_DASHBOARD:
            console.log(action.payload)
            console.log("*************************")
            console.log(action.payload.Users)
            console.log(action.payload.Channels)
            let { Channels, Users } = action.payload
            return {...state, Channels: Channels, Users: Users};
        case ACTIVATE_CHANNEL:
            console.log(action.payload)
            let selectedChannel = {...action.payload}
            console.log("*************************")
            return {...state, ActiveChannel: selectedChannel};
        case UPDATE_PAGE:
            console.log(action.payload)
            console.log("*************************")
            return {...state, Admin: {currentPath: action.payload}};
        default:
            return state;
    }
}


