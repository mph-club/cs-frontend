import Model from './model'

/*
 * Call the functions from model to connect APIs
 */

export default {
        
  //Signup user with cognito      
  
  SignUp:function(params){
  	  
    Model.SignUp(params)
  	  
  },
  
  UserConfirm:function(params){
  	  
    Model.UserConfirm(params)
  	  
  },
  
  resendCode:function(params){
  	  
    Model.resendCode(params)
  	  
  },
  

}
