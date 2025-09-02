import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as sessionService from '../../services/sessionService'

const SessionList = ({ user }) => {
  const { categoryId } = useParams()
  const [sessions, setSessions] = useState([])
  const navigate = useNavigate()

 useEffect(() => {
  if (!categoryId) return; 
  const fetchSessions = async () => {
    try {
      const data = await sessionService.index(categoryId);
      setSessions(data || []);
    } catch (err) {
      console.error('Failed to fetch sessions', err);
    }
  };
  fetchSessions();
}, [categoryId]);


  return (
    <main className="session-list-container">
      <h1 className="session-list-title">Session List</h1>

      {user && (
        <div className="session-list-actions">
          <button
            className="add-session-button"
            onClick={() => navigate(`/categories/${categoryId}/sessions/new`)}
          >
            Add New Session
          </button>
        </div>
      )}

      {sessions.length > 0 ? (
        <div className="session-grid">
          {sessions.map(session => (
            <div
              key={session.id}
              className="session-card"
              onClick={() => navigate(`/categories/${categoryId}/sessions/${session.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="session-name">{session.name}</h3>
              <p><strong>Description:</strong> {session.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-sessions-message">No sessions found.</p>
      )}
    </main>
  )
}

export default SessionList
