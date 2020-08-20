/* modules used */
const bcrypt = require("bcrypt");
const UserModel = require("../model/userModel");
const jwt = require('jsonwebtoken');
const mdata = require('maskdata');
/* modules used */

/* function export login algo */
exports.loginUser = (req, res, next) => {
  /* mask password */
  const maskPasswordOptions = {   
  maskWith : "*" , 
  maxMaskedCharacters : 16 
  };

  if (req.body.email !== "") {
    const masked = mdata.maskPassword(req.body.password, maskPasswordOptions);
    
    /* console.table([req.body.email, masked]); */
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        
        if (user) {
          /* compare password */
          bcrypt
            .compare(req.body.password, user.password)
              .then((valid) => {
                
                if (valid) {
                  /* return  token */
                  return res.status(200)
                    .json({
                     	userId : user._id, 
                    	token : jwt.sign({userId : user._id}, 'TOKEN_IS_FREE_OPEN_SOURCE',
                    	{expiresIn : '24h'})
                    });
                }else{
                  return res.status(400).json({message : 'error password'});
                }
              })
              .catch((error) => {
                return res.status(401).json({message : 'erreur'});
              });
        } else {
            return res.status(401).json({ error: "utilisateur non trouvé" });
        }
      })
      .catch((error) => {
        
        return res.status(500).json({ message :
          "erreur verifier que vos id correspondent" });
      });

  } else {
    return res.status(500).json({ error : "champ vide" });
    /* console.log("champ vide"); */
  }
};





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
