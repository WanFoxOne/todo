import createPersistedState from 'vuex-persistedstate';

export default async ( { app, store } ) => {

    window.onNuxtReady( () => {
        createPersistedState( {
            key: 'eadar'
        } )( store );
    } );
}
