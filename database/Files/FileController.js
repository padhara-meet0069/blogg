const randomString = require("randomstring")
const fileModel = require("./FileModel")
const fs = require('fs')

const fileUpload = (file) => {
    let name = randomString.generate({
        length: 12,
        charset: "alphabetic"
    })
    let ext = file.name.split(".")
    ext = ext[ext.length - 1]
    let path = "/public/images/"
    path += name
    path += "."
    path += ext
    let mimType = file.mimetype.split("/")
    mimType = mimType[0]
    file.mv(`.${path}`)
    return {
        name: name + "." + ext,
        path,
        mimType,
        ext
    }

}


const deleteFiles = (path) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) return reject(err)
            resolve(true)
        })
    })
}



class FileController {
    async create(req, res) {
        try {
            const { file } = req.files
            let fileDetails;
            if (!file.length) {
                fileDetails = fileUpload(file)
            } else {
                let i = 0
                fileDetails = []
                while (i < file.length) {
                    let tmp = fileUpload(file[i])
                    fileDetails.push(tmp)
                    i++
                }
            }
            let result;

            if (!fileDetails.length) {
                result = await fileModel.model.create({ ...fileDetails })
            } else {
                result = await fileModel.model.insertMany([...fileDetails])
            }

            if (!result) return res.status(500).send({ message: "Somthing went wrong" })

            return res.status(200).send({ message: "Success" })
        } catch (error) {
            return res.status(500).send({ message: "Internal server errror" })
        }
    }

    async getFiles(req, res) {
        try {
            const result = await fileModel.model.find(
                {},
                {
                    "url":
                    {
                        $concat:
                            [process.env.APP_URL, "$path"]
                    },
                    "path": 1,
                    "_id": 1,
                    "ext": 1,
                    "mimType": 1,
                    "createdAt": 1
                }

            ).sort({ createdAt: -1 })

            if (!result) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).send({ message: "Success", data: result })
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async DeleteFiles(req, res) {
        try {
            const { ids } = req.body
            let deletedCount = 0

            if (ids.length <= 0) {
                return res.status(400).send({ message: "Missing dependency" })
            }

            const fileDetails = await fileModel.model.find({ _id: ids })
            if (!fileDetails) return res.status(500).send({ message: "Somthing went wrong" })

            let i = 0
            while (i < fileDetails.length) {
                const tmp = await deleteFiles("." + fileDetails[i].path)
                if (tmp) {
                    deletedCount++
                }
                i++
            }

            if (deletedCount !== ids.length) return res.status(500).send({ message: "Somthing went wrong" })
            const result = await fileModel.model.deleteMany({ _id: ids })
            if (!result || result.deletedCount !== ids.length) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            return res.status(500).send({ message: "Internal server error" })
        }
    }
}

const fileController = new FileController()

module.exports = fileController