const multer = require('multer');

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `images/${file.fieldname}-${Date.now()}.${ext}`)
    }
});

const imageFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Not an image'), false);
    }
};

upload = multer({
    storage: imageStorage,
    fileFilter: imageFilter
});

exports.uploadImages = upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'images', maxCount: 3}
])
