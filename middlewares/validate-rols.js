

const adminRol = (req, res, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'role validation without verifying the token first'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not admin - can not do this`
        });
    }

    next();
}

const hasRole = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'role validation without verifying the token first'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `The service requires one of these roles: ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    adminRol,
    hasRole
}