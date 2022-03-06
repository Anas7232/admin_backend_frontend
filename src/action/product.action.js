import axios from "../helper/axios";
import { productConstants } from "./constants"


export const addproducts = (form) => {
    return async dispatch => {

        dispatch({ type: productConstants.POST_ALL_PRODUCTS_REQUEST });
        const res = await axios.post(`/product/create`, form);
        console.log(res);

        if(res.status === 200){
            dispatch({
                type: productConstants.POST_ALL_PRODUCTS_SUCCESS,
                payload: {
                    product: res.data.product
                }
            })
        }else{
            dispatch({
                type: productConstants.POST_ALL_PRODUCTS_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }

    }
}