import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { handleSaveAnswer } from '../actions/questions';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const withRouter = (Component) => {
	const ComponentWithRouterProp = (props) => {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	};
	return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
	const navigate = useNavigate();
	const question = props.question;

	if (question === null) {
		return (
			<Fragment>
				<p>This question does not exist!</p>
				<form action='/' method='get'>
					<button>Please Go Back</button>
				</form>
			</Fragment>
		);
	}

	const {
		name,
		avatarURL,
		optionOneText,
		optionTwoText,
		hasAnswered,
		selectedVote,
		totalVotes,
		percentOptionOne,
		percentOptionTwo,
	} = question;

	const handleClick = (value) => {
		const { dispatch, qid } = props;
		dispatch(handleSaveAnswer(qid, value));
		navigate('/questions/' + qid);
	};

	return (
		<Fragment>
			<Container fluid className='my-5 p-3'>
				<Image
					src={avatarURL}
					alt='user-avatar'
					roundedCircle
					width='100'
					className='mx-auto d-block'
				/>
				<h3 className='text-center my-4 p-3'>{name} wants to know... </h3>
			</Container>
			<Container fluid>
				{!hasAnswered ? (
					<Container fluid>
						<Row className='justify-content-center'>
							<Col xs={12} md={6}>
								<Card className='my-3 p-4'>
									<Card.Header className='text-center display-6'>
										Would you rather...
									</Card.Header>
									<Card.Body className='d-flex-column align-items-center'>
										<p className='fw-bold'>{optionOneText}</p>
										<Button onClick={() => handleClick('optionOne')}>
											Choose Option 1
										</Button>
										<hr />
										<p className='fw-bold'>{optionTwoText}</p>
										<Button onClick={() => handleClick('optionTwo')}>
											Choose Option 2
										</Button>
									</Card.Body>
								</Card>
								<Container fluid className='my-5 d-flex justify-content-center'>
									<Link to='/'>
										<Button variant='primary' className=' btn-lg p-2'>
											Back to Home
										</Button>
									</Link>
								</Container>
							</Col>
						</Row>
					</Container>
				) : (
					<Container fluid>
						<Card className='answered-question w-75 mx-auto'>
							<Card.Header className='fw-bold fs-4 card-header'>
								You have already answered this question.
							</Card.Header>
							<Card.Body>
								<p className='fs-5'>{selectedVote}</p>
								<Button disabled className='fs-4'>
									Vote
								</Button>

								<hr />
								<h4 className='p-2 fw-bold'>Current vote split:</h4>
								<Container
									fluid
									className='d-flex-column justify-content-between align-items-center'>
									<div className='percent-card d-flex justify-content-between align-items-center w-100 mx-auto'>
										<p className='fs-6'>{optionOneText}</p>
										<p className='fs-6'>{percentOptionOne} %</p>
									</div>
									<div className='percent-card d-flex justify-content-between align-items-center mx-auto w-100'>
										<p className='fs-6'>{optionTwoText}</p>
										<p className='fs-6'>{percentOptionTwo} %</p>
									</div>
								</Container>
								<hr />
								<Container
									fluid
									className='d-flex justify-content-between align-items-center'>
									<h4 className='fw-bold'>Total votes: </h4>
									<p className='fs-5'>{totalVotes} votes </p>
								</Container>
							</Card.Body>
						</Card>
						<Container fluid className='my-5 d-flex justify-content-center'>
							<Link to='/'>
								<Button variant='primary' className=' btn-lg p-2'>
									Back to Home
								</Button>
							</Link>
						</Container>
					</Container>
				)}
			</Container>
		</Fragment>
	);
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
	const { id } = props.router.params;
	const question = questions[id];

	return {
		authedUser,
		qid: id,
		question: question
			? formatQuestion(question, users[question.author], authedUser)
			: null,
	};
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
