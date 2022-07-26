//import { saveQuestionAnswer } from '../utils/api';
//import { addAnswer } from './questions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_QUESTION_TO_USER = 'SAVE_QUESTION_TO_USER';
export const SAVE_ANSWER_TO_USER = 'SAVE_ANSWER_TO_USER';

export function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		users,
	};
}

export function saveAnswerToUser({ authedUser, qid, answer }) {
	return {
		type: SAVE_ANSWER_TO_USER,
		authedUser,
		qid,
		answer,
	};
}

/*export function handleSaveQuestionAnswer(authedUser, qid, answer) {
	return (dispatch) => {
		dispatch(addAnswerToUser(authedUser, qid, answer));
		dispatch(addAnswer(authedUser, qid, answer));

		return saveQuestionAnswer(authedUser, qid, answer).catch((e) => {
			console.warn('Error in handleSaveQuestionAnswer:', e);
		});
	};
}
*/

export function saveQuestionToUser(question) {
	return {
		type: SAVE_QUESTION_TO_USER,
		question,
	};
}
