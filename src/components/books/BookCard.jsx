import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function BookCard(props) {
    return (
        <Link to={`/books/${props.id}`}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.url} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.author} - {props.year}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default BookCard;