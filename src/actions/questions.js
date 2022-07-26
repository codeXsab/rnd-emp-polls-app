import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { saveQuestionToUser, saveAnswerToUser } from './users';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

export function addAnswer({ qid, answer, authedUser }) {
	return {
		type: ADD_ANSWER,
		qid,
		answer,
		authedUser,
	};
}

export function handleSaveQuestion(optionOne, optionTwo) {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		dispatch(showLoading());
		return saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: authedUser,
		})
			.then((question) => {
				dispatch(addQuestion(question));
				dispatch(saveQuestionToUser(question));
				dispatch(hideLoading());
			})
			.catch(function () {
				console.log('rejected');
			});
	};
}

export function handleSaveAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		dispatch(showLoading());
		return saveQuestionAnswer({
			authedUser,
			qid,
			answer,
		}).then(() => {
			dispatch(addAnswer({ authedUser, qid, answer }));
			dispatch(saveAnswerToUser({ authedUser, qid, answer }));
			dispatch(hideLoading());
		});
	};
}
