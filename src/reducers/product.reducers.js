import { productConstants } from "../action/constants";


const initState = {
    products: [],
    error: null,
    loading: false
};


export default (state = initState, action) => {
    switch(action.type){
        case productConstants.POST_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
    }
    return state;
}