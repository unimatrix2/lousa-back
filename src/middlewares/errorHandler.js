/* eslint-disable no-console */

const handle404 = (req, res) => {
	res.status(404).json({
		name: 'Page404',
		url: req.url,
		message: 'Service not found',
		status: 404,
	});
};

export default handle404;
