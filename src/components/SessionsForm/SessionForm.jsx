import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as sessionService from '../../services/sessionService';
import { Form, Button, Container, Card } from 'react-bootstrap';

const SessionForm = ({ user, categories, handleAddSession, handleUpdateSession }) => {
    const { categoryId, sessionId } = useParams();

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
        if (!sessionId || !categories.length) return;

        const fetchSession = async () => {
            setLoading(true);
            try {
                const data = await sessionService.show(categoryId, sessionId);
                if (data) {
                    setFormData({
                        ...data,
                        start_time: toDateTimeLocal(data.start_time),
                        end_time: toDateTimeLocal(data.end_time),
                    });
                }
            } catch (err) {
                console.error("Failed to fetch session", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [sessionId, categoryId, categories]);


    const toDateTimeLocal = (dateStr) => {
        const dt = new Date(dateStr);
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
        return dt.toISOString().slice(0, 16);
    };


    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const payload = {
                ...formData,
                category_id: Number(formData.category_id),
                duration_minutes: Number(formData.duration_minutes),
                capacity: Number(formData.capacity),
                start_time: new Date(formData.start_time).toISOString(),
                end_time: new Date(formData.end_time).toISOString(),
            };

            if (sessionId) {
                await handleUpdateSession(categoryId, sessionId, payload); // use categoryId from useParams
            } else {
                await handleAddSession(categoryId, payload);
            }
        } catch (err) {
            console.error('Failed to save session', err);
        }
    };


    if (loading) return <p>Loading...</p>;

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card text="light" style={{ width: '28rem', backgroundColor: '#1a1a1a'}}>
                <Card.Body>
                    <Card.Title className="mb-4 text-center">
                        {sessionId ? 'Edit Session' : 'New Session'}
                    </Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Session Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Duration (minutes):</Form.Label>
                            <Form.Control
                                type="number"
                                name="duration_minutes"
                                value={formData.duration_minutes}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Capacity:</Form.Label>
                            <Form.Control
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category:</Form.Label>
                            <Form.Select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Start Time:</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="start_time"
                                value={formData.start_time}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>End Time:</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="end_time"
                                value={formData.end_time}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button style={{backgroundColor:'#e07a84', border:'#e07a84'}} type="submit" className="w-100">
                            {sessionId ? 'Update Session' : 'Create Session'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SessionForm;
