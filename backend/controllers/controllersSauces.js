/* modules used */
const modelSauce = require("../model/sauceModel");
const nodemailer = require('nodemailer');
/* modules used */

/* function add a sauce in DB */
exports.addSauce = (req, res, next) => {
  const dataInsert = JSON.parse(req.body.sauce);
  /*
  console.log(dataInsert);
  console.log(dataInsert.name);
  */
  const like = 0;
  const dislike = 0;
  const tabUserLike = [];
  const tabUserDislike = [];

  const sauceAdd = new modelSauce({
    userId: dataInsert.userId,
    name: dataInsert.name,
    manufacturer: dataInsert.manufacturer,
    description: dataInsert.description,
    mainPepper: dataInsert.mainPepper,
    imageUrl: `${req.protocol}://${req.get("host")}/uploadfiles/${req.file.filename}`,
    heat: dataInsert.heat,
    likes: like,
    dislikes: dislike,
    usersLiked: tabUserLike,
    usersDisliked: tabUserDislike,
  });

  //methode save data in DB (mongodb)
  sauceAdd.save((err) => {
    if (!err) {
      res.status(201).json({ message: "insert in bdd succes" });
    } else {
      return res.status(400).json({message : 'error'});
    }
  });
};


/* function delete sauce in DB */
exports.deleteOne = (req, res, next) => {
  modelSauce.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "la sauce a bien été supprimé" });
    })
    .catch(() => {
      return res.status(400).json({message : 'error'});
    });
};


/* function return all sauce in DB */
exports.returnAll = (req, res, next) => {
    modelSauce.find({}, (err, docs) => {
      if(!err){
        res.status(200).json(docs);      
      }else{
        return res.status(400).json({message : 'error'});  
      }
    });
};


/* function return one sauce */
exports.oneSauce = (req, res, next) => {

  modelSauce.findOne({ _id:req.params.id}, (err, docs) => {
    if(!err){
      res.status(200).json(docs);
    }else{
      return res.status(400).json({message : 'error'});
    }
  });
};



//function modify a sauce
exports.modifySauce = (req, res, next) => {
  const sauceMdf = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/uploadfiles/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  modelSauce.findOne({ _id: req.params.id }, (err, docs) => {
    if (!err) {

      modelSauce
        .updateOne({ _id: req.params.id }, { ...sauceMdf, _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: "enr° ok" });
        })
        .catch(() => {
          res.json({message : 'error'});
        });
    }else{
      return res.status(401).json({message : 'error not found'});
    }
  });
};




/* function for like and dislike */
exports.likeAndDislike = (req, res, next) => {

  switch (req.body.like) {
    /* like */
    case 1:

      modelSauce.findOne({ _id: req.params.id }, (err, docs) => {

        if(!err){
          let testUn = docs.usersLiked.includes(req.body.userId);

          if(testUn == false){

            modelSauce.updateOne({ _id: req.params.id },
              {$push: { usersLiked: req.body.userId },$inc: { likes: 1 },},
              (err, docs) => {
                if(!err){
                  return res.status(200).json({message : 'like bien modifier'});
                }else{
                  return res.status(400).json({message : 'like non modifier'});
                }
            });

          }else{
            testUn = true;
          }
        }else{
          return res.status(400).json({message : 'error general'});
        }

      });

      break;

    /* dislike */
    case -1:
      modelSauce.findOne({ _id: req.params.id }, (err, docs) => {

        if(!err){
          let testDeux = docs.usersDisliked.includes(req.body.userId);

          if(testDeux == false){

            modelSauce.updateOne({ _id: req.params.id },
              {$push: { usersDisliked: req.body.userId },$inc: { dislikes: 1 },},
              (err, docs) => {
                if(!err){
                  return res.status(200).json({message : 'dislike bien modifier'});
                }else{
                  return res.status(400).json({message : 'dislike non modifier'});

                }
            });

          }else{
            testDeux = true;
          }
        }else{
        }

      });
      break;

    
    case 0:
      // find sauce
      modelSauce.findOne({ _id: req.params.id }, (err, docs) => {
        if(!err){

          let testBolArray = docs.usersDisliked.includes(req.body.userId);
          let testBolArrayTwo = docs.usersLiked.includes(req.body.userId);

          if(testBolArray||testBolArrayTwo){

              /* trouver et supprimer l'id et modifier l'incrementation */
              if(testBolArray){
                modelSauce.updateOne({_id : req.params.id},{$pull: { usersDisliked: req.body.userId },$inc: { dislikes: -1 },},(err, docs) => {
                  if(!err){
                    return res.status(200).json({message : 'like bien modifier'});
                  }else{
                    return res.status(400).json({message : 'ça marche pas'});
                  }
                });
              }else if(testBolArrayTwo){
                modelSauce.updateOne({_id : req.params.id},{$pull: { usersLiked: req.body.userId },$inc: { likes: -1 },},(err, docs) => {
                  if(!err){
                    return res.status(200).json({message : 'like bien modifier'});
                  }else{
                    return res.status(400).json({message : 'ça marche pas'});
                  }
                });
              }else{

              }
          }else{
            /* console.log('pas de like ni dislike'); */
          }

        }else{
            /* console.log('erreur : sauce non trouvé'); */
            return res.status(400).json({message : 'no find sauce'});
        }
      });
      break;

    default:
      /* console.log("error general"); */
  }
};
