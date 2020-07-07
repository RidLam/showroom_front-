
import React, { useState, useEffect  } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Container, Row } from 'reactstrap';
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


const EditProfileEmail = ({ changeEmail }) => {
  const classes = useStyles();
  const { errors, handleSubmit, watch, control } = useForm({});
  const [email, setemail] = useState("");
  const [confirmEmail, setconfirmEmail] = useState("");
  const onSubmit = values => {
    changeEmail(values);
  }

  return (
    <Card id="change-email" style={{marginTop: '7%'}}>
    <CardHeader>Changement d'email </CardHeader>
    <CardBody>
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
              value={email}
              size="small"
              fullWidth
            />
      }
      />

      <Controller
        name="confirmEmail"
        control={control}
        rules={{
          required: "You must specify a conirmation email",
          validate: value => value === watch('email') || "Email don't match."
        }}
        as={
          <TextField
            error={errors.confirmEmail}
            name="confirmEmail"
            type="email"
            label="Confirme email"
            id="standard-error-helper-text"
            value={confirmEmail}
            variant="outlined"
            helperText={errors.confirmEmail ? errors.confirmEmail.message : ""}
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

export default EditProfileEmail;