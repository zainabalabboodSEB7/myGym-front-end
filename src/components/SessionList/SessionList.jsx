

// import { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import * as sessionService from '../../services/sessionService.js'

// const SessionList = ({ user, categoryOwner }) => {
//   const { categoryId } = useParams()
//   const [sessions, setSessions] = useState([])
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (categoryId) {
//       sessionService.index(categoryId).then(data => setSessions(data || []))
//     }
//   }, [categoryId])

//   return (
//     <div className="session-list-container">
//       <h1 className="session-list-title">Session List</h1>

//       {user && categoryOwner && user._id === categoryOwner._id && (
//         <div className="add-session-button-wrapper">
//           <button
//             className="add-session-button"
//             onClick={() => navigate(`/categories/${categoryId}/sessions/new`)}
//           >
//             Add New Session
//           </button>
//         </div>
//       )}

//       {sessions.length > 0 ? (
//         <div className="session-grid">
//           {sessions.map(session => (
//             <div
//               key={session._id}
//               className="session-card"
//               onClick={() => navigate(`/categories/${categoryId}/sessions/${session._id}`)}
//             >
//               {session.image && (
//                 <div className="session-image-wrapper">
//                   <img
//                     src={session.image}
//                     alt={session.name}
//                     className="session-image"
//                   />
//                 </div>
//               )}

//               <div className="session-content">
//                 <h3 className="session-name">{session.name}</h3>
//                 {/* <p className="session-price"><strong>Price:</strong> ${session.price}</p> */}
//                 <small className="session-category">{session.category}</small>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="no-sessions-message">No sessions found.</p>
//       )}
//     </div>
//   )
// }

// export default SessionList

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as sessionService from '../../services/sessionService.js'

const SessionList = ({ user }) => {
    const { categoryId } = useParams()
    const [sessions, setSessions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        sessionService.index(categoryId).then(data => setSessions(data || []))
    }, [categoryId])

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
                            key={session._id}
                            className="session-card"
                            onClick={() => navigate(`/categories/${categoryId}/sessions/${session._id}`)}
                        >
                            <h3 className="session-name">{session.name}</h3>
                            {/* {session.description && <p className="session-description">{session.description}</p>} */}

                            <p><strong>Description:</strong> {session.description}</p>
                            <p><strong>Duration:</strong> {session.duration_minutes} minutes</p>
                            <p><strong>Capacity:</strong> {session.capacity}</p>
                            <p><strong>Start:</strong> {new Date(session.start_time).toLocaleString()}</p>
                            <p><strong>End:</strong> {new Date(session.end_time).toLocaleString()}</p>
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
