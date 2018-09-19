export const state = () => ({
    list: [
        {
            id: 'jm7yz8o4',
            title: 'Une tâche quelconque',
            date: '2018-12-05',
            completed: true
        },
        {
            id: 'jm7z1b5v',
            title: 'Une autre tâche quelconque',
            date: '2018-10-09',
            completed: false
        },
        {
            id: 'jm7z1g0v',
            title: 'Encore une autre tâche quelconque',
            date: '2018-11-09',
            completed: false
        },
        {
            id: 'jm7z1g5z',
            title: 'Toujours une autre tâche quelconque',
            date: '2018-11-12',
            completed: false
        },
        {
            id: 'jm7z1g5zf',
            title: 'FFFFe',
            date: '2018-07-12',
            completed: false
        }
    ]
});

export const mutations = {
    set_banner_content( state, content ) {
        state.banner = content;
    }
};

export const getters = {
    get_sorted_list( state ) {
        if ( !Array.isArray( state.list ) ) throw Error( 'Only array are allowed' );
        return state.list.concat().sort( function ( a, b ) {
            return Date.parse( a.date ) > Date.parse( b.date );
        } );
    }
};
