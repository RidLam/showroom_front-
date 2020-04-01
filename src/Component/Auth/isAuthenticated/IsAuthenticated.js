
export const  isAuthenticated = () => {  
    var token = localStorage.getItem('_id');
    var isAuthenticated = false;
    if(token && token != undefined) {
        isAuthenticated = true;
    }

    return isAuthenticated;
}
