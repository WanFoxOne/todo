import createPersistedState from 'vuex-persistedstate';

function restoreState( store ) {
    if ( process.browser ) {
        if ( store ) {
            // Replace store state before calling plugins
            if ( window.__NUXT__ && window.__NUXT__.state ) {
                store.replaceState( window.__NUXT__.state );
                delete window.__NUXT__.state;
            }
        }
    }
}

export const plugins = [ restoreState, createPersistedState( { key: 'todo' } ) ];
