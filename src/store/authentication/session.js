import UserAuthenticationModel from './storage.js'
const SessionReducer = (state = UserAuthenticationModel.GetCredential(),action) => {
    switch (action.type) {
        case "CreateUserSession":
            state = {
                ...state,
                email: action.payload.getIdToken().payload.email,
                token: action.payload.getAccessToken().getJwtToken(),
                refresh_token:action.payload.getRefreshToken().getToken(),
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
