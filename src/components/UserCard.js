import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { formatDate } from '../utils/helpers';
import Avatar from './Avatar';


const UserCard = (props) => {
	const { question, author } = props;
	const { optionOne, timestamp, id } = question;
	const { name } = author;

	return (
		<Fragment>
			<Container>
				<Row className='justify-content-center'>
					<Col xs={12} md={6}>
						<Card bg='light' className='border border-2 border-info m-3'>
							<Card.Header className='text-left m-2 p-2 bg-info'>
								<Avatar avatarURL={author.avatarURL} className='m-2' />
								{name}
							</Card.Header>
							<Card.Body className='text-center'>
								<Card.Text>{optionOne.text.slice(0, 50)}...?</Card.Text>

								<Link to={`/questions/${id}`}>
									<Button variant='warning'>Show Details</Button>
								</Link>
							</Card.Body>
							<Card.Footer className='bg-info'>
								<small className='text-muted '>{formatDate(timestamp)}</small>
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

export default connect(mapStateToProps)(UserCard);
