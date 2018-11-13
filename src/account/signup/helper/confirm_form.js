import FormMessage from './confirm_message.js'
export default{
  
   /*
    * Validate the User Confirmation form
    * @returns {Boolean}
    */     
        
  ValidateForm: function(self){
     
     /*
     * Confirmation Code validation
     * Checks for empty input then for valid format.
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
    // eslint-disable-next-line
    if(self.state.confirmcode.value.trim() === ""){
      self.setState({
        confirmcode:{
          ...self.state.confirmcode,
          error : true,
          message : FormMessage.AUTHENTICATION.ERROR.CONFIRMCODE.EMPTY,
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
      confirmcode:{
        ...self.state.confirmcode,
        error:false,
        message:"",
      }
    })
  },
  
  
  ValidEmail(email) {
      
    /*
     * Regex validation for email address format 
    */
   
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
