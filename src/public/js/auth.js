const helpers = {};

helpers.isAuthenticatedClient = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.name != "admin") {
            return next();    
        }
        else{
            req.flash('error_msg','No estas autorizado');
            res.redirect('/admin');
        }
        
    }
    else{
        req.flash('error_msg','No estas autorizado');
        res.redirect('/');
    }
    
}

helpers.isAuthenticatedAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {

        if (req.user.name == "admin") {
            return next();
        }
        else{
            req.flash('error_msg','No estas autorizado');
            res.redirect('/client');
        }
        
    }
    else{   
        req.flash('error_msg','No estas autorizado');
        res.redirect('/');
    }

    
    
}

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg','No estas autorizado');
    res.redirect('/');
}

module.exports = helpers;