export const actions =  {
    async nuxtServerInit ({ dispatch }, { req }) {
        await dispatch( 'todos/get_list' );
    }
};
