export const state = () => ({
    list: []
});

export const mutations = {
    /**
     * Set tasks list
     *
     * @param state
     * @param list Array
     */
    SET_LIST( state, list ) {
        if ( !Array.isArray( list ) ) throw Error( 'Only array type are allowed' );
        state.list = list;
    },
    CREATE_TASK( state, task ) {
        state.list.push( task );
    }
};

export const actions = {
    async get_task( { commit, state }, id ) {

        try {
            const response = await this.$axios.get( `/todos/${id}` );
            return response.data;
        } catch ( e ) {
            commit( 'SET_CONNECTION_FAILURE', true );
            console.error( e );
            return null;
        }

    },
    async get_list( { commit }, task ) {

        try {
            const response = await this.$axios.get( '/todos' );
            commit( 'SET_LIST', response.data );
            return true;
        } catch ( e ) {
            console.error( e );
            commit( 'SET_CONNECTION_FAILURE', true, { root: true } );
            return false;
        }

    },
    async create_task( { commit, state }, task ) {

        try {
            const response = await this.$axios.post( '/todos', task );
            commit( 'CREATE_TASK', response.data );
            return true;
        } catch ( e ) {
            console.error( e );
            commit( 'SET_CONNECTION_FAILURE', true, { root: true } );
            return false;
        }
    },
    async update_task( { commit, dispatch, state }, editedTask ) {
        try {
            const response = await this.$axios.put( `/todos/${editedTask.id}`, editedTask );
            dispatch( 'get_list' );
            return true;
        } catch ( e ) {
            console.error( e );
            commit( 'SET_CONNECTION_FAILURE', true, { root: true } );
            return false;
        }
    }
};

export const getters = {
    get_sorted_list( state ) {
        return state.list.concat().sort( function ( a, b ) {
            return Date.parse( a.date ) > Date.parse( b.date );
        } );
    }
};
