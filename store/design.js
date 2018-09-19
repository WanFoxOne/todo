export const state = () => ({
    banner: {
        title: null,
        sub_title: null,
        transition: true
    }
});

export const mutations = {
    set_banner_content( state, content ) {
        state.banner = content;
    }
};
