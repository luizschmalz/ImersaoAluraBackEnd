import {getPosts, createPost, atualizarPost} from '../models/postsModels.js'
import fs from 'fs'
import gerarDescricaoComGemini from '../services/geminiService.js'

const listarPosts = async (req, res) => {

    const posts = await getPosts()
    res.status(200).json(posts)

}

const sendPost = async (req, res) => {
    const newPost = req.body
    try{
        const post = await createPost(newPost)
        res.status(200).json(post)
    }catch(err){
        console.error(err.message)
        res.status(500).json({"Erro": "Erro ao criar post"})    
    }
}

const sendImg = async (req, res) => {
    const newImg = {
        descricao: '',
        imgUrl: req.file.originalname,
        alt: ''
    }
    try{
        const img = await createPost(newImg)
        const imgAtt = `uploads/${img.insertedId}.png`
        fs.renameSync(req.file.path, imgAtt)
        res.status(200).json(img)
    }catch(err){
        console.error(err.message)
        res.status(500).json({"Erro": "Erro ao enviar imagem"})
    }
}

const attPost = async (req, res) => {
    const id = req.params.id
    const urlImg = `http://localhost:3000/${id}.png`
    
    try{

        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const newPost = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        }

        const post = await atualizarPost(id, newPost)
        res.status(200).json(post)
    }catch(err){
        console.error(err.message)
        res.status(500).json({"Erro": "Erro ao atualizar post"})    
    }
}

export {listarPosts, sendPost, sendImg, attPost}