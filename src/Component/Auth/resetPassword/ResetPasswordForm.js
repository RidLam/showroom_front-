import React from "react";
import TextField from '@material-ui/core/TextField';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';


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


const ResetPasswordForm = ({changePassword, match}) => {
  const classes = useStyles();
  const { errors, handleSubmit, watch, control, reset } = useForm({});
  let pwd = watch("password");  
  const onSubmit = values => {
    var uuid = match.params.uuid;
    values.id = uuid;
    changePassword(values);
    reset(values);
    // setTimeout(() => {
    //   window.location.href = "/auth/login"
    // }, 3000)
  }

  return (
    <form className={classes.root} onSubmit={e => e.preventDefault()}>
       <Controller
        name="password"
        control={control}
        rules={{
          required: "You must specify a password"
        }}
        as={
          <TextField
              error={errors.password}
              name="password"
              type="password"
              label="New passe"
              id="standard-error-helper-text"
              helperText={errors.password ? errors.password.message : ""}
              variant="outlined"
              size="small"
              fullWidth
            />
      }
      />

      <Controller
        name="password_repeat"
        control={control}
        rules={{
          required: "You must specify a password",
          validate: value => value === watch('password') || "Passwords don't match."
        }}
        as={
          <TextField
            error={errors.password_repeat}
            name="password_repeat"
            type="password"
            label="Confirm mot de passe"
            id="standard-error-helper-text"
            variant="outlined"
            helperText={errors.password_repeat ? errors.password_repeat.message : ""}
            size="small"
            fullWidth
          />
        }
      />


      <Button className="btn_save" type="submit" onClick={handleSubmit(onSubmit)}>Réinitialiser le mot de passe</Button>
    </form>
  );
};

export default ResetPasswordForm;