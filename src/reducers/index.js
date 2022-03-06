import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import categoryReducers from "./category.reducers";
import productReducers from "./product.reducers";


const rootReducers = combineReducers({
    auth: authReducers,
    category: categoryReducers,
    product: productReducers
});

export default rootReducers;