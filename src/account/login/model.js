import axios from 'axios';
import Server from '../../config/server.js'
import {CreateUserSessionProperties,RemoveUserSessionProperties} from '../../store/authentication/presenter.js'

/*
 * axios library used for calling rest api
 */ 

export default {

  // Authentication Api Call to server.  
  Auth: function(params){
    
    axios.post(Server.VEHICAL.API + 'users/checklogin/',params.data).then(function (response) {
      
      params.RunRedux(CreateUserSessionProperties(response.data)) //run redux method
      params.onsuccess(response)//direct to dashboard page
    
    }).catch((error) => {

    	params.onfailed(error);

    })    
  
  },
  
  // Logout Api Call to server.
  Logout: function(self){
  
    self.props.RunRedux(RemoveUserSessionProperties()) //run redux method
  
    localStorage.clear();
    window.location = "./";
  
  },
  
}
