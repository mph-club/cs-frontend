import Cognito from '../../config/cognito'

export default {

  // SignUp Api Call to Aws cognito.  
  SignUp: function(params){
        var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
        
        var poolData = {
             UserPoolId : Cognito.COGNITOCONFIG.userPool, // Your user pool id here
             ClientId : Cognito.COGNITOCONFIG.clientId // Your client id here
        };
        
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        
        var attributeList = [];
        

        var dataEmail = {
            Name : 'email',
            Value : params.data.email
        };

        var dataName = {
            Name : 'name',
            Value : params.data.email
        };
        
        var dataPhoneNumber = {
            Name : 'phone_number',
            Value : params.data.phone
        };
        
        var dataRole = {
            Name : 'custom:role',
            Value : params.data.user_role,
        };
        
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
        var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
        var attributeRole = new AmazonCognitoIdentity.CognitoUserAttribute(dataRole);

        attributeList.push(attributeEmail);
        attributeList.push(attributeName);
        attributeList.push(attributePhoneNumber);
        attributeList.push(attributeRole);

        userPool.signUp(params.data.email, params.data.password, attributeList, null, function(err, result){
            if (err) {
                params.onfailed(err.message || JSON.stringify(err));
            }else{                
                var cognitoUser = result.user;
                params.onsuccess(cognitoUser);
            }
        }); 
  
  }
  
}
