import "dotenv/config"
import conectarAoBanco from '../config/db_config.js'
import { ObjectId } from 'mongodb';
const conn = await conectarAoBanco(process.env.MONGO_URL)

const getPosts = async () => {
    const db = conn.db("databaseImersao")
    const colecao = db.collection("posts")
    return colecao.find().toArray()
}

const createPost = async (newPost) => {
    const db = conn.db("databaseImersao")
    const colecao = db.collection("posts")
    return colecao.insertOne(newPost)
}

const atualizarPost = async (id, post) => {
    const db = conn.db("databaseImersao")
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: post})
}

export {getPosts, createPost, atualizarPost}