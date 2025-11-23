import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
   // console.log("uploading File Mimetype:", file.mimetype);
    if(file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF is allowed.'), false);
       
    }
};

export const checkedUpload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 5 * 1024 * 1024}
});