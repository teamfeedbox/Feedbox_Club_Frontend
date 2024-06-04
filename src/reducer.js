export const initialState = {
    currentUser: null,
    colleges: null,
    allPosts: null,
    allEventsData: null,
    comments: null
}

function reducer(state, action) {
    switch (action.type) {
        case 'INIT_USER':
            if (!initialState.currentUser == null) { return state }
            console.log("user initialized");
            return { ...state, currentUser: action.item };

        case 'INIT_CLG_ARR':
            if (!initialState.colleges == null) { return state }
            console.log('college array initialised');
            return { ...state, colleges: action.item };

        case 'INIT_ALL_EVENT':
            if (!initialState.allEventsData == null) { return state }
            console.log('event array initialised');
            return { ...state, allEventsData: action.item };

        case 'INIT_ALL_POST':
            if (!initialState.allPosts == null) { return state; }
            console.log('all post initialised');
            return { ...state, allPosts: action.item };

        case 'INIT_ALL_USERS':
            if (!initialState.allUsers == null) { return state; }
            console.log('all users initialised');
            return { ...state, allUsers: action.item };

        case 'ADD_USER':
            // console.log("adding user reducer");
            return { state };

        case 'REMOVE_USER':
            // console.log("removing user reducer");
            return { state };

        default:
            return state;
    }
}

export default reducer;