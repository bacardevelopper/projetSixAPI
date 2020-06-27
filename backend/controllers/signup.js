const bcrypt = require("bcrypt");
const UserModel = require("../model/userModel");
/*                                   */

const saltRounds = 10;

/* the function for signup user */
/* ## step 1: verify value !== "" , step 2: regex email, step 3: hash password, 
step 4: save in mongoodb */
exports.createUser = (req, res, next) => {
  console.log("reussit middleware");
  if (req.body.email !== "" && req.body.mdp !== "") {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
      bcrypt
        .hash(req.body.mdp, saltRounds)
        .then((hash) => {
          console.log("Le hash  :" + hash + " et son :" + req.body.email);

          req.body.mdp = hash;
          const userValue = req.body;

          const user = new UserModel({
            email: req.body.email,
            mdp: hash,
          });

          /* ## step 4: save in mongodb */
          user
            .save()
            .then(() => {
              return res.status(201).send();
              console.log("user create");
            })
            .catch(() => {
              return res.status(400).send();
              console.log("erreur");
            });

          console.log("user modeliser " + user + "la suite en bas" + "\n");

          UserModel.find({}, (err, docs) => {
            console.log(docs); // affich un à un les données du bdd
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } else {
    console.log("error sur les champs");
  }

  res.end();
};
