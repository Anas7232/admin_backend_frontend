import axios from "../helper/axios";
import { categoryConstants } from "./constants"


export const getAllCategories = () => {
    return async dispatch => {

        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
        const res = await axios.get(`/category/getcategory`);
        console.log(res);

        if(res.status === 201){
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    categories: categoryList
                }
            })
        }else{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }

    }
}

export const addCateory = (form) => {
    return async dispatch => {

        dispatch({ type: categoryConstants.POST_ALL_CATEGORY_REQUEST });
        const res = await axios.post(`/category/create`, form);

        if(res.status === 200){
            dispatch({
                type: categoryConstants.POST_ALL_CATEGORY_SUCCESS,
                payload: {
                    category: res.data.category
                }
            })
        }else{
            dispatch({
                type: categoryConstants.POST_ALL_CATEGORY_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }

    }
}

export const updateCategories = (form) => {
    return async dispatch => {

        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
        const res = await axios.post(`/category/update`, form)
        console.log(res);

        if(res.status === 201){
            console.log(res);
        }else{
            console.log(res);
        }

    }
}