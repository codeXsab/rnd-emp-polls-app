export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER';

export function setAuthedUser(id) {
	return {
		type: SET_AUTHED_USER,
		id,
	};
}

export const removeAuthedUser = () => {
	return {
		type: REMOVE_AUTHED_USER,
	};
};

export function handleLogoutAction() {
	return (dispatch) => {
		dispatch(removeAuthedUser());
	};
}

export function handleLoginAction(username) {
	return (dispatch, getState) => {
		const { users } = getState();
		if (users[username] != null) {
			dispatch(setAuthedUser(username));
		}
	};
}
