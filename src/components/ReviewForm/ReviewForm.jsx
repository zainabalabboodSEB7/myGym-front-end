import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as sessionService from '../../services/sessionService'

const ReviewForm = ({ onReviewSubmit }) => {
    const [review, setReview] = useState('');
	const [rating, setRating] = useState(5);
	const { categoryId, sessionId } = useParams();
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
		e.preventDefault();
		if (!review.trim()) return;
		setSubmitting(true);
		setError(null);
		try {
			await sessionService.createReview(categoryId, sessionId, { content: review, rating });
			setReview('');
			setRating(5);
			if (onReviewSubmit) onReviewSubmit();
		} catch (err) {
			setError('Failed to submit review.');
		} finally {
			setSubmitting(false);
		}
	};

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
			<div>
				<label htmlFor="review">Review:</label>
				<textarea
					id="review"
					value={review}
					onChange={(e) => setReview(e.target.value)}
					required
					disabled={submitting}
				/>
			</div>
			<div>
				<label htmlFor="rating">Rating:</label>
				<select
					id="rating"
					value={rating}
					onChange={(e) => setRating(Number(e.target.value))}
					disabled={submitting}
				>
					{[1, 2, 3, 4, 5].map((num) => (
						<option key={num} value={num}>{num}</option>
					))}
				</select>
			</div>
			<button type="submit"   className="add-session-button"
 disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Review'}</button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</form>

    )
}

export default ReviewForm