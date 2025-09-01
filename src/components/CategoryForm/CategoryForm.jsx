import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as categoryService from '../../services/categoryService';
import { Form, Button, Container, Card } from 'react-bootstrap';

const CategoryForm = ({ user, handleAddCategory, handleUpdateCategory }) => {
  const { categoryId } = useParams();

  if (!user || !user.is_admin) {
    return <p className="text-center mt-5">You do not have permission to access this form.</p>;
  }

  const initialState = {
    name: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await categoryService.show(categoryId);
        if (data) setFormData(data);
      } catch (err) {
        console.error("Failed to fetch category", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchCategory();
  }, [categoryId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (categoryId) {
        await handleUpdateCategory(formData, categoryId);
      } else {
        await handleAddCategory(formData);
      }
    } catch (err) {
      console.error("Failed to save category", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card bg="dark" text="light" style={{ width: '28rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            {categoryId ? 'Edit Category' : 'New Category'}
          </Card.Title>
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
            <Button variant="primary" type="submit" className="w-100">
              {categoryId ? 'Update Category' : 'Create Category'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CategoryForm;
