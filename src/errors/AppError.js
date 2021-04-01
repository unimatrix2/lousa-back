class AppError extends Error {
	constructor(params = {}) {
		super();
		this.message = params.message || 'An error has occured. Try again later';
		this.type = params.type || 'Server Error';
		this.status = params.status || 500;
	}
}

export default AppError;
