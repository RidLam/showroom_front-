import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormControl, FormHelperText, TextareaAutosize } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";





export default function ContactModal({ annonce , isOpen, contactUSer, messageSent, closeOpenModal, messageSentFunc }) {
    const { errors, handleSubmit, watch, control } = useForm({});
    const onSubmit = values => {
        console.log(values);
        values.user_id = annonce.user_id;
        contactUSer(values);
    }
    if(messageSent) {
        messageSentFunc();
        closeOpenModal();
    }
  return (
    <Modal isOpen={isOpen} >
        <ModalHeader toggle={contactUSer}>Contact User</ModalHeader>
        <form onSubmit={e => e.preventDefault()}>
            <ModalBody>
                <FormControl  variant="outlined" fullWidth size="small" id="select-categorie" error={errors.message} >
                    <Controller  name="message" control={control} rules={{ required: "You must specify a message"  }}
                    as={
                    <TextareaAutosize error={errors.message} aria-label="minimum height" rowsMin={3} rowsMax={9} placeholder="Your message" name="message"></TextareaAutosize>
                    } />
                    <FormHelperText>{errors.message ? errors.message.message : ""}</FormHelperText>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button className="btn_save" type="submit" onClick={handleSubmit(onSubmit)}>Envoyer</Button>
            </ModalFooter>
        </form>

    </Modal>
  );
}
