import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import UserStatsCard from './UserStatsCard';

const Leaderboard = (props) => {
	return (
		<Fragment>
			<h2 className='text-center my-3'>Leaderboard</h2>
			{props.userIDs.map((id) => (
				<UserStatsCard key={id} id={id} />
			))}
		</Fragment>
	);
};

const mapStateToProps = ({ users }) => {
	const sortedUserIDs = Object.keys(users).sort((idA, idB) => {
		const scoreA =
			Object.keys(users[idA].answers).length + users[idA].questions.length;
		const scoreB =
			Object.keys(users[idB].answers).length + users[idB].questions.length;
		return scoreB - scoreA;
	});
	return {
		userIDs: sortedUserIDs,
	};
};

export default connect(mapStateToProps)(Leaderboard);
