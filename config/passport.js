const {Utilisateur} = require('../models')
const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy 
const ExtractJwt = require('passport-jwt').ExtractJwt 


let option = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'
}

//accessible am alalany ilay payload ilay data napidirina tary am register sy login
//payload mamerina objet
 
passport.use(new JwtStrategy(option , async(payload , done) =>{
    try {
        //payload = {id ,email}
        const utilisateur = await Utilisateur.findOne({where:{email : payload.email}})

        if(utilisateur)
           return done(null,utilisateur)
            
        return done(null,false)

    } catch (error) {
        console.log(error);

        return done(null,false)
        
    }

}))