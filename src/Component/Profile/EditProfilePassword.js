


import React, { useState, useEffect  } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardFooter, CardBody,CardTitle, CardText,  Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledAlert } from 'reactstrap';


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


const EditProfilePassword = ({ changePassword }) => {
  const classes = useStyles();
  const { errors, handleSubmit, watch, control } = useForm({});
  const onSubmit = values => {
    changePassword(values);
  }

  return (
    <Card id="change-password" style={{marginTop: '7%'}}>
    <CardHeader>Changement password </CardHeader>
    <CardBody>
    
    <form className={classes.root} onSubmit={e => e.preventDefault()}>
       <Controller
        name="oldPassword"
        control={control}
        rules={{
          required: "You must specify the old password"
        }}
        as={
          <TextField
              error={errors.oldPassword}
              name="oldPassword"
              type="password"
              label="Old password"
              id="standard-error-helper-text"
              helperText={errors.oldPassword ? errors.oldPassword.message : ""}
              variant="outlined"
              size="small"
              fullWidth
            />
      }
      />

      <Controller
        name="newPassword"
        control={control}
        rules={{
          required: "You must specify a new password",
          //validate: value => value === watch('email') || "Email don't match."
        }}
        as={
          <TextField
            error={errors.newPassword}
            name="confirmEmail"
            type="password"
            label="Confirme email"
            id="standard-error-helper-text"
            variant="outlined"
            helperText={errors.newPassword ? errors.newPassword.message : ""}
            size="small"
            fullWidth
          />
        }
      />

        <Controller
            name="confirmPassword"
            control={control}
            rules={{
            required: "You must specify a new password",
            validate: value => value === watch('newPassword') || "Password don't match."
            }}
            as={
            <TextField
                error={errors.confirmPassword}
                name="confirmPassword"
                type="password"
                label="Confirme mot de passe"
                id="standard-error-helper-text"
                variant="outlined"
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                size="small"
                fullWidth
            />
            }
        />


      <Button className="btn_save" type="submit" onClick={handleSubmit(onSubmit)}>Envoyer</Button>
    </form>
  
    </CardBody>
  
</Card>

     
  );
};

export default EditProfilePassword;