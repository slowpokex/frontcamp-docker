import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { random } from 'lodash';
import { 
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import './create-blog.css';
import * as blogActions from '../../actions/blogsActions';

function mapStateToProps(state, dispatch) {
    return {
      user: state.user,
      listBlogs: state.listBlogs,
      dispatch
    }
  }

class CreateBlog extends Component {
    constructor() {
        super();
        this.sendBlog = this.sendBlog.bind(this);
        this.state = {

        };
    }

    sendBlog(event) {
      event.preventDefault();
      const blogTitle = ReactDOM.findDOMNode(this.refs.blogTitle).value;
      const blogText = ReactDOM.findDOMNode(this.refs.blogText).value;
      
      const blogForSend = {
        _id: random(0, Number.MAX_SAFE_INTEGER),
        userId: this.props.user.login,
        title: blogTitle,
        body: blogText
      };
      
      this.props.publishBlog(blogForSend);
    }

    render() {
        return (
        <Form onSubmit={ this.sendBlog }>
            <FormGroup>
                <Label for="blogTitle">Head</Label>
                <Input type="text" ref="blogTitle" id="blogTitle" placeholder="Provide head of blog..." />
            </FormGroup>
            <FormGroup>
                <Label for="blogText">Description</Label>
                <Input type="textarea" name="text" ref="blogText" id="blogText" placeholder="Write here something..." />
            </FormGroup>
            <FormGroup>
                <Button outline color="success">Publish</Button>{' '}
                <Button outline color="warning">Clean</Button>
            </FormGroup>
        </Form>);
    }
}

export default connect(mapStateToProps, blogActions)(CreateBlog);
