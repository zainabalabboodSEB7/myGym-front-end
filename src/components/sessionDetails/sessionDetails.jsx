// import { useEffect, useState } from "react"
// import { useParams, useNavigate, Link } from "react-router-dom"
// import * as categoryService from '../../services/categoryService.js'
// import * as sessionService from '../../services/sessionService.js'
// // import ReviewForm from '../ReviewForm/ReviewForm'
// // import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap'


// const SessionDetails = ({ user }) => {
//     const { categoryId, sessionId } = useParams()
//     const [session, setSession] = useState(null)
//     const [category, setCategory] = useState(null)
//     const navigate = useNavigate()
//     const [deleting, setDeleting] = useState(false)

//     const fetchSession = async () => {
//         const categoryData = await categoryService.show(categoryIdId)
//         const foundSession = categoryData.session.find(session => session._id === sessionId)
//         foundSession.owner = categoryData.owner
//         setSession(foundSession)
//         setCategory(categoryData)
//     }
//     useEffect(() => {
//         fetchItem()
//     }, [categoryId, sessionId])


//     const handleEdit = () => {
//         navigate(`/categories/${categoryId}/sessions/${sessionId}/edit`)
//     }


//     const handleDelete = async () => {
//         setDeleting(true)
//         await sessionService.deleteItem(categoryId, sessionId)
//         setDeleting(false);
//         navigate(`/categories/${categoryId}`)
//     }


//     if (!session) return <h2>Loading...</h2>


//     return (
//         <Container className="py-4">
//             <Row className="justify-content-center mb-4">
//                 <Col xs={12}>
//                     <Card bg="dark" text="light" className="shadow-sm border-0">
//                         <Row className="g-0 flex-column flex-lg-row align-items-stretch">
//                             {item.image && (
//                                 <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center" style={{ background: 'transparent', minHeight: '180px' }}>
//                                     <img 
//                                         src={item.image} 
//                                         alt={item.name} 
//                                         className="img-responsive"
//                                         style={{ maxHeight: '260px', maxWidth: '280px', objectFit: 'contain', borderRadius: '0.5rem' }} 
//                                     />
//                                 </Col>
//                             )}
//                             <Col xs={12} lg={item.image ? 8 : 12} className="d-flex align-items-center">
//                                 <Card.Body className="w-100" style={{ padding: '2rem' }}>
//                                     <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap">
//                                         <div>
//                                             <Card.Title style={{ color: '#ffb347', fontWeight: 700, fontSize: '2rem', marginBottom: '0.5rem' }}>
//                                                 {item.name}
//                                             </Card.Title>
//                                             <Card.Subtitle className="mb-0">
//                                                 <span style={{ color: '#adb5bd' }}>Sold by: </span>
//                                                 <Link 
//                                                     to={`/stores/${storeId}`} 
//                                                     style={{ 
//                                                         color: '#ffb347', 
//                                                         textDecoration: 'none',
//                                                         fontWeight: 600
//                                                     }}
//                                                     onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//                                                     onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//                                                 >
//                                                     {store?.name}
//                                                 </Link>
//                                             </Card.Subtitle>
//                                         </div>
//                                         <Badge bg="secondary">{item.category}</Badge>
//                                     </div>
//                                     <Card.Text className="mb-3" style={{ fontSize: '1.5rem', color: '#28a745', fontWeight: 600 }}>
//                                         ${item.price}
//                                     </Card.Text>
//                                     <Card.Text className="mb-4">
//                                         {item.description}
//                                     </Card.Text>
//                                     {user && user._id === item.owner._id && (
//                                         <div className="d-flex gap-2">
//                                             <Button variant="outline-warning" onClick={handleEdit}>
//                                                 Edit
//                                             </Button>
//                                             <Button 
//                                                 variant="outline-danger" 
//                                                 onClick={handleDelete} 
//                                                 disabled={deleting}
//                                             >
//                                                 {deleting ? 'Deleting...' : 'Delete'}
//                                             </Button>
//                                         </div>
//                                     )}
//                                 </Card.Body>
//                             </Col>
//                         </Row>
//                     </Card>
//                 </Col>
//             </Row>

//             <hr className="bg-secondary" />
            
//             <Row className="justify-content-center">
//                 <Col xs={12}>
//                     <Card bg="dark" text="light" className="shadow-sm border-0">
//                         <Card.Header>
//                             <h3 style={{ color: '#ffb347', margin: 0 }}>Reviews</h3>
//                         </Card.Header>
//                         <Card.Body>
//                             {item.reviews?.length ? (
//                                 <div>
//                                     {item.reviews.map((review, idx) => (
//                                         <Card key={review._id || review.id || idx} bg="secondary" text="light" className="mb-3">
//                                             <Card.Body>
//                                                 {review.author?.username && (
//                                                     <Card.Subtitle className="mb-2 text-warning">
//                                                         {review.author.username}
//                                                     </Card.Subtitle>
//                                                 )}
//                                                 <div className="mb-2">
//                                                     <strong>Rating:</strong> {review.rating} ★
//                                                 </div>
//                                                 <Card.Text>{review.text}</Card.Text>
//                                             </Card.Body>
//                                         </Card>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <p>No reviews yet.</p>
//                             )}
//                             {user && (
//                                 <ReviewForm onReviewSubmit={fetchItem} />
//                             )}
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     )
// }

// export default ItemDetails

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import * as categoryService from '../../services/categoryService' // was storeService
import * as sessionService from '../../services/sessionService.js' // was itemService

const SessionDetails = ({ user }) => {
  const { categoryId, sessionId } = useParams()
  const [session, setSession] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSession = async () => {
      const categoryData = await categoryService.show(categoryId)
      const foundSession = categoryData.sessions.find(s => s.id === parseInt(sessionId))
      setSession(foundSession)
    }
    fetchSession()
  }, [categoryId, sessionId])

  const handleEdit = () => {
    navigate(`/categories/${categoryId}/sessions/${sessionId}/edit`)
  }

  const handleDelete = async () => {
    setDeleting(true)
    await sessionService.deleteSession(categoryId, sessionId)
    setDeleting(false)
    navigate(`/categories/${categoryId}/sessions`)
  }

  if (!session) return <h2>Loading...</h2>

  return (
    <main>
      <h1>{session.name}</h1>

      {session.image && <img src={session.image} alt={session.name} />}
      
      <p><strong>Description:</strong> {session.description}</p>
      <p><strong>Duration:</strong> {session.duration_minutes} minutes</p>
      <p><strong>Capacity:</strong> {session.capacity}</p>
      <p><strong>Start Time:</strong> {new Date(session.start_time).toLocaleString()}</p>
      <p><strong>End Time:</strong> {new Date(session.end_time).toLocaleString()}</p>

      {user && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleEdit} style={{ marginRight: '0.5rem' }}>Edit</button>
          <button onClick={handleDelete} style={{ color: 'red' }} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
      {user && user.is_admin && (
          <div>
            {/* <Link to={`/categories/${categoryId}/sessions/${sessionId}/edit`}>Edit</Link> */}
            <button onClick={() => handleDeleteCategory(sessionId)}>Delete</button>
          </div>
        )}
    </main>
  )
}

export default SessionDetails
