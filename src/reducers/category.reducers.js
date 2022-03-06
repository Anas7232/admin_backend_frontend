import { categoryConstants } from "../action/constants";


const initState = {
    categories: [],
    error: null,
    loading: false
};


const biuldNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }

    for(let cat of categories){
        if(cat._id == parentId){
            myCategories.push({
                ...cat,
                children: cat.children ? biuldNewCategories(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category): []
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? biuldNewCategories(parentId, cat.children, category): []
            })
        }
    }

    return myCategories;

}


export default (state = initState, action) => {
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.POST_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.POST_ALL_CATEGORY_SUCCESS:

            const category = action.payload.category;
            const updateNewCategory = biuldNewCategories(category.parentId, state.categories, category);

            state = {
                ...state,
                loading: false,
                categories: updateNewCategory
            }
            break;
        case categoryConstants.POST_ALL_CATEGORY_FAILURE:
            state = {
                ...initState
            }
            break;
    }
    return state;

}