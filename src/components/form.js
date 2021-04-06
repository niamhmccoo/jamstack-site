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

const SentMsg = styled.p`
	border-radius: right 0.25rem;
	display: block;
	margin: 0.75rem auto 0;
	max-width: width 500px;
	text-align: center;
`;

const SuccessWrap = styled.div`
	button {
		display: block;
		margin: 1rem auto;
	}
`;

const PendingForm = styled(StyledForm)`
	&::before {
		background: white;
		border-radius: 0.25rem;
		content: '';
		height: 100vh;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.85;
	}

	&::after {
		content: 'Sending...';
		margin: 0 auto;
		color: black;
		display: block;
		height: 6rem;
		width: 6rem;
		position: relative;
	}
`;

const INITIAL_STATE = {
	name: '',
	email: '',
	subject: '',
	body: '',
	status: 'IDLE',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'updateFieldValue':
			return { ...state, [action.field]: action.value };
		case 'updateStatus':
			return { ...state, status: action.status };
		case 'reset':
		default:
			return INITIAL_STATE;
	}
};

const Form = () => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	// this'll take a status field value & dispatch a type of 'updateStatus' & send the new status as its value
	const setStatus = (status) => dispatch({ type: 'updateStatus', status });

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
		setStatus('PENDING');

		// using our own functions endpoint
		// what we'll get back will be whatever we return from our contact function
		fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify(state),
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setStatus('SUCCESS');
			})
			.catch((error) => {
				console.log(error);
				setStatus('ERROR');
			});
	};

	if (state.status === 'SUCCESS') {
		return (
			<SuccessWrap>
				<SentMsg>Message sent!</SentMsg>
				<button type='reset' onClick={() => dispatch({ type: 'reset' })}>
					Reset
				</button>
			</SuccessWrap>
		);
	}

	return (
		<>
			{state.status === 'ERROR' && (
				<SentMsg>Something went wrong. Please try again.</SentMsg>
			)}
			{state.status === 'PENDING' ? (
				<PendingForm />
			) : (
				<StyledForm onSubmit={handleSubmit} data-netlify='true'>
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
			)}
		</>
	);
};

export default Form;
