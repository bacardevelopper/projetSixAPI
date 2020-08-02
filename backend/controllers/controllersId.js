/* modules used */
const bcrypt = require("bcrypt");
const UserModel = require("../model/userModel");
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
/* modules used */

const sendMail = (userEmail) => {
  let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bacar.darwin.pro@gmail.com',
    pass: '/****/'
  }
});

let mailOptions = {
  from: 'bacar.darwin.pro@gmail.com',
  to: userEmail,
  subject: ' tu vois que je suis un vrai codeur',
  html: '<h1>c du html</h1><p>bacardevelopper</p>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

/* function export login algo */
exports.loginUser = (req, res, next) => {

  if (req.body.email !== "") {
    
    console.log(req.body);
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        console.log(user.password +' '+ req.body.password);
        if (user) {
          /* on compare les mot de passe si c'est le bon */
          bcrypt
            .compare(req.body.password, user.password)
              .then((valid) => {
                
                if (valid) {
                  /* retourner un token */
                  res.status(200)
                    .json({
                     	userId : user._id, 
                    	token : jwt.sign({userId : user._id}, 'TOKEN_IS_FREE_OPEN_SOURCE',
                    	{expiresIn : '24h'})
                    });
                  /* sendMail('naimaibrahim@outlook.fr'); */
                }
              })
              .catch((error) => {
                return res.status(401).json({message : error});
              });
        } else {
          return res.status(401).json({ error: "utilisateur non trouvé" });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message : "erreur verifier que vos id correspondent" });
      });

  } else {
    res.status(500).json({ error : "champ vide" });
    console.log("champ vide");
  }
};



/* function signup algo */

const saltRounds = 10;
/* the function for signup user */
/* ## step 1: verify value !== "" , step 2: regex email, step 3: hash password, 
step 4: save in mongoodb */
/* function send mail inscription */



/* fin de la function */
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
            password: hash
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
