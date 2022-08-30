const withAuth = (req, res, next) => {
    if(!req.session.loggedIn){
        console.log("made it past the if statmement")
        res.redirect('/login');
    } 
    else{
        next();
    }
}

module.exports = withAuth;