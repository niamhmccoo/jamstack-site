import React from 'react';
import { Link } from 'gatsby';
import { IdentityContextProvider } from 'react-netlify-identity-widget';
import './layout.css';

const Layout = ({ children }) => (
	// Point the context provider to a working netlify site that has identity enabled,
	// so we'll have to deploy this site in order to get the auth working
	<IdentityContextProvider url='https://jamstack-intro-auth.netlify.com'>
		<header>
			<Link to='/'>JAMStack App</Link>
		</header>
		<main>{children}</main>
	</IdentityContextProvider>
);

export default Layout;
