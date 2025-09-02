import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as categoryService from '../../services/categoryService';
import * as instructorService from '../../services/instructorService';
import { Container, Card, Form, Button } from 'react-bootstrap';

const CategoryForm = ({ user, handleAddCategory, handleUpdateCategory }) => {
  const { categoryId } = useParams();

  if (!user || !user.is_admin) {
    return <p>You do not have permission to access this form.</p>;
  }

  const initialState = {
    name: '',
    description: '',
    instructor_id: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await categoryService.show(categoryId);
        if (data) {
          setFormData({
            name: data.name,
            description: data.description,
            instructor_id: data.instructor?.id || '',
          });
        }
      } catch (err) {
        console.error("Failed to fetch category", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryId]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const data = await instructorService.index();
        setInstructors(data);
      } catch (err) {
        console.error("Failed to fetch instructors", err);
      }
    };
    fetchInstructors();
  }, []);

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
<Container className="d-flex justify-content-center align-items-center">
  <Card text="light" style={{ width: '28rem', backgroundColor: '#1a1a1a', marginTop:'170px' }}>
    <Card.Body>
      <Card.Title className="mb-4 text-center">
        {categoryId ? 'Edit Category' : 'New Category'}
      </Card.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Category Name:</Form.Label>
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

        <Form.Group className="mb-3" controlId="formInstructor">
          <Form.Label>Instructor:</Form.Label>
          <Form.Select
            name="instructor_id"
            value={formData.instructor_id}
            onChange={handleChange}
          >
            <option value="">Select an instructor</option>
            {instructors.map(inst => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button style={{backgroundColor:'#e07a84', border:'#e07a84'}} type="submit" className="w-100">
          {categoryId ? 'Update Category' : 'Create Category'}
        </Button>
      </Form>
    </Card.Body>
  </Card>
</Container>

  );
};

export default CategoryForm;
