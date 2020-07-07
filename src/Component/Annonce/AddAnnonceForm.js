import React,{ useState, useEffect } from 'react';
import { Card, CardHeader, CardFooter, CardBody,CardTitle, Input, Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import { TextField, Grid, InputLabel, MenuItem, FormControl, Select, FormHelperText, TextareaAutosize } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MapCircle from '../../maps/MapCircle';
import ImagesUpload from './ImagesUpload';





const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        paddingBottom: theme.spacing(4),
        
      },
      '& #select-categorie': {
        paddingBottom: theme.spacing(4),
        
      },
      '& #add-annonce-block': {
        marginBottom: theme.spacing(4),
        
      },
      '& #datepicker': {
        marginBottom: theme.spacing(4),
        zIndex: 9,
        position:"relative"
      },
    send_btn: {
      margin: theme.spacing(1),
      
    },
    formControl: {
        marginTop: theme.spacing(5),
      },
    },
  }));



const AddAnnonceForm = ({categories, communes, getCommunesById, addAnnonce, files}) => {
    const { errors, handleSubmit, watch, control } = useForm({});
    const classes = useStyles();

    const [title, setTitle] = useState("");
    const [price, , setPrice] = useState(0);
    const [phone, setPhone] = useState(0);
    const [description, setDescription] = useState("");
    const [garantie, setGarantie] = useState("");
    const [productStatus, setProductStatus] = useState("");
    const [location, setLocation] = useState(0);
    const [bill, setbill] = useState("");
    const [categorie, setCategorie] = useState({name: "None"});
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    var coords = {};

    const locationWatch = watch("location"); 
    const categorieWatch = watch("categorie"); 
    useEffect(() => {
        if(locationWatch) {
            coords = {lat: locationWatch.latitude, lng: locationWatch.longitude}
        }
      });

    const handleChange = (event) => {
        const { name, value } = event.target;
            setState( prevState => ({
                ...prevState,
                [name] : value
            }))
        
    };

    const handleFileChange = (file) => {
        files.push(file)
    }
    const getCommuneAsync = (event) => {
       const { value } = event.target;
       var body = {};
       setLocation(value);
       if(typeof value == 'string') {
            body.nom_complet = value;
       }else {
           body.code_postal = value;
       }
       if(Object.keys(body)) getCommunesById(body);
      }


    const removeFile = file => {
        for(var i = 0; i < files.length; i++) {
            var _file = files[i];
            if(_file.index == file) {
                files.splice(i, 1);
            }
        }
    }
    const onSubmit = values => {
        values.files = files;
        addAnnonce(values);
    }

    return(
        <form className={classes.root} onSubmit={e => e.preventDefault()}>
            <Card id="add-annonce-block">
                <CardHeader>Votre annonce</CardHeader>
                <CardBody>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            value={title}
                            name="title"
                            control={control}
                            rules={{
                            required: "You must specify a title"
                            
                            }}
                            as={
                            <TextField
                                error={errors.title}
                                name="title"
                                type="title"
                                label="Title"
                                id="standard-error-helper-text"
                                value={title}
                                helperText={errors.title ? errors.title.message : ""}
                                variant="outlined"
                                size="small"
                                fullWidth
                                required 
                                />
                        }
                        />
                        <FormControl required variant="outlined" fullWidth size="small" id="select-categorie" error={errors.categorie} >
                            <InputLabel id="demo-simple-select-outlined-label">Categorie</InputLabel>
                            <Controller  defaultValue={categorie}  name="categorie" control={control} rules={{ required: "You must specify a categorie" }}
                                as={
                                    
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Categorie"
                                        value={categorie}
                                        onChange={handleChange}
                                        renderValue={(value) => `${value.name}`}
                                        >
                                        <MenuItem value={" "}>
                                            <em>None</em>
                                        </MenuItem>
                                            {categories && categories.map(categorie => {
                                                return <MenuItem value={categorie}>{categorie.name}</MenuItem>
                                            })}
                                    </Select>
                                } />
                                <FormHelperText>{errors.categorie ? errors.categorie.message : ""}</FormHelperText>
                            </FormControl>
                            <FormControl  variant="outlined" fullWidth size="small" id="select-categorie" error={errors.description} >
                                 <Controller  name="description" control={control} rules={{ required: "You must specify a description"  }}
                                as={
                                <TextareaAutosize error={errors.description} aria-label="minimum height" rowsMin={3} rowsMax={9} placeholder="Your description" name="description"></TextareaAutosize>
                                } />
                                <FormHelperText>{errors.description ? errors.description.message : ""}</FormHelperText>
                            </FormControl>
                            <Controller value={price} name="price" control={control} id="price" rules={{ required: "You must specify a price" }}
                            as={
                            <TextField
                                error={errors.price}
                                name="price"
                                type="number"
                                label="Price"
                                value={price}
                                helperText={errors.price ? errors.price.message : ""}
                                variant="outlined"
                                size="small"
                                />
                        }
                        />
                            <Controller value={phone} name="phone" control={control} rules={{ required: "You must specify a phone number" }}
                                as={
                                <TextField
                                    error={errors.phone}
                                    name="phone"
                                    type="number"
                                    value={phone}
                                    label="Phone"
                                    id="standard-error-helper-text"
                                    helperText={errors.phone ? errors.phone.message : ""}
                                    variant="outlined"
                                    size="small"
                                    />
                            }
                            />
                    </Grid>
                    <Grid style={{display: (categorieWatch && (categorieWatch.id == 7 || categorieWatch.id ==  8)) ? "none" : "block"}} item xs={12} sm={6}>
                   
                            <div id="datepicker">
                                <Controller
                                    as={DatePicker}
                                    control={control}
                                    valueName="selected" // DateSelect value's name is selected
                                    onChange={([selected]) => selected}
                                    name="ReactDatepicker"
                                    className="input"
                                    
                                    placeholderText="Select date"
                                    />
                            </div>
                    
                            
                            <FormControl variant="outlined" fullWidth size="small" id="select-categorie">
                            <InputLabel id="demo-simple-select-outlined-label">Bill</InputLabel>
                            <Controller defaultValue={bill} name="bill" control={control} value={bill || ""}
                                as={<Select
                                        labelId="demo-simple-select-outlined-label"
                                        label="Bill"
                                        onChange={handleChange}
                                        value={bill}
                                        renderValue={(value) => `${value}`}
                                        >
                                    <MenuItem value={bill}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Oui">Oui</MenuItem>
                                    <MenuItem value="Non">Non</MenuItem>
                                    </Select>
                                } />
                            </FormControl>

                            <FormControl variant="outlined" fullWidth size="small" id="select-categorie">
                            <InputLabel id="demo-simple-select-outlined-label">Product status</InputLabel>
                            <Controller defaultValue={productStatus} name="productStatus" control={control}
                                as={<Select
                                        labelId="demo-simple-select-outlined-label"
                                        label="product status"
                                        value={productStatus}
                                        onChange={handleChange}
                                        renderValue={(value) => `${value}`}
                                        >
                                    <MenuItem value={productStatus}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Neuf">Neuf</MenuItem>
                                    <MenuItem value="Bon etat">Bon etat</MenuItem>
                                    <MenuItem value="Etat moyen">Etat moyen</MenuItem>
                                    </Select>
                                } />
                            </FormControl>
                            <FormControl variant="outlined" fullWidth size="small" id="select-categorie">
                            <InputLabel id="demo-simple-select-outlined-label">Garantie</InputLabel>
                            <Controller defaultValue={garantie} name="garantie" control={control}
                                as={<Select
                                        labelId="demo-simple-select-outlined-label"
                                        label="Garantie"
                                        value={garantie}
                                        onChange={handleChange}
                                        renderValue={(value) => `${value}`}
                                        >
                                    <MenuItem value={garantie}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Oui">Oui</MenuItem>
                                    <MenuItem value="Non">Non</MenuItem>
                                    </Select>
                                } />
                            </FormControl>
                    </Grid>
                </Grid>
                </CardBody>
            </Card>
            
            <Card id="add-annonce-block">
                <CardHeader>Votre annonce</CardHeader>
                <CardBody>
                <ImagesUpload
                    getFiles= {handleFileChange}
                    removeFile={removeFile}
                    />
                </CardBody>
            </Card>

            <Card id="add-annonce-block">
                <CardHeader>Votre annonce</CardHeader>
                <CardBody>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={5}>
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
                                        onChange={getCommuneAsync}
                                        size="small"
                                        helperText={errors.location ? errors.location.message : ""}
                                        />
                                    )}
                                />
                            }
                            onChange={([, data]) => data}
                            name="location"
                            rules={{
                                required: "You must specify your location",
                                validate: value => {
                                return !!value;
                                }
                            }}
                            control={control}
                            defaultValue={""}
                            />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                    {/* {watch("location") && watch("location").latitude && watch("location").longitude &&
                        <MapCircle
                            coords= {{lat: watch("location").longitude, lng: watch("location").longitude}}
                            height="300px"
                            width="500px"
                        />
                    } */}
                    </Grid>
                </Grid>
               
                </CardBody>
            </Card>


        <Button className="btn_save" type="submit" onClick={handleSubmit(onSubmit)}>Se connecter</Button>
        </form>

   )
}


export default AddAnnonceForm;