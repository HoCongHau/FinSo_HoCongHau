import React from "react";
import { Card } from "react-bootstrap";
import './card-news.css';

// Card brief of news
function CardNews({src, title, description}) {
  return (
    <Card border="secondary">
        <div className="card-image-wrapper">
          <Card.Img variant="top" src={src ? src : 'finso.png'} />
        </div>
        <Card.Body>
          <Card.Title>{title ? title : 'Updating ...'}</Card.Title>
          <Card.Text>{description ? description : 'Updating ...'}
          </Card.Text>
        </Card.Body>
      </Card>
  );
}

export default CardNews;
