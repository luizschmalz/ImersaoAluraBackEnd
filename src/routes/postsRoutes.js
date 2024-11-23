import express from 'express';
import multer from 'multer';
import cors from 'cors';
import {listarPosts, sendPost, sendImg, attPost} from '../controllers/postsController.js';

const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  });

const upload = multer({ dest: './uploads', storage })

const routes = (app) => {
    app.use(express.json())
    app.use(cors(corsOptions))

    app.get('/posts', listarPosts)
    app.post('/posts', sendPost)
    app.post('/upload', upload.single('imagem'), sendImg)
    app.put('/upload/:id', attPost )

}

export default routes