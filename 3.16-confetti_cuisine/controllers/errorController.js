const httpStatus = require('http-status-codes');

exports.pageNotFoundError = (req, res) => {
    const errorCode = httpStatus.StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.render('error');
};

exports.internalServerError = (req, res) => {
    const errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    console.error(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is taking a nap!`);
};
