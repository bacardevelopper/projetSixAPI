/* modules used */
const modelSauce = require("../model/sauceModel");
const fs = require("fs");
/* modules used */

/* model de fonction exportable */
/*
exports.data = (req, res, next) => {
}
*/
/* function add a sauce in bdd */
exports.addSauce = (req, res, next) => {
  const dataInsert = JSON.parse(req.body.sauce);

  console.log(dataInsert);
  console.log(dataInsert.name);

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
    imageUrl: `${req.protocol}://${req.get("host")}/uploadfiles/${
      req.file.filename
    }`,
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
      console.log("succes");
    } else {
      console.log("not save");
    }
  });
};



/* function delete sauce in bdd */
/* delete , /api/sauces/:id , {message : 'suppression reussi */
exports.deleteOne = (req, res, next) => {
  modelSauce.deleteOne({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).json({ message: "la sauce a bien été supprimé" });
      console.log("suppression de la sauce");
    } else {
      console.log("ça na pas marché");
    }
  });
};



/* function return all sauce in bdd */
exports.returnAll = (req, res, next) => {
  modelSauce.find({}, (err, docs) => {
    if (!err) {
      res.status(200).json(docs);
      console.log("renvoit tous les sauces");
    }
  });
};



/* function return one sauce with _id */
exports.oneSauce = (req, res, next) => {
  modelSauce.findOne({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).json(docs);
    } else {
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
      console.log(sauceMdf);
      /* operateur spread */
      modelSauce
        .updateOne({ _id: req.params.id }, { ...sauceMdf, _id: req.params.id })
        .then(() => {
          console.log("enr° ok");
          res.status(200).json({ message: "enr° ok" });
        })
        .catch(() => {
          console.log("enr° not ok");
          res.status(400).json({ error });
        });
    }
  });
};


/* fonctions pour j'aime et j'aime pas */
exports.likeAndDislike = (req, res, next) => {
  /* block de variables */
  let dataCompare = req.body; // {like , userId}
  let idCompare = req.params.id; /* id de la sauce */
  let test; /* true or false */
  let docsTabLiked;
  let docsTabDislike;
  /* block de variables */

  switch (dataCompare.like) {

    /* comprend le code pour j'aime */
    case 1:

      modelSauce.findOne({ _id: idCompare }, (err, docs) => {

        if (!err) {

          res.status(200).json({ message: "op" });
          docsTabLiked = docs.usersLiked; /* tableaux des likes */
          console.log(dataCompare);

          /* vrefifier si userId est dans le tableaux */
          test = docsTabLiked.includes(dataCompare.userId);

          if (test === false) {

            console.log(test);
            /* $push : ajoute userId ans l'array, et $inc : incremente dans la bdd */
            modelSauce.updateOne({ _id: idCompare },{$push: { usersLiked: dataCompare.userId },$inc: { likes: 1 },}, (err, docs) => {
            	if(!err){
            		res.json({message : 'like bien modifier'});
            	}else{
            		res.status(400).json({message : 'error'});
            	}
            });

          }
        } else {
          test = true;
        }
      });

      console.log(test);

      break;

    /* comprend le code pour j'aime pas */
    case -1:
      modelSauce.findOne({ _id: idCompare }, (err, docs) => {

        if (!err) {
          
          res.status(200).json({ message: "op" });
          docsTabLiked = docs.usersLiked; /* tableaux des likes */
          console.log(dataCompare);

          /* vrefifier si userId est dans le tableaux */
          test = docsTabLiked.includes(dataCompare.userId);

          if (test === false) {

            console.log(test);
            /* $push : ajoute userId ans l'array, et $inc : incremente dans la bdd */
            modelSauce.updateOne({ _id: idCompare },{$push: { usersLiked: dataCompare.userId },$inc: { likes: -1 },}, (err, docs) => {
              if(!err){
                res.json({message : 'like bien modifier'});
              }else{
                res.status(400).json({message : 'error'});
              }
            });

          }
        } else {
          test = true;
        }
      });

      console.log(test);
      break;

    /* annulation */
    case 0:
      //
      break;

    default:
      console.log("si tu es ici c'est qui y'a un gros soucis mon coco");
  }
};
