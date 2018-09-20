export const state = () => ({
    connection_failure: false
});

export const mutations = {

    SET_CONNECTION_FAILURE( state, {active, error} ) {
        if(active) console.error( error );
        state.connection_failure = active;
    }
};

export const actions = {

    async nuxtServerInit( { dispatch, commit }, { req } ) {

        if(await dispatch( 'tasks/get_list' )) {
            commit( 'SET_CONNECTION_FAILURE', false );
        }
    }
};

export const getters = {

    get_connection_failure( state ) {
        return state.connection_failure;
    }
};
