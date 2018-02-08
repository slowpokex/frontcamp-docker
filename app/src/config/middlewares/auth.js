export default function redirect(req, res, next) {
    const isAuth = req.isAuthenticated;
    if (!isAuth) {
        return res.redirect('/login');
    }
    return isAuth() ? next() : res.redirect('/login');
}