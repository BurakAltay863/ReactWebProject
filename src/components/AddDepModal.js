import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form,FormGroup} from 'react-bootstrap';
import Snackbar  from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export  class AddDepModal extends Component {
    
    constructor(props){
        super(props);
        this.state={
            snackbaropen : false,
            snackbarmsg:''
        }

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    snackbarClose = () =>
    {
        this.setState({
            snackbaropen:false
        });
    }

    handleSubmit(e)
    {
        e.preventDefault();
        
        fetch('http://localhost:51331/api/department',
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                DepartmentID:null,
                DepartmentName:e.target.DepartmentName.value
            })
            })
            .then(res => res.json())
                .then((result)=>
            {
              this.setState({
                snackbaropen:true,
                snackbarmsg:result
              });
            },
            (error) =>
            {
                this.setState({
                    snackbaropen:true,
                    snackbarmsg:"result"
                  });
            } )
           
       
    }
  render() {
    return (
        <div className='container'>
            <Snackbar 
            anchorOrigin={{vertical:'bottom',horizontal:'center'}}
            open={this.state.snackbaropen}
            autoHideDuration={1000}
            onClose={this.snackbarClose}
            
            message={<span id='message-id'>{this.state.snackbarmsg}</span>}
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={this.state.snackbarClose}>
                    x
                </IconButton>
            ]}

            />
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            AddDepartment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Form.Label>
                                    Add Department
                                </Form.Label>
                                <Form.Control
                                type='text'
                                name='DepartmentName'
                                required
                                placeholder='DepartmentName'                           
                                />

                            </FormGroup>
                            <FormGroup>
                                <Button variant='primary' type='submit'>
                                Add
                                </Button> 
                            </FormGroup>

                        </Form>
                    </Col>
                </Row>
            
         

        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
  }
}
