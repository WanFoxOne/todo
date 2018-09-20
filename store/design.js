export const state = () => ({
    banner: {
        title: null,
        sub_title: null,
        transition: true
    }
});

export const mutations = {

    SET_BANNER( state, content ) {
        state.banner = content;
    }
};

export const getters = {

    get_banner( state ) {
        return state.banner;
    }
};
