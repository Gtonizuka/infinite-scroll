export const housesReducer = (state, action) => {
    if (state) {
        switch (action.type) {
            case 'ADD_HOUSES':
                return { ...state, houses: state.houses.concat(action.houses.houses) }
            case 'IS_LOADING':
                return { ...state, loading: action.loading }
            default:
                return state;
        }
    }
}

export const apiPageReducer = (state, action) => {
    switch (action.type) {
        case 'NEXT_PAGE':
            return { ...state, page: state.page + 1 }
        default:
            return state;
    }
}