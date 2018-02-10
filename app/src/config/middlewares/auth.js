import config from '../env'

export default function redirect(req, res, next) {
    if (!config.securityMode) {
        return next();
    } 
    if (req.isAuthenticated())
        return next();
    res.redirect('/');;
}