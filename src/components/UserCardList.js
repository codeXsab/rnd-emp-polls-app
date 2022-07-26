import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserCard from './UserCard';

const UserCardList = (props) => {
	const { idsList, listNote } = props;

	return (
		<Fragment>
			<Container>
				<Row>
					<Col>
						<h2 className='text-center my-3'>
							<small>Would You Rather...</small>
						</h2>
						{idsList.length ? (
							idsList.map((id) => <UserCard key={id} id={id} />)
						) : (
							<p className='text-center'>{listNote}</p>
						)}
					</Col>
				</Row>
			</Container>
		</Fragment>
	);

}

export default UserCardList;