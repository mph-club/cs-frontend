export default{
  
  /*
   * Prepare request with Payload to make API call to server.
   */      
 
  // Signup Call to cognito.  
  SignUp(onsuccess,onfailed,state,props,self){
      
   return {
       data : {
         email : state.email.value,
         phone : state.phone.value,
         password : state.password.value,
       },
       RunRedux : props.RunRedux,
       onfailed : onfailed,
       onsuccess : onsuccess,
       self:self,
    }
    
  },
  UserConfirm(onsuccess,onfailed,state,props,self){
      
   return {
       data : {
         confirmcode : state.confirmcode.value,
         email : state.email.value,
       },
       RunRedux : props.RunRedux,
       onfailed : onfailed,
       onsuccess : onsuccess,
       self:self,
    }
    
  },
  resendCode(onsuccess,onfailed,state,props,self){
      
   return {
       data : {
         email : state.email.value,
       },
       RunRedux : props.RunRedux,
       onfailed : onfailed,
       onsuccess : onsuccess,
       self:self,
    }
    
  },
  
}
