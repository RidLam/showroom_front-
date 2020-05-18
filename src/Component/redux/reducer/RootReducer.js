import {combineReducers} from 'redux';
import homeReducer  from '../../Home/HomeReducer';
import regionReducer  from '../../Commons/reducers/region/RegionReducer';
import categorieReducer  from '../../Commons/reducers/categorie/CategorieReducer';
import departementReducer  from '../../Commons/reducers/depertement/DepartementReducer';
import userDetailReducer  from '../../Commons/reducers/userDetail/UserDetailReducer';
import sendMailReducer  from '../../Commons/reducers/Mailing/SendMailReducer';
import annonceReducer  from '../../Categorie/CategorieReducer';
import questionReducer  from '../../Commons/reducers/question/QuestionReducer';
import userReducer  from '../../Auth/login/UserReducer';

import { connectRouter } from 'connected-react-router'


const RootReducer = (history) =>  combineReducers({
    router: connectRouter(history),
    homeReducer,
    regionReducer,
    categorieReducer,
    departementReducer,
    userDetailReducer,
    sendMailReducer,
    annonceReducer,
    questionReducer,
    userReducer
})

export default RootReducer;