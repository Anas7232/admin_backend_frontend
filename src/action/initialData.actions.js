import axios from "../helper/axios";
import { categoryConstants, initialConstants, productConstants } from "./constants"


export const initialData = () => {
    return async dispatch => {

        dispatch({ type: initialConstants.INITIAL_DATA_REQUEST });
        const res = await axios.post(`/initialdata`);
        console.log(res);

        if(res.status === 200){
            const { products, categories } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    categories
                }
            })
            dispatch({
                type: productConstants.POST_ALL_PRODUCTS_SUCCESS,
                payload: {
                    products
                }
            })
        }

    }
}