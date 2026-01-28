import { HttpError } from "../errors/HttpError.js";
import { findUserByEmail } from "../models/userModel.js";
import { confirmEmailService } from "../services/confirmEmailService.js";
import { findAllUsersService, insertUserService,loginUserService } from "../services/userServices.js";


export const getUser = async (_, res) => {
    try {
        const usuarios = await findAllUsersService();
        return res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    //body ja vem validado do routes por conta do middleware de validação
    const novoUsuario = await insertUserService(nome, email, senha);

    return res.status(201).json({novoUsuario,message:"Email enviado para ativação de sua conta!"});
};

export const confirmEmail = async (req, res, next) => {
    try {
        const { token } = req.query;

        if (!token) {
            throw new HttpError(400, "Token não identificado");

        }
        await confirmEmailService(token);

        return res.status(200).json({ message: "Email confirmado com sucesso!" });
    } catch (error) {
        next(error);
    }
}
export const loginUser = async (req, res, next) => {
    try {
        const { email, senha } = req.body;
        

        const userToken = await loginUserService(email,senha);
        return res.status(201).json({message:"login realizado com sucesso!","token":userToken});
    } catch (error) {
        next(error);
    }

}