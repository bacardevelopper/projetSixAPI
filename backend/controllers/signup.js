const bcrypt = require("bcrypt");
const UserModel = require("../model/userModel");
/*                                   */
const saltRounds = 10;

/* the function for signup user */
/* ## step 1: verify value !== "" , step 2: regex email, step 3: hash password, 
step 4: save in mongoodb */
exports.createUser = (req, res, next) => {

  if (req.body.email !== "" && req.body.password !== "") {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
      bcrypt
        .hash(req.body.password, saltRounds)
        .then((hash) => {
          console.log("Le hash  :" + hash + " et son :" + req.body.email);

          const userValue = req.body;

          const user = new UserModel({
            email: req.body.email,
            password: hash,
          });
          
          /* ## step 4: save in mongodb */
          user.save((err) => {
            if(!err){
              res.status(201).json({message : 'user create'});
              console.log('enregistrement avec succéss');
            }else{
              res.json({error : 'user no create'});
              console.log('user non enregistré');
            }
          });

        })
        .catch((error) => {
          console.log(error);
        });
    }

  } else {
    console.log("error sur les champs");
  }
};
