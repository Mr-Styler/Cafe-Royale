const SendError = (err, res, req) => {
        res.status(err.statusCode).render('404', {
            status: err.status,
            currentUser: req.user,
            PageTitle: 'Error!!!',
            errorMsg: err.message
        })
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status;
    SendError(err, res, req)
}