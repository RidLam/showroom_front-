import React from 'react';
const formSchema = {
    email: {
        required : true,
        pathern: "",
        length:""
    },
    password: {
        required: true,
        pathern: "",
        length: ""
    }
}

export  const validate = (values) => {
    var errors = {};
    // if(values.password) {
    //     var isPasswordValid = values.password.length > 8;
    //     if(!isPasswordValid) {
    //         errors.password = "Password length must be 8 character"
    //     }
    // }
    // if(values.email) {
    //     var isEmailValid = new RegExp(/^([\w.%+-]+)@([\w-]+\\.)+([\w]{2,})$/g).test(values.email);
    //     if(!isEmailValid) {
    //         errors.email = "Email is not valid";
    //     }
    // }

    return errors;
}

export const init = () => {
    var schema = formSchema;
    var errors
    for(var item in formSchema) {

    }
}