import React from 'react';
import Image from 'react-bootstrap/Image';

const Avatar = (props) => {
	return (
		<Image
			src={props.avatarURL}
			roundedCircle
			fluid
			width='40'
			height='40'
			alt='user avatar'
			className={props.className}
		/>
	);
};

export default Avatar;
