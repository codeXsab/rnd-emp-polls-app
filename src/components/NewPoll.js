import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import companyLogo from '../assets/companyavatar.png';

const NewPoll = ({ dispatch, authedUser }) => {
	const navigate = useNavigate();
	const [optionOne, setOptionOne] = useState('');
	const [optionTwo, setOptionTwo] = useState('');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const handleChangeOptionOne = (e) => {
		const text = e.target.value;
		setOptionOne(text);
	};

	const handleChangeOptionTwo = (e) => {
		const text = e.target.value;
		setOptionTwo(text);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			dispatch(handleSaveQuestion(optionOne, optionTwo));
			setSuccess(true);
			setError(false);
		} catch (e) {
			setSuccess(false);
			setError(false);
		}
		setOptionOne('');
		setOptionTwo('');
		navigate('/');
	};

	return (
		<Fragment>
			<Container fluid className='my-4 p-3'>
				<Image
					src={companyLogo}
					alt='user-avatar'
					roundedCircle
					className='mx-auto d-block'
					width='100'
					height='100'
				/>
				<h2 className='text-center my-2 p-3 fw-bold'>
					{' '}
					Create a New Poll Question{' '}
				</h2>
			</Container>
			<Container className='w-75  d-flex justify-content-center align-items-center'>
				{success && <h1 className={'Success'}>Name Submitted!</h1>}
				{error && <h1 className={'Error'}>Please enter both options.</h1>}
				<Card className='m-5 border-info'>
					<Card.Header as='h3' className='text-center bg-info fw-bold'>
						Would You Rather...
					</Card.Header>
					<Card.Body>
						<Form
							name='question-form'
							className='new-question row'
							onSubmit={handleSubmit}>
							<Form.Label
								className='large-label p-2 fw-bold'
								htmlFor='optionOneValue'>
								First Choice
								<InputGroup>
									<Form.Control
										placeholder='Option one'
										onChange={handleChangeOptionOne}
										value={optionOne}
										name='optionOneValue'
										className='border-info'
									/>
								</InputGroup>
							</Form.Label>
							<Form.Label
								className='large-label p-2 fw-bold'
								htmlFor='optionTwoValue'>
								Second Choice
								<InputGroup>
									<Form.Control
										placeholder='Option two'
										onChange={handleChangeOptionTwo}
										value={optionTwo}
										name='optionTwoValue'
										className='border-info'
									/>
								</InputGroup>
							</Form.Label>
							<div className='p-3'>
								<Button
									type='submit'
									className='col-6 offset-3 p-2 btn-warning'>
									Submit
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		</Fragment>
	);
};

const mapStateToProps = ({ authedUser }) => {
	return {
		authedUser,
	};
};

export default connect(mapStateToProps)(NewPoll);
