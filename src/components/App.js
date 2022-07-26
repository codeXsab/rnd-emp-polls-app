import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect, Fragment } from 'react';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import Login from './Login';
import Navigation from './Navigation';
import Home from './Home';
import NewPoll from './NewPoll';
import QuestionPage from './QuestionPage';
import Leaderboard from './Leaderboard';
import PageNotFound from './PageNotFound';
import '../App.css';

const App = (props) => {
	useEffect(() => {
		props.dispatch(handleInitialData());
	}, [props, props.authedUser]);

	if (props.authedUser === null) {
		return <Login />;
	}

	return (
		<Fragment>
			<div className='App'>
				<Navigation />
				<LoadingBar />
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/questions/:id' element={<QuestionPage />} />
					<Route exact path='/new' element={<NewPoll />} />
					<Route exact path='/leaderboard' element={<Leaderboard />} />
					<Route path='*' element={<PageNotFound />} />
					<Route exact path='/login' element={<Login />} />
				</Routes>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	authedUser: state.authedUser,
});

export default connect(mapStateToProps)(App);
