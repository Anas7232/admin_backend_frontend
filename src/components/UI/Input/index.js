import React from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
           {props.label && <Form.Label> {props.label} </Form.Label>} 
            <Form.Control type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            <Form.Text className="text-muted">
                {props.error}
            </Form.Text>
        </Form.Group>
    )
}

export default Input
