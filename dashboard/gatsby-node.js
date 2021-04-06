// to get the dashboard to respect the client-side routes in gatsby we need to
// use the onCreatePage API hook, which gatsby will run
// it'll take the page we're creating, & the actions we want to perform on that page
exports.onCreatePage = ({ page, actions }) => {
	if (page.path.match(/^\/dashboard/)) {
		page.matchPath = '/dashboard/*';
		actions.createPage(page);
	}
};
