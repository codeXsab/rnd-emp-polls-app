import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import UserCard from './UserCard';

const Home = (props) => {
	const { answered, unanswered, users } = props;

	return (
		<Fragment>
			<Container fluid className='m-auto w-75 pt-5'>
				<Row>
					<Col>
						<Tabs>
							<Tab
								eventKey='unanswered'
								title='Unanswered Questions'
								className='border border-1 border-info'>
								<Container className='answered-questions'>
									<Row className='m-auto w-100'>
										<Col>
											{unanswered.length
												? unanswered.map((question) => (
														<UserCard
															key={question.id}
															id={question.id}
															question={question.id}
															user={users[question.author]}
														/>
												  ))
												: ''}
										</Col>
									</Row>
								</Container>
							</Tab>
							<Tab
								eventKey='answered'
								title='Answered Questions'
								className='border border-1 border-info'>
								<Container className='unanswered-questions'>
									<Row className='m-auto w-100'>
										<Col>
											{answered.length
												? answered.map((question) => (
														<UserCard
															key={question.id}
															id={question.id}
															question={question.id}
															user={users[question.author]}
															//answered={true}
														/>
												  ))
												: ''}
										</Col>
									</Row>
								</Container>
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

const mapStateToProps = ({ authedUser, questions, users }) => {
	const questionsList = Object.keys(questions).map(
		(question) => questions[question]
	);
	const answered = questionsList
		.filter(
			(question) =>
				question.optionOne.votes.includes(authedUser) ||
				question.optionTwo.votes.includes(authedUser)
		)
		.sort((a, b) => b.timestamp - a.timestamp);
	const unanswered = questionsList
		.filter((question) => !answered.includes(question))
		.sort((a, b) => b.timestamp - a.timestamp);
	return {
		questions,
		answered,
		unanswered,
		users,
	};
};

export default connect(mapStateToProps)(Home);
