import Model from './model'

/*
 * Call the functions from model to connect APIs
 */

export default {
  //Validate user credentials to backend      
  Auth:function(params){
  	  
    Model.Auth(params)
  	  
  },
  //Logout user 
  Logout:function(params){
      
      Model.Logout(params)
      
  },
  // Get logged User details
  ClientDetails:function(params){
      
      Model.ClientDetails(params)
      
  }
}
