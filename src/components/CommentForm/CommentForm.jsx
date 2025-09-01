import { useState, useEffect } from 'react'



const CommentForm = (props) => {
  	const initialState = { comment: '' }
	const [formData, setFormData] = useState(initialState)

	useEffect(() => {
        if (props.initialText) {
            setFormData({ comment: props.initialText });
        } else {
            setFormData(initialState);
        }
    }, [props.initialText]);
	
	const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

	const handleSubmit = async(evt) => {
		evt.preventDefault()
		await props.handleAddComment(formData)
		setFormData({ comment: '' })
	}

	return (
		<form  className="com-form" onSubmit={handleSubmit}>
			<div className="col-26">

				<label htmlFor="text-input">Your comment:</label>
			</div>
			<div className="col-75">

				<textarea 
				required
				className='text-comment'
				type="text"
				name="comment"
				id="text-input"
				value={formData.comment}
				onChange={handleChange}
				/>
			</div>
			<button type="submit">SUBMIT COMMENT</button>
		</form>
	)
}

export default CommentForm