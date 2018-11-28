import Session from '../../credential/session.js'
export default {
  
  /*
   * Write session to storage 
   */   
  
  WriteCredential:function(data){
      localStorage.setItem(Session.__SESSION_KEY__,Session.CreateBrowserSession(data))
  },
  
  /*
   * Get the credentials from local storage
   */
  
  GetCredential:function(){
    var Credential = localStorage.getItem(Session.__SESSION_KEY__)
    if(Credential == null){
      return{
        email: null,
        id_token: null,
        token: null,
        refresh_token: null,
        auth :false,
        name: null,
        alias:null,
        admin: null
      }
    }else{
      Credential = Session.VerifySession(Credential);
      if(!Credential){
        this.RemoveCredential()
        return null
      }
    }
    return Credential
  },
  
  /*
   * Remove credentials from local storage when logout
   */
  
  RemoveCredential : function(){
    localStorage.removeItem(Session.__SESSION_KEY__);
  }
}
