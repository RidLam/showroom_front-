import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const  Breadcrumb = ({ annonce }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
            Accueil
        </Link>
        <Link color="inherit" href="/" onClick={handleClick}>
            {annonce.commune && annonce.commune.commune_name}
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
            {annonce.categorie && annonce.categorie.name}
        </Link>
        <Typography color="textPrimary">{annonce.title}</Typography>
      </Breadcrumbs>
    </div>
  );
}


export default  Breadcrumb;