import React from 'react'
import { Form, Button } from 'react-bootstrap'

const ReviewForm = ({ handleSubmit, revText, labelText, defaultValue = '' }) => {
  return (
    <div>
        <Form.Group className = "mb-3" controlId="exampleForm.ControlTextarea1"> 
            <Form.Label>{labelText}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              ref={revText}
              defaultValue={defaultValue}
            />
            <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
        </Form.Group>
    </div>
  )
}

export default ReviewForm