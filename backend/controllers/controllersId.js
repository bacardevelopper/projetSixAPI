/* modules used */
const bcrypt = require("bcrypt");
const UserModel = require("../model/userModel");
const jwt = require('jsonwebtoken');
/* modules used */

/* function export login algo */
exports.loginUser = (req, res, next) => {
  /* mask password */

  if (req.body.email !== "" && req.body.password !== "") {

    /* console.table([req.body.email, req.body.password]); */
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        
          /* compare password */
          bcrypt
            .compare(req.body.password, user.password)
              .then((valid) => {
                
                  /* return  token */
                  return res.status(200)
                    .json({
                      userId : user._id, 
                      token : jwt.sign({userId : user._id}, 'TOKEN_IS_FREE_OPEN_SOURCE',
                      {expiresIn : '24h'})
                    });
              })
              .catch((error) => {
                return res.status(400).json({message : 'erreur'});
              });

      })
      .catch((error) => {
        /* console.log(res) */
        return res.status(500).json({ message : "erreur verifier que vos id correspondent" });
        ;
      });

  } else {
      return res.status(500).json({ error : "champ vide" });
  }
}





/* function for signup user */
exports.createUser = (req, res, next) => {
  const saltRounds = 10;

  if (req.body.email !== "" && req.body.password !== "") {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
      
      bcrypt
        .hash(req.body.password, saltRounds)
          .then((hash) => {
            /* console.log("Le hash  :" + hash + " et son :" + req.body.email); */
            const userValue = req.body;

            const user = new UserModel({
              email: req.body.email,
              password: hash
            });
            
            /* ## step 4: save in mongodb */
            user.save()
              .then(() => {
                res.status(201).json({message : 'user create'});
              })
              .catch(() => {
                return res.status(400).json({message : 'user no create'});
                /* console.log('user non enregistré'); */
              });

          })
          .catch((error) => {
            /* console.log(error); */
          });
    }

  } else {
    return res.status(400).json({message : 'error'})
    /* console.log("error sur les champs"); */
  }
};
