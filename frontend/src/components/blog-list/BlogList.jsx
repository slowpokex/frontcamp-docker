import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container,
  Col,
  Row,
  Form,
  Button,
  FormGroup,
  Label, 
  Input,
  FormText,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter
} from 'reactstrap';
import * as blogsActions from '../../actions/blogsActions';
import './blog-list.css';

const mapStateToProps = (state) => ({
  user: state.user
});

class BlogList extends Component {
    constructor() {
        super();
        this.renderList = this.renderList.bind(this);
        this.removeBlog = this.removeBlog.bind(this);
    }

    componentWillMount() {
      this.props.loadAllBlogs();
    }

    handleFilter(event) {
      
    }

    removeBlog(event) {
      console.log(event.target.name);
    }

    renderCard({ id, title, body }) {
      return (
        <Card key={ id }>
          <CardBody>
            <CardTitle>{ title }</CardTitle>
            <CardText>{ body }</CardText>
            <Button name={id} onClick={ this.removeBlog }>Delete blog</Button>
          </CardBody>
        </Card>);
      };

    renderList(elems) {
        if (!elems || !elems.length) {
            return (<div>No data available!</div>);
        }
        return (
            <Row>
                { elems.map(elem => this.renderCard(elem)) }   
            </Row>
        );
    }
 
    render() {
        return (
            <Container>
                <Row>                    
                  <Form>
                      <Label for="filterBlogs">Filter blogs:</Label>
                      <Input type="text" id="filterBlogs" placeholder="Input blog's head" />
                  </Form>                    
                </Row>                
                <Row>
                  { this.renderList([{
                    id: 1,
                    title: 'One',
                    body: 'body'
                  }, {
                    id: 2,
                    title: 'Two',
                    body: 'Lol'
                  }]) }
                </Row>
            </Container>
        );
    }
}

export default connect(mapStateToProps, blogsActions)(BlogList);
