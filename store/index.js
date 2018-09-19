export const state = () => ({
    connection_failure: false
});

export const mutations = {
    SET_CONNECTION_FAILURE( state, boolean ) {
        state.connection_failure = boolean;
    }
};

export const actions = {
    async nuxtServerInit( { dispatch, commit }, { req } ) {

        if(await dispatch( 'todos/get_list' )) {
            commit( 'SET_CONNECTION_FAILURE', false );
        }
    }
};
