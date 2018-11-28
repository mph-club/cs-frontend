export default {
  WriteCredential:function(data){
      localStorage.setItem('AuthenticationToken',JSON.stringify(data))
  },
  GetCredential:function(){
    var Credential = localStorage.getItem('AuthenticationToken')
    if(Credential == null){
      return{
        email: null,
        id_token: null,
        token: null,
        refresh_token: null,
        auth :true,
        name: null,
        alias:null,
        admin:null,
        props:{
            first_name:null,
            last_name:null,
            role:null,
        }
      }
    }
    return JSON.parse(Credential)
  },
  RemoveCredential : function(){
    localStorage.removeItem('AuthenticationToken');
  }
}
