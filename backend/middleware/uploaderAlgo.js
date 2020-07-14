const multer = require('multer');


const MIME_TYPES = {
	'image/jpg':'jpg',
	'image/jpeg':'jpg',
	'image/png':'png'
};

const storage = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null, 'uploadfiles')
	},
	filename : (req, file, cb) => {
<<<<<<< HEAD
		const name = file.originalname.split(' ').join('');
		const withoutDot = name.split('.').join('_');
=======
		const name = 'Image'+file.originalname.split(' ').join('_');
>>>>>>> parent of a65b69c... message en cours de resolution de l'erreur 404 upload file
		const extension = MIME_TYPES[file.mimetype];
		cb(null, name + Date.now() + '.' +extension);
	}
});

module.exports = multer({storage}).single('image');