import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form,FormGroup} from 'react-bootstrap';
import Snackbar  from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export  class AddEmpModal extends Component {


    constructor(props){
        super(props);
        this.state={
            deps:[],
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

    componentDidMount(){
        fetch('http://localhost:51331/api/department').then(response => response.json()).then(data=> {
            this.setState({deps:data});
        })
        
    }
    handleSubmit(e)
    {
        e.preventDefault();
        
        fetch('http://localhost:51331/api/employee',
        {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                EmployeeID:null,
                EmployeeName:e.target.EmployeeName.value,
                Department:e.target.Department.value,
                MailID:e.target.MailID.value,
                DOJ:e.target.Column1.value

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
                Add Employeee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Form.Label>
                                        EmployeeName
                                    </Form.Label>
                                    <Form.Control
                                    type='text'
                                    name='EmployeeName'
                                    required
                                    placeholder='EmployeeName'                           
                                    />
    
                                </FormGroup>
                                <FormGroup>
                                    <Form.Label>
                                        Department
                                    </Form.Label>
                                   <Form.Control as="select">
                                    {this.state.deps.map(dep =>  <option key={dep.DepartmentID}>
                                        {dep.DepartmentName}
                                    </option>
                                    )}
                                       
                                   </Form.Control>
    
                                </FormGroup>
                                <FormGroup>
                                    <Form.Label>
                                        MailID
                                    </Form.Label>
                                    <Form.Control
                                    type='text'
                                    name='MailID'
                                    required
                                    placeholder='MailID'                           
                                    />
    
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>
                                        DOJ
                                    </Form.Label>
                                    <Form.Control
                                    type='date'
                                    name='DOJ'
                                    required
                                    placeholder='DOJ'                           
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