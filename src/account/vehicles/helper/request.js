export default{

    /*
     * Prepare request with Payload to make API call to server.
     */

    getAll(onsuccess, onfailed, state, props, self) {
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
    getVehicleDetail(onsuccess, onfailed, state, props, self) {
        return {
            data: {
                token: props.SessionReducer.token.jwtToken,
                vehicle_id: props.match.params.Vehicle
            },
            RunRedux: props.RunRedux,
            onfailed: onfailed,
            onsuccess: onsuccess,
            self: self,
        }

    }

}
