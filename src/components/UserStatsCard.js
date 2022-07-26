import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Avatar from './Avatar';

const UserStatsCard = (props) => {
	const { user } = props;
	const { name, avatarURL, answers, questions } = user;

	return (
		<Fragment>
			<Container>
				<Row className='justify-content-center'>
					<Col xs={12} md={6}>
						<Card bg='light' className='m-3'>
							<Card.Header className='text-left m-2 p-2 bg-info'>
								<Avatar avatarURL={avatarURL} className='mr-2' />
								{name}
							</Card.Header>
							<Card.Body className='d-flex justify-content-center'>
								<Card.Text>
									Answered Questions: {Object.keys(answers).length}
									<br />
									Created Questions: {questions.length}
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								Score: {Object.keys(answers).length + questions.length}
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

const mapStateToProps = ({ users }, { id }) => {
	return {
		user: users[id],
	};
};

export default connect(mapStateToProps)(UserStatsCard);
