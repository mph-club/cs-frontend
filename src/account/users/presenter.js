import Model from './model'

        /*
         * Call the functions from model to connect APIs
         */

        export default {

            getUsers: function (params) {
                Model.getUsers(params)
            },
            getUserDetail: function (params) {
                Model.getUserDetail(params)
            },

        }
