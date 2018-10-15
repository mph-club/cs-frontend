import UserAuthenticationModel from './storage.js'
const SessionReducer = (state = UserAuthenticationModel.GetCredential(),action) => {
    switch (action.type) {
        case "CreateUserSession":
            state = {
                ...state,
                email: null,
                token: action.payload.access_token,
                auth :true,
                name: null,
                alias:null,
                admin:null
            };
            
            UserAuthenticationModel.WriteCredential(state)
            break;
        case "RemoveUserSession":
            state = {
                ...state,
                email: null,
                token: null,
                auth :false,
                name: null,
                alias:null,
                admin:null
            };
          
            UserAuthenticationModel.RemoveCredential()
            break;
        default: 
            break;   
    }
    return state;
};

export default SessionReducer;
