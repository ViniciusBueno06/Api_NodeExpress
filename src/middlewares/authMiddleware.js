
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const authMiddleware = async (req,res ,next)=>{

    const authToken = req.headers.authorization;


    if(!authToken){
        return res.status(401).json({message:"Essa página precisa de um token para acessar!"});
    }

    const a = authToken.split(" "); //quebra o array authtoken e pega so o token jwt que esta na posicao [1]
    const token = a[1]; //tira o bearer


    try {
        const user = jwt.verify(token,process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message:"Token inválido"});
    }
}