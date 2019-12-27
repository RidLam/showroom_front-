export const GET_CATEGORIE_PENDING = 'GET_CATEGORIE_PENDING';
export const GET_CATEGORIE_SUCCESS = 'GET_CATEGORIE_SUCCESS';
export const GET_CATEGORIE_ERROR = 'GET_CATEGORIE_ERROR';

export function getCategoriePending() {
    return {
        type: GET_CATEGORIE_PENDING
    }
}

export function getCategorieSuccess(categories) {
    return {
        type: GET_CATEGORIE_SUCCESS,
        categories: categories
    }
}

export function getCategorieError(error) {
    return {
        type: GET_CATEGORIE_ERROR,
        error: error
    }
}