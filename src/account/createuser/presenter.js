import Model from './model'

/*
 * Call the functions from model to connect APIs
 */

export default {
        
  //Signup user with cognito      
  
  SignUp:function(params){
  	  
    Model.SignUp(params)
  	  
  },

}
