export function formatDate(timestamp) {
	const d = new Date(timestamp);
	const time = d.toLocaleTimeString('en-US');
	return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function formatQuestion(question, author, authedUser) {
	let hasAnswered = false;
	let isAuthor = false;
	let selectedVote = '';

	const {
		id,
		optionOne: {
			// eslint-disable-next-line
			votes: [],
			text: optionOneText,
		},
		optionTwo: {
			// eslint-disable-next-line
			votes: [],
			text: optionTwoText,
		},
		timestamp,
	} = question;

	if (
		question.optionOne.votes.includes(authedUser) ||
		question.optionTwo.votes.includes(authedUser)
	) {
		hasAnswered = true;
		if (question.optionOne.votes.includes(authedUser)) {
			selectedVote = question.optionOne.text;
		} else if (question.optionTwo.votes.includes(authedUser)) {
			selectedVote = question.optionTwo.text;
		}
	}

	if (author === authedUser) {
		isAuthor = true;
	}

	const length1 = question.optionOne.votes.length;
	const length2 = question.optionTwo.votes.length;
	const totalVotes = length1 + length2;
	const percentOptionOne = Math.round((length1 / totalVotes) * 100);
	const percentOptionTwo = Math.round((length2 / totalVotes) * 100);

	return {
		id,
		timestamp,
		name: author.name,
		avatarURL: author.avatarURL,
		optionOneText,
		optionTwoText,
		hasAnswered,
		selectedVote,
		isAuthor,
		totalVotes,
		percentOptionOne,
		percentOptionTwo,
	};
}

// JP Reference
/*export function formatQuestion(questions, author, authedUser) {
	const { id, timestamp, optionOne, optionTwo } = questions;
	const { name, avatarURL } = author;

	let answer = null;
	if (optionOne.votes.includes(authedUser)) {
		answer = 'optionOne';
	} else if (optionTwo.votes.includes(authedUser)) {
		answer = 'optionTwo';
	}

	return {
		author: name,
		id,
		timestamp,
		avatar: avatarURL,
		optionOne: {
			votes: optionOne.votes,
			text: optionOne.text,
		},
		optionTwo: {
			votes: optionTwo.votes,
			text: optionTwo.text,
		},
		hasAnswered:
			optionOne.votes.includes(authedUser) ||
			optionTwo.votes.includes(authedUser),
		answer: answer,
	};
}
*/
