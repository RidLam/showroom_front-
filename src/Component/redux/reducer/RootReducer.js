import {combineReducers} from 'redux';
import homeReducer  from '../../Home/HomeReducer';
import regionReducer  from '../../Commons/reducers/region/RegionReducer';
import categorieReducer  from '../../Commons/reducers/categorie/CategorieReducer';
import departementReducer  from '../../Commons/reducers/depertement/DepartementReducer';
import userDetailReducer  from '../../Commons/reducers/userDetail/UserDetailReducer';

const RootReducer = combineReducers({
    homeReducer,
    regionReducer,
    categorieReducer,
    departementReducer,
    userDetailReducer
})

export default RootReducer;