/* modules used */
const multer = require('multer');
/* modules used */


const MIME_TYPES = {
	'image/jpg':'jpg',
	'image/jpeg':'jpg',
	'image/png':'png'
};

const storage = multer.diskStorage({

	destination : (req, file, cb) => {
		cb(null, 'uploadfiles');
	},

	filename : (req, file, cb) => {

		const name = file.originalname.split(' ').join('');
		const withoutDot = name.split('.').join('_');

		const ext = MIME_TYPES[file.mimetype];
		cb(null, 'FileId'+  withoutDot + Date.now() + '.' + ext);
	}
	
});

module.exports = multer({storage}).single('image');