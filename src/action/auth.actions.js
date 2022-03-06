import axios  from "../helper/axios";
import { authConstants } from "./constants"


export const login = (user) => {
    console.log(user)
    return async dispatch => {

        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios.post(`/admin/signin`, {
            ...user
        });

        if(res.status === 200){
            const { user, token } = res.data;
            localStorage.setItem('token', token);
            JSON.stringify(localStorage.setItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }else{
            if(res.status === 400){
                dispatch({
                    type: authConstants.LOGIN_FAILURE, 
                    payload: {
                        error: res.data.error
                    }
                })
            }
        }
    }
}

export const isUserLoggeIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'LoggedIn Failed...!!'
                }
            })
        }
    }
}