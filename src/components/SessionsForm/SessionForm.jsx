import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as sessionService from '../../services/sessionService';
import { Form, Button, Container, Card } from 'react-bootstrap';

const SessionForm = ({ user, categories, handleAddSession, handleUpdateSession }) => {
  const { sessionId } = useParams();

  if (!user || !user.is_admin) {
    return <p className="text-center mt-5">You do not have permission to access this form.</p>;
  }

  const initialState = {
    name: '',
    description: '',
    duration_minutes: '',
    capacity: '',
    category_id: categories.length ? categories[0].id : '', 
    start_time: '',
    end_time: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        if (sessionId) {
          const data = await sessionService.show(sessionId);
          if (data) setFormData(data);
        }
      } catch (err) {
        console.error("Failed to fetch session", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (sessionId) {
        await handleUpdateSession(formData, sessionId);
      } else {
        await handleAddSession(formData);
      }
    } catch (err) {
      console.error("Failed to save session", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card bg="dark" text="light" style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            {sessionId ? 'Edit Session' : 'New Session'}
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Session Name:</Form.Label>
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
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDuration">
              <Form.Label>Duration (minutes):</Form.Label>
              <Form.Control
                type="number"
                name="duration_minutes"
                value={formData.duration_minutes}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCapacity">
              <Form.Label>Capacity:</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category:</Form.Label>
              <Form.Select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStartTime">
              <Form.Label>Start Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEndTime">
              <Form.Label>End Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {sessionId ? 'Update Session' : 'Create Session'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SessionForm;
