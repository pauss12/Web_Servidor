

const customHeader = (req, res, next) => {

    try {
        const apiKey = req.headers['api-key'];
        if (apiKey === 'Api-publica-123') {
            next();
        } else {
            res.status(403).send('API key es no válida');
        }

    } catch (error) {
        res.status(403).send(error);
    }

}

module.exports = { customHeader };