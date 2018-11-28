import fingerprint from 'fingerprintjs'
import jwt from 'jsonwebtoken';
export default{
  __SESSION_KEY__:'__props__',
  __BROWSER_UID__ : new fingerprint().get() ,
  CreateBrowserSession: function(cridential){
    return (jwt.sign({
        "id_token": cridential.id_token,
        "refresh_token": cridential.refresh_token,
        "token": cridential.token,
        "name": cridential.name,
        "auth": cridential.auth, // to check user is logged in or not
        "alias": cridential.alias,
        "email": cridential.email,
        "admin": cridential.admin // true/false to check admin or client login
    },this.__BROWSER_UID__.toString()))
  },
  VerifySession:function(cridential){
    try{
        return jwt.verify(cridential,this.__BROWSER_UID__.toString());
    }catch(e){
      return false
    }
  }
}
