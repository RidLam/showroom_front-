import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { reset } from "redux-form";


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      paddingBottom: theme.spacing(2),
      
    },
  send_btn: {
    margin: theme.spacing(1),
    
  }
  },
}));


const ForgetPasswordForm = ({recoverPassword}) => {
  const classes = useStyles();
  const { errors, handleSubmit, watch, control, reset } = useForm({});
  const onSubmit = values => {
    recoverPassword(values);
    reset(values)
    // setTimeout(() => {
    //   window.location.href = "/auth/login"
    // }, 3000)
  }

  return (
    <form className={classes.root} onSubmit={e => e.preventDefault()}>
       <Controller
        name="email"
        control={control}
        rules={{
          required: "You must specify an email"
        }}
        as={
          <TextField
              error={errors.email}
              name="email"
              type="email"
              label="Email"
              id="standard-error-helper-text"
              helperText={errors.email ? errors.email.message : ""}
              variant="outlined"
              size="small"
              fullWidth
            />
      }
      />
      <Button className="btn_save" type="submit" onClick={handleSubmit(onSubmit)}>Se connecter</Button>
    </form>
  );
};

export default ForgetPasswordForm;