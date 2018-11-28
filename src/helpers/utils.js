import Cognito from '../config/cognito';
import {CreateUserSessionProperties, RemoveUserSessionProperties} from '../store/authentication/presenter.js';

export default{

    CheckSession(state, props, self) {
        if (self.props.SessionReducer.auth) {
            try {
                let RunRedux = self.props.RunRedux;
                var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

                const idToken = new AmazonCognitoIdentity.CognitoIdToken({
                    IdToken: self.props.SessionReducer.id_token.jwtToken,
                });
                const accessToken = new AmazonCognitoIdentity.CognitoAccessToken({
                    AccessToken: self.props.SessionReducer.token.jwtToken,
                });
                const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
                    RefreshToken: self.props.SessionReducer.refresh_token.token,
                });

                let tokenData = {
                    IdToken: idToken,
                    RefreshToken: refreshToken,
                    AccessToken: accessToken
                };

                let session = new AmazonCognitoIdentity.CognitoUserSession(tokenData);

                var poolData = {
                    UserPoolId: Cognito.COGNITOCONFIG.userPool, // Your user pool id here
                    ClientId: Cognito.COGNITOCONFIG.clientId // Your client id here
                };

                var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

                var userData = {
                    Username: self.props.SessionReducer.email,
                    Pool: userPool
                };

                var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
                cognitoUser.signInUserSession = session;

                if (!session.isValid()) {
                    const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
                        RefreshToken: self.props.SessionReducer.refresh_token.token,
                    });
                    cognitoUser.refreshSession(refreshToken, function (error, result) {
                        RunRedux(CreateUserSessionProperties(result)) //run redux method
                    });
                }

                return true;

            } catch (err) {
                self.props.RunRedux(RemoveUserSessionProperties()) //run redux method
                localStorage.clear();
                return false;
            }
        } else {
            return false;
        }
    },
    RefreshSession(state, props, self) {
        if (self.props.SessionReducer.auth) {
            try {
                let RunRedux = self.props.RunRedux;
                var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

                var poolData = {
                    UserPoolId: Cognito.COGNITOCONFIG.userPool, // Your user pool id here
                    ClientId: Cognito.COGNITOCONFIG.clientId // Your client id here
                };

                var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

                var userData = {
                    Username: self.props.SessionReducer.email,
                    Pool: userPool
                };

                var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


                const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
                    RefreshToken: self.props.SessionReducer.refresh_token.token,
                });
                cognitoUser.refreshSession(refreshToken, function (error, result) {
                    RunRedux(CreateUserSessionProperties(result)) //run redux method
                });

                return true;

            } catch (err) {
                return false;
            }
        } else {
            return false;
        }
    }
}
