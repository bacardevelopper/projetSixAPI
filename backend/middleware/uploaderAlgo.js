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
		const name = file.originalname.split(' ').join('');
		const withoutDot = name.split('.').join('_');
		const extension = MIME_TYPES[file.mimetype];
		cb(null, withoutDot + Date.now() + '.' +extension);
	}
});

module.exports = multer({storage}).single('image');