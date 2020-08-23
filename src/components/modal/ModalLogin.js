import React, {useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";

function ModalLogin ({ show, handleClose, loginSuccess }) {
    // state save name of user and error login
    const [name, setName] = useState('');
    const [errorLogin, setErrorLogin] = useState('');

    const handleLogin = (e)=>{
        e.preventDefault();
        // check if a list users exists 
        if(localStorage.getItem('dataFinSo')){
            // get list and parse to array
            let dataFinSo =  JSON.parse(localStorage.getItem('dataFinSo'));
            
            // Check if name account in list users
            if(Object.keys(dataFinSo).some((user)=>{
              return dataFinSo[user].name === name
            })){
              setErrorLogin('');
              localStorage.setItem('userLogin', name);
              loginSuccess(name);
            }else{
              // name account NOT in list user
              setErrorLogin('Account name not exists.');
            }
        }else{
            setErrorLogin('Account name not exists.');
        }
    }
  return (
    <Modal show={show} animation={true} centered onHide={handleClose}>
      <Form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={3}>
              Your name
            </Form.Label>
            <Col sm={9}>
              <Form.Control 
              required
              type="text" placeholder="enter your name" value={name}
              onChange={(e)=>setName(e.target.value)}/>
               {errorLogin ? <Alert variant="danger">
                {errorLogin}
               </Alert> : ""}
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalLogin;
