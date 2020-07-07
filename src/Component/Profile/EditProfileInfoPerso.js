

import React, { useState, useEffect  } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardFooter, CardBody,CardTitle, CardText,  Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledAlert } from 'reactstrap';
import Avatar from 'react-avatar-edit'
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      paddingBottom: theme.spacing(2),
      
    },
    
  },
  
}));


const EditProfilePassword = ({ changeInfo, user}) => {
  const classes = useStyles();
  const { errors, handleSubmit, watch, control } = useForm({});
  const [openModal, setOpenModal] = useState(false);
  const [preview, setpreview] = useState("");
const [src, setsrc] = useState("");

  const onSubmit = values => {
    changeInfo(values);
  }

  const onCrop = (preview) => {
    console.log(preview);
    setsrc(preview);
    setpreview(preview);
  }
  const onClose = () => {
    setOpenModal(false)
    setpreview("");
  }

  const onSave = () => {
    setOpenModal(false)
  }
  const handleCloseModal = () => {
      setOpenModal(!openModal)
  }
  const changePicture = () => {
      setOpenModal(!openModal);
  }
  return (
    <div className={classes.card}>
      <Card id="personal-info" style={{marginTop: '2%'}} >
        <CardHeader>Changement personl data </CardHeader>
        <CardBody>
          <form className={classes.root} onSubmit={e => e.preventDefault()}>
            <div className="avatar">
                  
                {preview != null ?
                <div className="profile_pic"><img src={preview} alt="Preview" /></div>
                :user && user.avatar ?
                <div className="profile_pic"><img src={user.avatar} alt="Preview" /></div>
                :
                <div className="profile_pic">
                    <div className="image_avatar">
                        {/* <h1>{user && user.firstname.charAt(0).toUpperCase()}{user && user.lastname.charAt(0).toUpperCase()}</h1> */}
                        <img src={avatar}></img>
                    </div>
                </div>
                }
                <Button color="secondary" onClick={()=> changePicture()}>Changer la photo</Button>
            </div>
          <Controller
            name="firstname"
            control={control}
            as={
              <TextField
                  name="firstname"
                  type="text"
                  label="Prénom"
                  id="standard-error-helper-text"
                  variant="outlined"
                  size="small"
                  defaultValue="Ridouan"
                  disabled
                  fullWidth
                />
          }
          />

          <Controller
            name="lastname"
            control={control}
            as={
              <TextField
                name="lastname"
                type="text"
                label="Nom"
                id="standard-error-helper-text"
                variant="outlined"
                size="small"
                defaultValue="Lamghari"
                disabled
                fullWidth
              />
            }
          />

            <Controller
                name="email"
                control={control}
                as={
                <TextField
                    name="email"
                    type="text"
                    label="Email"
                    id="standard-error-helper-text"
                    variant="outlined"
                    disabled
                    size="small"
                    defaultValue="ridcasa01@gmail.com"
                    fullWidth
                />
                }
            />
          <Controller
            name="username"
            control={control}
            rules={{
              required: "You must specify your username"
            }}
            as={
              <TextField
                  error={errors.username}
                  name="username"
                  type="text"
                  label="Nom utilisateur"
                  id="standard-error-helper-text"
                  helperText={errors.username ? errors.username.message : ""}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
          }
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "You must specify your phone"
            }}
            as={
              <TextField
                  error={errors.phone}
                  name="phone"
                  type="text"
                  label="Téléphone"
                  id="standard-error-helper-text"
                  helperText={errors.phone ? errors.phone.message : ""}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
          }
          />


          <Button className="btn_save" type="submit" onClick={handleSubmit(onSubmit)}>Envoyer</Button>
        </form>
        
        </CardBody>
        <Modal isOpen={openModal} >
            <ModalHeader>Changement photo de profile</ModalHeader>
            <ModalBody>
                <div className="modal_body">
                    <Avatar
                        width={250}
                        height={250}
                        onCrop={onCrop}
                        onClose={onClose}
                        src={src}
                        cropRadius={50}
                        minCropRadius={80}
                        maxCropRadius={80}
                        lineWidth={8}
                        />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary"  onClick={()=> onClose()}>Annuler</Button>{' '}
                <Button color="secondary"  onClick={()=> onSave()}>Enregistrer</Button>
            </ModalFooter>
        </Modal>
      
    </Card>
 
    </div>
 );
};

export default EditProfilePassword;