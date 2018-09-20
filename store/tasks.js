export const state = () => ({
    list: []
});

export const mutations = {

    SET_LIST( state, list ) {
        if ( !Array.isArray( list ) ) throw Error( 'Only array type are allowed' );
        state.list = list;
    },
    CREATE_TASK( state, task ) {
        state.list.push( task );
    },
    UPDATE_TASK( state, editedTask ) {
        state.list = state.list.map( task => {
            if ( task.id === editedTask.id ) task = editedTask;
            return task;
        } );
        /*state.list = [
            ...state.list.filter( task => task.id !== editedTask.id ),
            editedTask
        ];*/
    },
    DELETE_TASK( state, id ) {
        state.list = state.list.filter( task => task.id !== id );
    }
};

export const actions = {

    async get_list( { commit } ) {

        try {
            const response = await this.$axios.get( '/tasks' );
            commit( 'SET_LIST', response.data );
            return true;
        } catch ( error ) {
            commit( 'SET_CONNECTION_FAILURE', { active: true, error }, { root: true } );
            return false;
        }

    },
    async create_task( { commit, state }, task ) {

        try {
            const response = await this.$axios.post( '/tasks', task );
            commit( 'CREATE_TASK', response.data );
            return true;
        } catch ( error ) {
            commit( 'SET_CONNECTION_FAILURE', { active: true, error }, { root: true } );
            return false;
        }
    },
    async update_task( { commit, state }, editedTask ) {
        try {
            await this.$axios.put( `/tasks/${editedTask.id}`, editedTask );
            commit( 'UPDATE_TASK', editedTask );
            return true;
        } catch ( error ) {
            commit( 'SET_CONNECTION_FAILURE', { active: true, error }, { root: true } );
            return false;
        }
    },
    async delete_task( { commit, state }, id ) {
        try {
            await this.$axios.delete( `/tasks/${id}` );
            commit( 'DELETE_TASK', id );
            return true;
        } catch ( error ) {
            commit( 'SET_CONNECTION_FAILURE', { active: true, error }, { root: true } );
            return false;
        }
    }
};

export const getters = {

    get_task: state => id => {
        return state.list.find( task => task.id === id );
    },
    get_sorted_list( state ) {
        return state.list.concat().sort( function ( a, b ) {
            return Date.parse( a.date ) > Date.parse( b.date );
        } );
    }
};
