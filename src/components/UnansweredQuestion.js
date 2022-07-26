import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { formatDate } from '../utils/helpers';
import { handleSaveAnswer } from '../actions/questions';
import Avatar from './Avatar';
import PageNotFound from './PageNotFound';

const UnansweredQuestion = (props) => {
	const [errorMsg, setErrorMsg] = useState('');

	const handleSubmit = (id, e) => {
		const answer = this.form.answer.value;
		const { dispatch } = props;
		e.preventDefault();

		if (answer !== '') {
			dispatch(handleSaveAnswer(id, answer));
		} else {
			setErrorMsg({ errorMsg: 'You must make a choice.' });
		}
	};

	const { question, author } = props;

	if (question === null) {
		return <PageNotFound />;
	}

	const { optionOne, optionTwo, timestamp, id } = question;
	const { name, avatarURL } = author;

	return (
		<Fragment>
			<Container>
				<Row className='justify-content-center'>
					<Col xs={12} md={6}>
						<Card bg='light' className='m-3'>
							<Card.Header>
								<Avatar avatarURL={avatarURL} className='mr-2' />
								{name} asks:
							</Card.Header>

							<Card.Body className='d-flex justify-content-center'>
								<Form
									onSubmit={(e) => handleSubmit(id, e)}
									ref={(f) => (this.form = f)}>
									{errorMsg ? <p className='text-danger'>{errorMsg}</p> : null}
									<Form.Check
										custom
										type='radio'
										id='optionOne'
										label={optionOne.text}
										value='optionOne'
										name='answer'
										className='mb-2'
									/>
									<Form.Check
										custom
										type='radio'
										id='optionTwo'
										label={optionTwo.text}
										value='optionTwo'
										name='answer'
										className='mb-2'
									/>
									<Button type='submit' variant='outline-dark'>
										Vote
									</Button>
								</Form>
							</Card.Body>
							<Card.Footer>
								<small className='text-muted'>{formatDate(timestamp)}</small>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

const mapStateToProps = ({ questions, users }, { id }) => {
	const question = questions[id];

	return {
		question: question ? question : null,
		author: question ? users[question.author] : null,
	};
};

export default connect(mapStateToProps)(UnansweredQuestion);
