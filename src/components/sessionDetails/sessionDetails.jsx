import { useEffect, useState } from "react"
import * as categoryService from '../../services/categoryService'
import * as sessionService from '../../services/sessionService'
import { useParams, useNavigate, Link } from "react-router-dom"

import ReviewForm from "../ReviewForm/ReviewForm"
const SessionDetails = ({ user, handleDeleteSession }) => {
    const { categoryId, sessionId } = useParams()
    const [session, setSession] = useState(null)
     const navigate = useNavigate()
    const [deleting, setDeleting] = useState(false)

   
        const fetchSession = async () => {
            const categoryData = await categoryService.show(categoryId)
            const foundSession = categoryData.sessions.find(s => s.id === parseInt(sessionId))
            setSession(foundSession)
        }

        useEffect(() => {
        fetchSession()
    }, [categoryId, sessionId])



    const handleEdit = () => {
        navigate(`/categories/${categoryId}/sessions/${sessionId}/edit`)
    }


    const handleDelete = async () => {
        setDeleting(true)
        await sessionService.deleteSession(categoryId, sessionId)
        setDeleting(false);
        navigate(`/categories/${categoryId}`)
    }

    if (!session) return <h2>Loading...</h2>

    return (
      <>
        <main>
          <h1>{session.name}</h1>
          <p>
            <strong>Description:</strong> {session.description}
          </p>
          <p>
            <strong>Duration:</strong> {session.duration_minutes} minutes
          </p>
          <p>
            <strong>Capacity:</strong> {session.capacity}
          </p>
          <p>
            <strong>Start Time:</strong>{" "}
            {new Date(session.start_time).toLocaleString()}
          </p>
          <p>
            <strong>End Time:</strong>{" "}
            {new Date(session.end_time).toLocaleString()}
          </p>
          {user && user.is_admin && (
            <div style={{ marginTop: '1rem' }}>
                    <button onClick={handleEdit} style={{ marginRight: '0.5rem' }}>Edit</button>
                    <button onClick={handleDelete} style={{ color: 'red' }} disabled={deleting}>
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
          )}
          <section>
            <h2>Reviews</h2>
            {session.reviews?.length ? (
              <ul>
                {" "}
                {session.reviews.map((review, idx) => (
                  <li key={review.id || idx}>
                    <p>
                      <strong>Author: </strong>
                      {review.user.username}
                    </p>
                    <strong>Rating:</strong> {review.rating} ★<br />
                    <p>
                      <strong>Review: </strong>
                      {review.content}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
            <ReviewForm onReviewSubmit={fetchSession}/>
          </section>
        </main>
      </>
    );
}

export default SessionDetails