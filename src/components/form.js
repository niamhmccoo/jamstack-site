import React, { useReducer } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
	border: 1px solid #ddd;
	border-radius: 0.25rem;
	display: block;
	margin: 0.75rem auto 0;
	max-width: 500px;
	padding: 1rem;

	label,
	input,
	textarea {
		display: block;
		font-family: sans-serif;
	}

	label {
		font-size: 0.75rem;
		letter-spacing: 0.1rem;
		text-transform: uppercase;
	}

	input,
	textarea {
		border: 1px solid #ddd;
		border-radius: 0.25rem;
		font-size: 1rem;
		margin-bottom: 0.75rem;
		padding: 0.25rem;
		width: 100%;
	}

	button {
		background-color: darkblue;
		border: 1px solid darkblue;
		border-radius: 0.25rem;
		color: white;
		cursor: pointer;
		display: block;
		font-size: 1.25rem;
	}
`;

const INITIAL_STATE = {
	name: '',
	email: '',
	subject: '',
	body: '',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'updateFieldValue':
			return { ...state, [action.field]: action.value };
		default:
			return INITIAL_STATE;
	}
};

const Form = () => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	// currying: instead of creating a function with 2 args, we call it with the 1st arg
	// and return another function that accepts the 2nd arg
	const updateFieldValue = (field) => (event) => {
		dispatch({
			type: 'updateFieldValue',
			field,
			value: event.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	// TODO: send the message
	console.log(state);
	return (
		<StyledForm onSubmit={handleSubmit}>
			<label>
				Name
				<input
					type='text'
					name='name'
					value={state.name}
					onChange={updateFieldValue('name')}
				/>
			</label>
			<label>
				Email
				<input
					type='email'
					name='email'
					value={state.email}
					onChange={updateFieldValue('email')}
				/>
			</label>
			<label>
				Subject
				<input
					type='text'
					name='subject'
					value={state.subject}
					onChange={updateFieldValue('subject')}
				/>
			</label>
			<label>
				Body
				<textarea
					name='body'
					value={state.body}
					onChange={updateFieldValue('body')}
				/>
			</label>
			<button>Send</button>
		</StyledForm>
	);
};

export default Form;
