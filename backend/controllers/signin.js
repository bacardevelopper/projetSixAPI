const bcrypt = require("bcrypt");
const UserModel = require("../model/userModel");
const jwt = require('jsonwebtoken');
/*                                      */

exports.loginUser = (req, res, next) => {
  if (req.body.email !== "") {
    console.log(req.body);
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        console.log(user.password +' '+req.body.password);
        if (user) {
          /* on compare les mot de passe si c'est le bon */
          bcrypt
            .compare(req.body.password, user.password)

            .then((valid) => {
              console.log('le mot de passe correspond '+req.body.email);
              if (valid) {
                /* retourner un token */
                res.status(200)
                  .json({
                   	userId : user._id, 
                  	token : jwt.sign({userId : user._id}, 'TOKEN_IS_FREE_OPEN_SOURCE',
                  	{expiresIn : '24h'}) 
                  	
                  });
              }


            })
            .catch((error) => {
              return res.status(401);
            });
        } else {
          return res.status(401).json({ error: "utilisateur non trouvé" });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "erreur verifier que vos id correspondent" });
      });

  } else {
    res.status(500).json({ error : "champ vide" });
    console.log("champ vide");
  }
};
