import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as  categoryService from '../../services/categoryService';
import { Form, Button, Container, Card } from 'react-bootstrap';

const CategoryForm = (props) => {

  const {categoryId} = useParams()
  const  initialState = {
    name:'',
    description:'',
    session:'',
  }
  const [formData, setFormData] = useState(initialState)

  useEffect(()=>{
    const fetchcategory = async()=>{
      const data = await categoryService.show(categoryId)
      setFormData(data)
    }
    if(categoryId) fetchcategory()
  },[categoryId])

  const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  const handleSubmit = (event) => {
    event.preventDefault();
    if (categoryId) {
      props.handleUpdateCategory(formData, categoryId);
    } else {
      props.handleAddCategory(formData);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card bg="dark" text="light" style={{ width: '28rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">{categoryId ? 'Edit Category' : 'New Category'}</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSession">
              <Form.Label>Sessions:</Form.Label>
              <Form.Control
                type="text"
                name="session"
                value={formData.session}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {categoryId ? 'Update Category' : 'Create Category'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CategoryForm;