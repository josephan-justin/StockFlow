const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads")
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname)

        cb(null, uniqueName)
    }
})

const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png|webp/

    const ext = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    )

    const mime = allowedTypes.test(file.mimetype)

    if (ext && mime) {
        cb(null, true)
    } else {
        cb(new Error("Only image files are allowed!"))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    }
})

module.exports = upload