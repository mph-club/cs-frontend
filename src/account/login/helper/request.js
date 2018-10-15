export default{
  
  /*
   * Prepare request with Payload to make API call to server.
   */      
 
  // Authentication Api Call to server.  
  Auth(onsuccess,onfailed,state,props,self){
      
   return {
       data : {
         emailuser : state.email.value,
         password : state.password.value,
       },
       RunRedux : props.RunRedux,
       onfailed : onfailed,
       onsuccess : onsuccess,
       self:self,
    }
    
  },
}
