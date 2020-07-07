import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageGallery from 'react-image-gallery';


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

const  ImageSliderCard = ({ annonce }) => {
const classes = useStyles();
const base_url = "http://localhost:3000";

  return (
    <div className="detail-card">
      <div className="detail-card-header">
        <div className="card-title">
            <div className="title">Title</div>
            <div className="date">09-03-2020 à 12:45</div>
        </div>
        <div className="card-price">56,09€</div>
      </div>
        {annonce.images && annonce.images.length > 0 ?
            <ImageGallery 
                thumbnailPosition="bottom"
                //sizes="500w"
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={true}
                items={
                    annonce.images && annonce.images.length && annonce.images.map(function(image) {
                        return{
                                original: base_url + image.path,
                                thumbnail: base_url + image.path
                            }
                    })
                } />
        :
        <div className="detail-no-image">
        </div>
        }
    </div>
  );
}


export default  ImageSliderCard;