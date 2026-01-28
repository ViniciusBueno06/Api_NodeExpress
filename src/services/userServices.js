import { HttpError } from "../errors/HttpError.js";
import { findAllUsersModel, findUserByEmail, insertUserModel } from "../models/userModel.js";
import { saveConfirmTokenModel } from "../models/emailTokenModel.js";
import { sendConfirmEmail } from "../utils/email.js";

import jwt from 'jsonwebtoken';
import 'dotenv/config'
import bcrypt from "bcrypt";
import crypto from "crypto";
import { tokenReload } from "../utils/tokenReload.js";


export const findAllUsersService = async () => {

    const usuarios = await findAllUsersModel();
    return usuarios;
}
export const insertUserService = async (nome, email, senha) => {

    //verifica se possui campos vazios 
    if (!nome || !email || !senha) {
        throw new HttpError(401, "Dados insuficientes");
    }

    //regra de negocio

    //1 - verificar se existe algum usuario com o mesmo email (chama a camada model)
    const usuarioExistente = await findUserByEmail(email);
    if (usuarioExistente) {
        throw new HttpError(409, "Já existe um usuário com esse email");
    }



    //2 - criptografia de senha - hash
    const senhaHash = await bcrypt.hash(senha, 10);

    //3 - inserir novo cadastro no banco (chamando a camada de model) deixando o email não confirmado
    const novoUsuario = await insertUserModel(nome, email, senhaHash);

    //4 - gerando o token para confirmar email
    const token = crypto.randomUUID();

    //5- definindo o tempo de expiração do token 
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); //aq esta para expirar após 24 horas

    //6 - salva o token no db (chama o model)
    await saveConfirmTokenModel(novoUsuario.id, token, expiresAt);

    //7 - envia email para confirmar
    await sendConfirmEmail(email, token);

    return {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
    };




};

export const loginUserService = async (email, senha) => {
    
        const user = await findUserByEmail(email);
        
        if (!user) {
            throw new HttpError(404, "Não existe nenhuma conta cadastrada com este email!");
        }

        const senhaCorreta = await bcrypt.compare(
            senha,user.password
        );

        if(!senhaCorreta){
            throw new HttpError(401,"Login não efetuado, usuario ou senha incorretos!");
        }
        else if(user.email_confirmed === 0 ){
            await tokenReload(email);
            throw new HttpError(401,"Conta não ativada! Token reenviado pelo email para ativação");
        }
        else if(user.email == email && senhaCorreta && user.email_confirmed ===1){
            const tokenJWT = jwt.sign({ìd:user.id,username:user.username},process.env.JWT_SECRET,{expiresIn:'1h'});
            return tokenJWT;
        }
        


    
        



}