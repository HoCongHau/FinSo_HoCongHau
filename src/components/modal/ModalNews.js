import React from "react";
import { Modal, Container, Row, Col, Image } from "react-bootstrap";
import './modal.css';

// format date to MM/DD/YYYY
function formatDate(dateFormat){
    let date = new Date(dateFormat);
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
}
function ModalNews ({ show, handleClose, data }) {
  return (
    <Modal show={show} animation={true} centered onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Body>
            <Container>
                <Row>
                    <Col className="image-news">
                        <Image src={data.urlToImage ?  data.urlToImage : 'finso.png'} alt={data.title? data.title : 'news'}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>{data.title}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                     <i>{data.description}</i>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr/>
                        <p>Published : <b>{formatDate(data.publishedAt)}</b> {data.author ? " by: " + data.author: ""}</p>
                        <p>Link original news : <a href={data.url} rel="noopener noreferrer" target="_blank">Click here</a></p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {data.content}</Col>
                </Row>
            </Container>
        </Modal.Body>
    </Modal>
  );
};

export default ModalNews;