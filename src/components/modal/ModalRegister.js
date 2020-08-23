import React, {useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function ModalRegister ({ show, handleClose }){
    // state save name and preferences of user
    const [name, setName] = useState('');
    const [preferences, setPreferences] = useState('bitcoin');

    const handleRegister = (e)=>{
        e.preventDefault();
        /* 
          * Check if a list of users exists 
          * => update new account to list => update item localStorage
          * else: create new item localStorage with name and preferences register
        */
        if(localStorage.getItem('dataFinSo')){
            let dataFinSo =  JSON.parse(localStorage.getItem('dataFinSo'));
            dataFinSo.push({name, preferences});
            localStorage.setItem('dataFinSo', JSON.stringify(dataFinSo));
            handleClose();
        }else{
            localStorage.setItem('dataFinSo', JSON.stringify([{name, preferences}]));
            handleClose();
        }
    }
  return (
    <Modal show={show} animation={true} centered onHide={handleClose}>
      <Form
        onSubmit={(e) => {
          handleRegister(e);
        }}
      >
        <Modal.Header>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={3}>
              Your name (*)
            </Form.Label>
            <Col sm={9}>
              <Form.Control 
              required
              type="text" placeholder="enter your name" value={name}
              onChange={(e)=>setName(e.target.value)}/>
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={3}>
                Preferences
              </Form.Label>
              <Col sm={9} >
                <Form.Check
                  defaultChecked={true}
                  type="radio"
                  label="Bitcoin"
                  name="preferences"
                  id="bitcoin"
                  value="bitcoin"
                  onChange={(e)=>setPreferences(e.target.value)}    
                />
                <Form.Check
                  type="radio"
                  label="Apple"
                  name="preferences"
                  id="apple"
                  value="apple"    
                  onChange={(e)=>setPreferences(e.target.value)}   
                />
                <Form.Check
                  type="radio"
                  label="Earthquake"
                  name="preferences"
                  id="earthquake"
                  value="earthquake"
                  onChange={(e)=>setPreferences(e.target.value)}   
                />
                <Form.Check
                  type="radio"
                  label="Animals"
                  name="preferences"
                  id="animals"   
                  value="animals"   
                  onChange={(e)=>setPreferences(e.target.value)}    
                />
              </Col>
            </Form.Group>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalRegister;
