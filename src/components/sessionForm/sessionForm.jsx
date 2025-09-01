import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as sessionService from '../../services/sessionService'
import * as categoryService from '../../services/categoryService'
import { Form, Button, Container, Card } from 'react-bootstrap'

const SessionForm = () => {
  const { categoryId, sessionId } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  })

  const [adminCategories, setAdminCategories] = useState([])

  // Fetch categories owned by this admin
  useEffect(() => {
    categoryService.indexByAdmin()
      .then(data => setAdminCategories(data))
      .catch(err => console.error('Failed to fetch admin categories:', err))
  }, [])

  // If editing, fetch existing session data and pre-fill form
  useEffect(() => {
    if (sessionId) {
      sessionService.show(categoryId, sessionId).then(data => {
        setForm({
          name: data.name || '',
          description: data.description || '',
          image: data.image || '',
          category: data.category || '',
        })
      })
    }
  }, [categoryId, sessionId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const sessionData = { ...form, price: Number(form.price) }

    if (sessionId) {
      await sessionService.update(categoryId, sessionId, sessionData)
    } else {
      await sessionService.create(categoryId, sessionData)
    }

    navigate(-1)
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card bg="dark" text="light" style={{ width: '28rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            {sessionId ? 'Edit Session' : 'Add New Session'}
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter session name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter session description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price *</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                placeholder="Enter session price"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category *</Form.Label>
              <Form.Select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {adminCategories.map(cat => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {sessionId ? 'Update Session' : 'Create Session'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SessionForm
