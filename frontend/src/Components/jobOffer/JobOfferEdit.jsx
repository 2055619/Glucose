import React, {useState, useEffect} from 'react'

function JobOfferEdit({jobOfferToEdit, onUpdateJobOffer}){
	const [formData, setFormData] = useState({...jobOfferToEdit})

	useEffect(() => {
		setFormData({...jobOfferToEdit})
	}, [jobOfferToEdit])

	const handleChange = (e) => {
		const {name, value} = e.target
		setFormData({...formData, [name]: value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onUpdateJobOffer(formData)
	}

	return (
		<div>
			<h1>Edit Job Offer</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="PositionTitle">Position Title:</label>
					<input
						type="text"
						id="PositionTitle"
						name="PositionTitle"
						value={formData.PositionTitle}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="Department">Department:</label>
					<input
						type="text"
						id="Department"
						name="Department"
						value={formData.Department}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="Location">Location:</label>
					<input
						type="text"
						id="Location"
						name="Location"
						value={formData.Location}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="Description">Description:</label>
					<textarea
						id="Description"
						name="Description"
						value={formData.Description}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="Salary">Salary:</label>
					<input
						type="text"
						id="Salary"
						name="Salary"
						value={formData.Salary}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="Formation">Formation:</label>
					<input
						type="text"
						id="Formation"
						name="Formation"
						value={formData.Formation}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="dueDate">Due Date:</label>
					<input
						type="date"
						id="dueDate"
						name="dueDate"
						value={formData.dueDate}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="ExpirationDate">Expiration Date:</label>
					<input
						type="date"
						id="ExpirationDate"
						name="ExpirationDate"
						value={formData.ExpirationDate}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<button type="submit">Update Job Offer</button>
				</div>
			</form>
		</div>
	)
}

export default JobOfferEdit
