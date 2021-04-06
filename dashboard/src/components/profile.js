import React from 'react';
import { Link } from 'gatsby';

const Profile = () => {
	return (
		<div className='dashboard-header'>
			<nav>
				{/* activeClassName is a conencience method to specify how the links look 
                when visiting a partiular link, so we don't have to add that logic ourselves */}
				<Link to='/dashboard/secret' activeClassName='active'>
					Secret stuff
				</Link>
				<Link to='/dashboard/base' activeClassName='active'>
					See your base
				</Link>
			</nav>
			<span> TODO: show login status</span>
		</div>
	);
};

export default Profile;
