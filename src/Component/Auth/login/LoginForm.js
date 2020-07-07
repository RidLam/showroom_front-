import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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


const LoginForm = ({login}) => {
  const classes = useStyles();
  const { errors, handleSubmit, watch, control, reset } = useForm({});
  const onSubmit = values => {
    login(values);
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

      <Controller
        name="password"
        control={control}
        rules={{
          required: "You must specify a password",
          //validate: value => value === watch('password') || "Passwords don't match."
        }}
        as={
          <TextField
            error={errors.password}
            name="password"
            type="password"
            label="Password"
            id="standard-error-helper-text"
            variant="outlined"
            helperText={errors.password ? errors.password.message : ""}
            size="small"
            fullWidth
          />
        }
      />


      <Button className="btn_save" type="submit" onClick={handleSubmit(onSubmit)}>Se connecter</Button>
    </form>
  );
};

export default LoginForm;