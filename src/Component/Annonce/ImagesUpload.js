import React, {Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Card, CardHeader, CardFooter, CardBody,CardTitle, CardText } from 'reactstrap';
import '../../Assets/Css/upload.images.css';
import addImage from '../../Assets/images/add_image.png';
import remove from '../../Assets/images/cancel.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";





class UploadImages extends Component{
    constructor (props) {
        super(props);
        this.state = {
           images: [],
           image1 : null
        }



        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.previewFiles = this.previewFiles.bind(this);
        this.deletePreviewImage = this.deletePreviewImage.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
      }
    


    handleFileUpload(event) {
        event.preventDefault();
        
        var file = event.target.files[0];
        var name = event.target.name;
        this.previewFiles(file, name)
       file.index = name;
        this.props.getFiles(file);
    }
    previewFiles(file, name) {
      
        //function readAndPreview(file) {
      
          // Make sure `file.name` matches our extensions criteria
          if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
            var reader = new FileReader();
      
            reader.addEventListener("load", function () {
              var image = new Image();
              var _image = {};
              //image.height = 100;
              image.title = file.name;
              image.src = reader.result;
              //preview.appendChild( image );
              if(name == 'image1') {
                _image.index = 1;
                this.setState({image1: reader.result});

              }
              if(name == 'image2') {
                this.setState({image2: reader.result});

              }
              if(name == 'image3') {
              
                this.setState({image3: reader.result});

              }
              if(name == 'image4') {
                this.setState({image4: reader.result});

              }
              
            }.bind(this));
      
            reader.readAsDataURL(file);
          }
      
      //  }
      
        // if (files) {
        //   [].forEach.call(files, readAndPreview);
        // }
      
      }
      deletePreviewImage(image) {
        if(image == 'image1') {
            this.setState({image1: null});
          }
          if(image == 'image2') {
            this.setState({image2: null});
          }
          if(image == 'image3') {
            this.setState({image3: null});
          }
          if(image == 'image4') {
            this.setState({image4: null});
          }
          this.props.removeFile(image);
      }

render() {
    return(
        <Row>
            <Col>
            {this.state.image1 == null ?
                <label className="fileContainer">
                    <input type="file" id="file"  style={{display: "none"}}
                         name="image1"
                         onChange={this.handleFileUpload}
                         accept="image/gif,image/jpeg,image/jpg,image/png"
                         title="Add photos"
                    />     
                    <img src={addImage}/>               
                </label>
                :            
                <div className="image-preview">
                    <img  src={this.state.image1}/>
                    <a className="remImage" onClick={() => this.deletePreviewImage('image1')} id="delete">
                      <span><MdDeleteForever clolor="red" size="2em"/></span>
	                </a> 
                </div>      
                }   
            </Col>
            <Col>
            {this.state.image2 == null ?
                <label className="fileContainer">
                    <input type="file" id="file"  style={{display: "none"}}
                         name="image2"
                         onChange={this.handleFileUpload}
                         accept="image/gif,image/jpeg,image/jpg,image/png"
                         title="Add photos"
                    />     
                    <img src={addImage}/>               
                </label>
                :            
                <div className="image-preview">
                    <img  src={this.state.image2}/>
                    <a className="remImage" onClick={() => this.deletePreviewImage('image2')} id="delete">
		                <span><MdDeleteForever clolor="red" size="2em"/></span>
	                </a> 
                </div>      
                }                   

            </Col>
            <Col>
            {this.state.image3 == null ?
                <label className="fileContainer">
                    <input type="file" id="file"  style={{display: "none"}}
                         name="image3"
                         onChange={this.handleFileUpload}
                         accept="image/gif,image/jpeg,image/jpg,image/png"
                         title="Add photos"
                    />     
                    <img src={addImage}/>               
                </label>
                :            
                <div className="image-preview">
                    <img  src={this.state.image3}/>
                    <a className="remImage" onClick={() => this.deletePreviewImage('image3')} id="delete">
		                <span><MdDeleteForever clolor="red" size="2em"/></span>
	                </a> 
                </div>      
                }   
            </Col>
            <Col>
            {this.state.image4 == null ?
                <label className="fileContainer">
                    <input type="file" id="file"  style={{display: "none"}}
                         name="image4"
                         onChange={this.handleFileUpload}
                         accept="image/gif,image/jpeg,image/jpg,image/png"
                         title="Add photos"
                    />     
                    <img src={addImage}/>               
                </label>
                :            
                <div className="image-preview">
                    <img  src={this.state.image4}/>
                    <a className="remImage" onClick={() => this.deletePreviewImage('image4')} id="delete">
		                <span><MdDeleteForever clolor="red" size="2em"/></span>
	                </a>   
                </div>      
                }   
            </Col>
            
        </Row>
    )
}

}


export default  UploadImages; 