/* modules used */
const modelSauce = require("../model/sauceModel");
/* modules used */

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
      console.log("succes");
    } else {
      console.log("not save");
      return res.status(400).json({message : 'error'});
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
      return res.status(400).json({message : 'error'});
    }
  });
};



/* function return all sauce in bdd */
exports.returnAll = (req, res, next) => {
  modelSauce.find({}, (err, docs) => {
    if (!err) {
      res.status(200).json(docs);
      console.log("renvoit tous les sauces");
    }else{
      return res.status(400).json({message : 'error'});
    }
  });
};



/* function return one sauce with _id */
exports.oneSauce = (req, res, next) => {
  modelSauce.findOne({ _id: req.params.id }, (err, docs) => {
    if (!err) {
      res.status(200).json(docs);
    } else {
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
          res.json({message : 'error'});
        });
    }else{
      return res.status(401).json({message : 'error not found'});
    }
  });
};




/* fonctions pour j'aime et j'aime pas */
exports.likeAndDislike = (req, res, next) => {

  switch (req.body.like) {

    /* comprend le code pour j'aime */
    case 1:

      modelSauce.findOne({ _id: req.params.id }, (err, docs) => {

        if(!err){
          console.log(docs)
          let testUn = docs.usersLiked.includes(req.body.userId);
          console.log(' data : '+testUn);

          if(testUn == false){

            modelSauce.updateOne({ _id: req.params.id },{$push: { usersLiked: req.body.userId },$inc: { likes: 1 },}, (err, docs) => {
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
          console.log('error '+err);
        }

      });

      break;

    /* comprend le code pour j'aime pas */
    case -1:
      modelSauce.findOne({ _id: req.params.id }, (err, docs) => {

        if(!err){
          console.log(docs)
          let testDeux = docs.usersDisliked.includes(req.body.userId);
          console.log(' data : '+testDeux);

          if(testDeux == false){

            modelSauce.updateOne({ _id: req.params.id },{$push: { usersDisliked: req.body.userId },$inc: { dislikes: 1 },}, (err, docs) => {
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
          console.log('error '+err);
        }

      });
      break;

    /* annulation */
    case 0:
      //
      break;

    default:
      console.log("si tu es ici c'est qui y'a un gros soucis mon coco");
  }
};
