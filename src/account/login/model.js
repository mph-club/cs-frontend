import {CreateUserSessionProperties,RemoveUserSessionProperties} from '../../store/authentication/presenter.js'
import Cognito from '../../config/cognito'

export default {

  // Authentication Api Call to server.  
  Auth: function(params){
    var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
        
        var authenticationData = {
           Username : params.data.emailuser,
           Password :  params.data.password,
        };
        
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        
        var poolData = {
             UserPoolId : Cognito.COGNITOCONFIG.userPool, // Your user pool id here
             ClientId : Cognito.COGNITOCONFIG.clientId // Your client id here
        };
        
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        
        var userData = {
             Username : params.data.emailuser,
             Pool : userPool
        };
        
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        
        cognitoUser.authenticateUser(authenticationDetails, {
           onSuccess: function (result) {
               params.RunRedux(CreateUserSessionProperties(result)) //run redux method
               params.onsuccess(result)//direct to dashboard page
           },

           onFailure: function(error) {
               params.onfailed(error);               
           },
        });  
  
  },
  
  // Logout Api Call to server.
  Logout: function(self){
  
    self.props.RunRedux(RemoveUserSessionProperties()) //run redux method
  
    localStorage.clear();
    window.location = "./";
  
  },
  
}
