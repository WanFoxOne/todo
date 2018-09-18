export const state = () => ({
    list: [
        {
            id: '1',
            title: 'Une tâche quelconque',
            date: '2018-10-05',
            completed: true
        },
        {
            id: '2',
            title: 'Une autre tâche quelconque',
            date: '2018-10-09',
            completed: false
        }
    ]
});

export const mutations = {
    set_banner_content( state, content ) {
        state.banner = content;
    }
};
