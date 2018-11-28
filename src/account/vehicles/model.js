import axios from 'axios';
import Server from '../../config/server.js';

export default {

    getAll: function (params) {
        axios.defaults.headers.common['Authorization'] = params.data.token;
        axios.get(Server.VEHICAL.API + 'vehicles?limit=' + params.data.limit + "&page=" + (params.data.page + 1)).then(function (response) {
            params.onsuccess(response);
        }).catch((error) => {
            params.onfailed(error);
        })

    },
    getVehicleDetail: function (params) {
        axios.defaults.headers.common['Authorization'] = params.data.token;
        axios.get(Server.VEHICAL.API + 'vehicles/' + params.data.vehicle_id).then(function (response) {
            params.onsuccess(response);
        }).catch((error) => {
            params.onfailed(error);
        })

    }
}