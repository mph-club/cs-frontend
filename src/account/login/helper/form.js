import FormMessage from './message.js'
export default{
  
   /*
    * Validate the login form
    * @returns {Boolean}
    */     
        
  ValidateForm: function(self){
     
     /*
     * Email validation
     * First checks for empty input then for valid format.
     */
    
    var valid = true
    // eslint-disable-next-line
    if(self.state.email.value.trim() === ""){
      self.setState({
        email:{
          ...self.state.email,
          error : true,
          message : FormMessage.AUTHENTICATION.ERROR.EMAIL.EMPTY,
        }
      })
      valid = false
    } else if(!this.ValidEmail(self.state.email.value.trim())){
      self.setState({
        email:{
          ...self.state.email,
          error : true,
          message : FormMessage.AUTHENTICATION.ERROR.EMAIL.INVALID,
        }
      })
      valid = false
    }
    
    /*
     * Password Validation
     * Checks for empty input only!
     */    
    
    if(self.state.password.value.trim() === ""){
      self.setState({
        password:{
          ...self.state.password,
          error : true,
          message : FormMessage.AUTHENTICATION.ERROR.PASSWORD.EMPTY,
        }
      })
      valid = false
    }

    return valid
  },
  
  /*
   * Clean the validation errors
   */
  
  CleanError : function(self){
    self.setState({
      email:{
        ...self.state.email,
        error:false,
        message:"",
      },
      password:{
        ...self.state.password,
        error:false,
        message:"",
      },

    })
  },
  

   /*
   * Check for email address format.
   */
  
  ValidEmail(email) {
      
    /*
     * Regex validation for email address format 
    */
   
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
}
