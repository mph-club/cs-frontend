export default{

    /*
     * Prepare request with Payload to make API call to server.
     */

    getUsers(onsuccess, onfailed, state, props, self) {
        return {
            data: {
                token: props.SessionReducer.token.jwtToken,
                limit: (state.item_per_page !== undefined) ? state.item_per_page : '',
                page: (state.page !== undefined) ? state.page : ''
            },
            RunRedux: props.RunRedux,
            onfailed: onfailed,
            onsuccess: onsuccess,
            self: self,
        }
    },
    getUserDetail(onsuccess, onfailed, state, props, self) {
        return {
            data: {
                token: props.SessionReducer.token.jwtToken,
                user_id: props.match.params.User
            },
            RunRedux: props.RunRedux,
            onfailed: onfailed,
            onsuccess: onsuccess,
            self: self,
        }

    }

}
