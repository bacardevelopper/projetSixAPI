const bcrypt = require('bcrypt');
const UserModel = require('../userModel');
/*                                      */

exports.loginUser = (req, res, next) => {

	if(req.body.email !== ""){

		UserModel.findOne({email : req.body.email})
			.then((user) => {
				if(user){
					
					/* on compare les mot de passe si c'est me bon */
					bcrypt.compare(req.body.mdp, user.mdp)
						.then( (valid) => {
							if(valid){
								return res.status(200).json({message : 'uutilisateur trouvé et bon mdp'});
							}
					})
						.catch( (error) => {
								return res.status(401);
					});

				}else{
					return res.status(401).json({error : 'utilisateur non trouvé'});
				}

		})
		.catch((error) => {
			res.status(500).json({error : 'erreur verifier que vos id correspondent'});
		});

	}else{
		res.status(500).json({ message : 'champ vide'});
		console.log('champ vide');
	}
	
}
