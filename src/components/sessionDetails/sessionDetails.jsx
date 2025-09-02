import { useEffect, useState } from "react"
import * as categoryService from '../../services/categoryService'
import * as SessionService from '../../services/sessionService'
import { useParams, useNavigate, Link } from "react-router-dom"
import CommentForm from "../CommentForm/CommentForm"

const SessionDetails = ({ user, handleDeleteSession }) => {
    const { categoryId, sessionId } = useParams()
    const [session, setSession] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [ratings, setRatings] = useState([]);
    const navigate = useNavigate()

    const fetchAverageRating = async () => {
        try {
            const avgData = await gameService.getAverageRating(gameId);
            console.log("Fetched average rating:", avgData);
            setAverageRating(avgData);
        } catch (err) {
            console.error("Error fetching average rating:", err);
            setAverageRating(0);
        }
    };

    useEffect(() => {
        const fetchSession = async () => {
            const categoryData = await categoryService.show(categoryId)
            const foundSession = categoryData.sessions.find(s => s.id === parseInt(sessionId))
            setSession(foundSession)
        }
        fetchSession()
    }, [categoryId, sessionId])

    const handleAddComment = async (formData) => {
        const newComment = await SessionService.createComment({ comment: formData.comment }, sessionId);
        console.log("New comment added:", newComment);
        setSession((prevSession) => ({
  ...prevSession,
  comments: [...(prevSession.comments || []), newComment],
}));

    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment._id);
        setEditingText(comment.text);
    };

    const handleUpdateComment = async (formData) => {
        await gameService.updateComment({ comment: formData.comment }, gameId, editingCommentId);
        fetchGame(); 
        setEditingCommentId(null);
        setEditingText('');
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await gameService.deleteComment(gameId, commentId);
            setGame(prevGame => ({
                ...prevGame,
                comment: prevGame.comment.filter(c => c._id !== commentId)
            }));
        } catch (err) {
            console.error("Failed to delete comment:", err);
        }
    };

    const handleRateGame = async (rating) => {
        if (!user) return; 
        try {
            const response = await gameService.addRating(gameId, { user: user._id, value: rating });
            const avgRating = response.average;
            const ratings = response.ratings; 
            setAverageRating(avgRating);
            setRatings(ratings);
            setUserRating(rating); 
        } catch (error) {
            console.error("Error rating the game:", error);
        }
    };

    // 🔹 Replaced stars with happy faces
    const renderFaces = () => {
        return (
            <div>
                {[1, 2, 3, 4, 5].map((face) => (
                    <button
                        key={face}
                        onClick={() => setUserRating(face)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill={face <= (userRating || averageRating) ? "yellow" : "gray"}
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.285 12.433a.5.5 0 0 1 .683-.183A5.97 5.97 0 0 0 8 13c1.059 0 2.054-.27 2.932-.75a.5.5 0 1 1 .5.866A6.97 6.97 0 0 1 8 14a6.97 6.97 0 0 1-3.432-.884.5.5 0 0 1-.183-.683z"/>
                            <path d="M7 6.5C7 7.328 6.328 8 5.5 8S4 7.328 4 6.5 4.672 5 5.5 5 7 5.672 7 6.5zm4 0C11 7.328 10.328 8 9.5 8S8 7.328 8 6.5 8.672 5 9.5 5 11 5.672 11 6.5z"/>
                        </svg>
                    </button>
                ))}
                <p>Average Rating: {averageRating.toFixed(1)} 🙂</p>
                {user && userRating > 0 && <p>Your Rating: {userRating} 🙂</p>} 
            </div>
        );
    };

    if (!session) return <h2>Loading...</h2>

    return (
        <>
        <main>
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

        <div className="box">
            <section>
                <h2>Rating</h2>
                {renderFaces()}
            </section>
        </div>

         <div className="box">
            <section>
                <h2>Comments</h2>
                {(!session.comments || session.comments.length === 0) && <p>No comments.</p>}
                {session.comments && session.comments.map((comment) => (
                    editingCommentId === comment._id ? (
                        <CommentForm
                            key={comment._id}
                            initialText={editingText}
                            handleAddComment={handleUpdateComment}
                            submitLabel="Update"
                            handleCancel={() => setEditingCommentId(null)}
                        />
                    ) : (
                        <div key={comment._id}>
                            <p>
                                <b>{comment.author?.username || 'Unknown Author'}</b>: {comment.comment}
                            </p>
                            {user && comment.author?._id === user._id && (
                                <>
                                    <button onClick={() => handleEditComment(comment)}>Edit</button>
                                    <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                                </>
                            )}
                        </div>
                    )
                ))}
                {user && !editingCommentId && (
                    <CommentForm handleAddComment={handleAddComment} submitLabel="Add Comment" />
                )}
            </section>
        </div>

        
        </>
    )
}

export default SessionDetails
