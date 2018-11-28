import UserAuthenticationModel from './storage.js'
const SessionReducer = (state = UserAuthenticationModel.GetCredential(),action) => {
    switch (action.type) {
        case "CreateUserSession":
            state = {
                ...state,
                email: action.payload.getIdToken().payload.email,
                id_token:action.payload.idToken,
                token: action.payload.accessToken,
                refresh_token:action.payload.refreshToken,
                auth :true,
                name: action.payload.getIdToken().payload.email,
                alias:null,
                admin:null
            };
            
            UserAuthenticationModel.WriteCredential(state)
            break;
        case "RemoveUserSession":
            state = {
                ...state,
                email: null,
                id_token: null,
                token: null,
                refresh_token: null,
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
