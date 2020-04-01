import React, { Component } from 'react';
import { Row, Col, Button, Input, Label, Form, FormGroup, Tooltip, Container } from 'reactstrap';
import './comments.css';
import * as moment from 'moment';


class Comments extends Component {
    constructor(props) {
        super(props);
        this.replyInput = null;
        this.state = {
            question: '',
            reply: '',
            question_uuid: null,
            replyInvalid: false,
            replyTooltipOpen: false,
            deleteTooltipOpen: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendQuestion = this.sendQuestion.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.toggleReplyToolTip = this.toggleReplyToolTip.bind(this);
        this.toggleDeleteToolTip = this.toggleDeleteToolTip.bind(this);
        this.login = this.login.bind(this);

    }

    handleInputChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    sendQuestion() {
        var _question = this.state.question;
        if(_question != '' && _question != undefined) {
            this.props.getQuestion(_question);
        }
    }
    login() {
        this.props.history.push('/auth/login');
    }

    toggleDeleteToolTip() {
        this.setState({
            replyTooltipOpen: !this.state.replyTooltipOpen
        })
    }
    toggleReplyToolTip() {
        this.setState({
            deleteTooltipOpen: !this.state.deleteTooltipOpen
        })
    }
    reply(uuid) {
        this.setState({
            question_uuid: uuid
        })
        this.replyInput.focus();
    }
    handleKeyPress(e) {
        var value = e.target.value;
        var res = {
            reply: value,
            user_uuid: this.state.question_uuid
        }
        if (e.key === "Enter") {
            if(value == '' || value == undefined) {
                this.setState({
                    replyInvalid: true
                })
            }else {
                this.props.handleReply(res);
                this.setState({
                    replyInvalid: false,
                    reply: ''
                })
            }
            
        }
      }

    render() {
        var { questions, isAuthenticated } = this.props;
        

        return(
            <Container>
                <hr/>   
                {isAuthenticated == true ?
                <div>
                    <Row>
                        <Col xs={9}>
                            <FormGroup>
                                <h3>Poser une question :</h3>
                                <Input type="textarea" name="question" rows="5" onChange={this.handleInputChange} id="exampleText" placeholder="Rédiger votre question" />
                            </FormGroup>
                        </Col>
                    
                    </Row>
                    <Row>
                        <Col xs={9}>
                            <div className="comment_btn_block">
                                <Button size="sm" onClick= {() => this.sendQuestion()} className="btn_save">Poser la question</Button>
                            </div>
                        </Col>
                        
                    </Row>
                </div>
                :
                <Row>
                    <Col xs={9}>
                        <div className="disable_comment">
                            <label class="control_label" >Vous devez etre connecter pour poser une question </label>
                            <div className="comment_login_btn">
                                <Button className="btn_save" onClick={() => this.login()}>Connectez-vous</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                } 
                 
                
                <Row>
                    <Col xs={9}>
                        <div className="comments-container">
                            <h4>Questions/Réponses</h4>
                            <ul id="comments-list" className="comments-list">
                            {
                                questions && questions.length > 0 ?
                                    questions.map(question => {
                                        return(
                                            <li key={question.uuid}>
                                                <div className="comment-main-level">
                                                {/* Avatar */}
                                                <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
                                                {/* Contenedor del Comentario */}
                                                <div className="comment-box">
                                                    <div className="comment-head">
                                                    <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">Ridlam</a></h6>
                                                    <span>{moment(question.createdAt).format('DD-MM-YYYY')} à {moment(question.createdAt).format('HH:mm')}</span>
                                                    <i id="replytooltip" onClick={() => this.reply(question.uuid)} className="fa fa-reply" />
                                                    <Tooltip placement="top" isOpen={this.state.replyTooltipOpen} autohide={false} target="replytooltip" toggle={this.toggleReplyToolTip}>Répondre</Tooltip>
                                                    {/* <Button className="btn_save" onClick={() => this.reply(question.uuid)} size="sm">Répondre</Button>{' '} */}
                                                    <i id="deletetooltip" className="fa fa-trash" />
                                                    </div>
                                                    <div className="comment-content">
                                                        {question.question}
                                                    </div>
                                                </div>
                                                </div>
                                                {/* Respuestas de los comentarios */}
                                                <ul className="comments-list reply-list">
                                                    {question.responses && question.responses.map(response => {
                                                        return (
                                                            <li key={question.responses.uuid}>
                                                                {/* Avatar */}
                                                                <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt="" /></div>
                                                                {/* Contenedor del Comentario */}
                                                                <div className="comment-box">
                                                                <div className="comment-head">
                                                                    <h6 className="comment-name"><a href="http://creaticode.com/blog">Ridlam</a></h6>
                                                                    <span>{moment(response.createdAt).format('DD-MM-YYYY')} à {moment(response.createdAt).format('HH:mm')}</span>
                                                                    <i id="deletetooltip" className="fa fa-trash" />
                                                                    <Tooltip placement="top" isOpen={this.state.deleteTooltipOpen} autohide={false} target="deletetooltip" toggle={this.toggleDeleteToolTip}>Supprimer</Tooltip>
                                                                </div>
                                                                <div className="comment-content">
                                                                    {response.response}
                                                                </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                        
                                                    }
                                                </ul>
                                                {this.state.question_uuid == question.uuid ?
                                                <div className="reply_container">
                                                    <Input size="sm" 
                                                        type="text" 
                                                        name="reply" 
                                                        onChange={this.handleInputChange} 
                                                        value={this.state.reply} 
                                                        onKeyPress={this.handleKeyPress} 
                                                        invalid={this.state.replyInvalid} 
                                                        ref={elm => this.replyInput = elm}
                                                        placeholder="Répondre et tape Entrer pour envoyer"/>
                                                </div>
                                                :
                                                null    
                                            }
                                            </li>
                                        )
                                        
                                    })
                                    :
                                    <h2>Aucune question</h2>
                            }
                            
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Comments;