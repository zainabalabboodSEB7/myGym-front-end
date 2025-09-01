
// import { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import * as sessionService from '../../services/sessionService.js'

// const SessionList = ({ user }) => {
//     const { categoryId } = useParams()
//     const [sessions, setSessions] = useState([])
//     const navigate = useNavigate()

//     useEffect(() => {
//         sessionService.index(categoryId).then(data => setSessions(data || []))
//     }, [categoryId])

//     return (
//         <main className="session-list-container">
//             <h1 className="session-list-title">Session List</h1>

//             {user && (
//                 <div className="session-list-actions">
//                     <button
//                         className="add-session-button"
//                         onClick={() => navigate(`/categories/${categoryId}/sessions/new`)}
//                     >
//                         Add New Session
//                     </button>
//                 </div>
//             )}

//             {sessions.length > 0 ? (
//                 <div className="session-grid">
//                     {sessions.map(session => (
//                     //   <Link to={`/categories/${category.id}/sessions/${session._id}`} key={category.id}>
//                         <div
//                             key={session._id}
//                             className="session-card"
//                             onClick={() => navigate(`/categories/${categoryId}/sessions/${session._id}`)}
//                         >
//                             <h3 className="session-name">{session.name}</h3>
//                             {/* {session.description && <p className="session-description">{session.description}</p>} */}

//                             <p><strong>Description:</strong> {session.description}</p>
//                             {/* <p><strong>Duration:</strong> {session.duration_minutes} minutes</p>
//                             <p><strong>Capacity:</strong> {session.capacity}</p>
//                             <p><strong>Start:</strong> {new Date(session.start_time).toLocaleString()}</p>
//                             <p><strong>End:</strong> {new Date(session.end_time).toLocaleString()}</p> */}
//                         </div>
                        
//                         // </Link>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="no-sessions-message">No sessions found.</p>
//             )}
//         </main>
//     )
// }

// export default SessionList

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
              {/* Uncomment below if you want to show more details */}
              {/* <p><strong>Duration:</strong> {session.duration_minutes} minutes</p>
              <p><strong>Capacity:</strong> {session.capacity}</p>
              <p><strong>Start:</strong> {new Date(session.start_time).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(session.end_time).toLocaleString()}</p> */}
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
