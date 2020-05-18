import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import map from '../../Assets/images/categories/jeux.jpg';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function clicked() {
    props.clicked('test data');
}

export default function SideBar({props}) {
  const classes = useStyles();

  return (
    <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="120"
          image={map}
          title="Contemplative Reptile"
        />
        <Avatar alt="Remy Sharp" src={map}  />
        <Avatar alt="Remy Sharp" src={map}  />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" onClick={() => {props.clicked('data')}} color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
