import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<Fragment>
			<h1 className='display3 text-center'>404 Error</h1>
			<h1 className='display4 text-center'>
				<Link to='/'>Return to Home Page</Link>
			</h1>
		</Fragment>
	);
};

export default PageNotFound;
