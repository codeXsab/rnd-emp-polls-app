import {
	_getUsers,
	_getQuestions,
	_saveQuestionAnswer,
	_saveQuestion,
	formatQuestion
} from './_DATA.js';

export const getInitialData = () => {
	return Promise.all([_getUsers(), _getQuestions()]).then(
		([users, questions]) => ({
			users,
			questions,
		})
	);
};

export const saveQuestion = (question) => {
	return _saveQuestion(question);
};

export const saveQuestionAnswer = ( info ) => {
	// console.log('info', {authedUser, qid, answer});
	return _saveQuestionAnswer(info);
};

export function formatNewQuestion(info) {
	return formatQuestion(info)
}