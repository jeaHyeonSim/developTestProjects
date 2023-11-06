module.exports = (req, res, next) => {
    let addr_type = !!req.session.addr_type;
	let addr_data = !!req.session.addr_data;
    console.log(!addr_data);
    if(!addr_data) res.redirect("/");
    else return next();  
    // console.log("auth" , auth);
    // console.log("!auth" , !auth);
    // if(!auth) res.redirect("/");
    // else return next();      
}