import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, InputLabel, MenuItem, FormControl, Select, InputAdornment, Container  } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './searchForm.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      paddingBottom: theme.spacing(1),
    },
    '& .searchFilter': {
        padding: theme.spacing(1),
      },
  send_btn: {
    margin: theme.spacing(1),
  }
  },
}));

function valuetext(value) {
    return `${value}€`;
  }

const SearchForm = ({ regions, categories, search, getCommunesById, communes, openFilter, closeFilterFunc }) => {
  const classes = useStyles();
  const { errors, handleSubmit, watch, control, reset } = useForm({});
  const [categorie, setCategorie] = useState({name:''});  
  const [value, setValue] = React.useState([20, 10000]);

  const onSubmit = values => {
    search(values);
    closeFilterFunc();
  }

  const handleChange = () => {

  }
  const handleCommuneChange = (event, newValue) => {
    var { value } = event.target;
    var body = {};
    if(typeof value == 'string') {
      body.nom_complet = value;
    }else {
        body.code_postal = value;
    }
    if(Object.keys(body)) getCommunesById(body);
  };
  return (
      <div className={openFilter ? "searchFilter showFilter" : "searchFilter hideFilter"}>
        <Container>
          <form className={classes.root} onSubmit={e => e.preventDefault()}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="title"
                        control={control}
                        as={
                        <TextField
                            name="title"
                            type="text"
                            label="Titre"
                            id="standard-error-helper-text"
                            variant="outlined"
                            size="small"
                            fullWidth
                            />
                    }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl required variant="outlined" fullWidth size="small" id="select-categorie" >
                            <InputLabel id="demo-simple-select-outlined-label">Categorie</InputLabel>
                            <Controller  defaultValue={categorie}  name="categorie" control={control}
                                as={
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Categorie"
                                        value={categorie}
                                        onChange={handleChange}
                                        //renderValue={(value) => `${value.name}`}
                                        >
                                        <MenuItem>
                                            <em>None</em>
                                        </MenuItem>
                                            {categories && categories.map(categorie => {
                                                return <MenuItem value={categorie}>{categorie.name}</MenuItem>
                                            })}
                                    </Select>
                                } />
                        </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                        label="Min Prix"
                        id="outlined-start-adornment"
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}
                        variant="outlined"
                        size="small"
                        />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                        label="Max Prix"
                        type="number"
                        id="outlined-start-adornment"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}
                        variant="outlined"
                        size="small"
                        />
                </Grid>
                <Grid item xs={12} sm={3}>
                <Controller
                            as={
                                <Autocomplete
                                    options={communes}
                                    getOptionLabel={option => {
                                        if(!option.nom_complet && !option.code_postal) return "";
                                         return option.nom_complet + "(" + option.code_postal + ")"}
                                        }
                                    renderOption={option => (
                                        <span>
                                        {option.nom_complet + "(" + option.code_postal + ")"}
                                        </span>
                                    )}
                                    renderInput={params => (
                                        <TextField
                                        {...params}
                                        error={errors.location}
                                        label="Choose a commune"
                                        variant="outlined"
                                        onChange={handleCommuneChange}
                                        size="small"
                                        helperText={errors.location ? errors.location.message : ""}
                                        />
                                    )}
                                />
                            }
                            onChange={([, data]) => data}
                            name="location"
                            control={control}
                            defaultValue={""}
                            />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button className="btn_save" type="submit" onClick={handleSubmit(onSubmit)}>Search</Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button className="btn-drawer-close" type="submit" onClick={handleSubmit(onSubmit)}>Close</Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button className="btn-drawer-reset" type="submit" onClick={handleSubmit(onSubmit)}>Reset</Button>
                </Grid>
            </Grid>
      


        
        </form>
  
      </Container>
      </div>
  );
};

export default SearchForm;