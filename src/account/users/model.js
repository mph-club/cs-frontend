import axios from 'axios';
import Server from '../../config/server.js';

export default {
    getUsers: function (params) {
        axios.defaults.headers.common['Authorization'] = params.data.token;
        axios.get(Server.VEHICAL.API + 'users?limit=' + params.data.limit + "&page=" + (params.data.page + 1)).then(function (response) {
            params.onsuccess(response);
        }).catch((error) => {
            params.onfailed(error);
        })

    },
    getUserDetail: function (params) {
        axios.defaults.headers.common['Authorization'] = params.data.token;
        axios.get(Server.VEHICAL.API + 'users/' + params.data.user_id).then(function (response) {
            params.onsuccess(response);
        }).catch((error) => {
            params.onfailed(error);
        })
    }

}