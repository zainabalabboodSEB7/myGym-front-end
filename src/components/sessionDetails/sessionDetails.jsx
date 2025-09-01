import { useEffect, useState } from "react"
import * as categoryService from '../../services/categoryService'
import * as SessionService from '../../services/sessionService'
import { useParams, useNavigate, Link } from "react-router-dom"

const SessionDetails = ({ user, handleDeleteSession }) => {
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

    if (!session) return <h2>Loading...</h2>

    return (
        <main>
            {/* <h1>its working</h1> */}
            <h1>{session.name}</h1>
            <p><strong>Description:</strong> {session.description}</p>
            <p><strong>Duration:</strong> {session.duration_minutes} minutes</p>
            <p><strong>Capacity:</strong> {session.capacity}</p>
            <p><strong>Start Time:</strong> {new Date(session.start_time).toLocaleString()}</p>
            <p><strong>End Time:</strong> {new Date(session.end_time).toLocaleString()}</p>
            {user && user.is_admin && (
                <div>
                    <Link to={`/categories/${categoryId}/sessions/${sessionId}/edit`}>Edit</Link>
                    <button onClick={() => handleDeleteSession(categoryId, sessionId)}>Delete</button>
                </div>
            )}



        </main>


    )
}

export default SessionDetails