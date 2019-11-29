import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';


class ImagesPreview extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: '',
        id: "upload-photo",
        imageArray: [],
        image1: '',
        image2: '',
        image3:''
      };
      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
      this.previewFiles = this.previewFiles.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.buildImgTag = this.buildImgTag.bind(this);
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files;
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
     
      reader.readAsDataURL(file)
    }

    previewFiles(file, name) {
      
        //function readAndPreview(file) {
      
          // Make sure `file.name` matches our extensions criteria
          if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
            var reader = new FileReader();
      
            reader.addEventListener("load", function () {
              var image = new Image();
              //image.height = 100;
              image.title = file.name;
              image.src = this.result;
              //preview.appendChild( image );
              this.setState({name: this.result});
            }, false);
      
            reader.readAsDataURL(file);
          }
      
      //  }
      
        // if (files) {
        //   [].forEach.call(files, readAndPreview);
        // }
      
      }
      handleChange(e){
        this.readURI(e);
        if (this.props.onChange !== undefined) {
            this.props.onChange(e);
        }
    }
    buildImgTag(){

        for(var i =0; i< this.state.imageArray.length; i++){
            var imageURL = this.state.imageArray[i];
            var image1;
            var image2;
            var image3;
            if(i==0) {
                image1 =  imageURL;
            }
            if(i == 1) {
                image2 =  imageURL;
            }
            if(i == 2) {
                image3 =  imageURL;
            }
        }
        this.setState({
            image1,
            image2,
            image3
        })
       
    }

      readURI(e){
        if (e.target.files) {
    
            /* Get files in array form */
            const files = Array.from(e.target.files);
    
            /* Map each file to a promise that resolves to an array of image URI's */ 
            Promise.all(files.map(file => {
                return (new Promise((resolve,reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }));
            }))
            .then(images => {
    
                /* Once all promises are resolved, update state with image URI array */
                this.setState({ imageArray : images })
    
            }, error => {        
                console.error(error);
            });
        }
    }


    render() {

        //const imgTag = this.buildImgTag();

      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      }
  
      return (
        <div>
          <form onSubmit={this._handleSubmit}>
          
            <button type="submit" onClick={() => this.buildImgTag()}>Upload Image</button>
          </form>
          <Row>
              <Col ms={3}>
                <input
                    id={this.state.id}
                    type="file"
                    name=""
                    accept="image/gif,image/jpeg,image/jpg,image/png,video/mp4,video/x-m4v"
                    title="Add photos or video"
                    onChange={this.handleChange}
                    multiple
                />
              </Col>
              <Col ms={3}>
                <Card>
                    <CardHeader>Third image</CardHeader>
                    <CardBody>
                    <CardTitle>Select max three images</CardTitle>
                    <img className="photo-uploaded"  src={this.state.image1} alt="Photo uploaded"/>
                    </CardBody>
                </Card>
                </Col>
                <Col ms={3}>
                <Card>
                    <CardHeader>Third image</CardHeader>
                    <CardBody>
                    <CardTitle>Select max three images</CardTitle>
                    <img className="photo-uploaded"  src={this.state.image2} alt="Photo uploaded"/>
                    </CardBody>
                </Card>
                </Col>
                <Col ms={3}>
                <Card>
                    <CardHeader>Third image</CardHeader>
                    <CardBody>
                    <CardTitle>Select max three images</CardTitle>
                    <img className="photo-uploaded"  src={this.state.image3} alt="Photo uploaded"/>
                    </CardBody>
                </Card>
                </Col>
           
          </Row>
          
        </div>
      )
    }
  
  }


  export default ImagesPreview;