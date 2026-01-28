import Joi from "joi";

export const UserSchema = Joi.object({
    nome: Joi.string().min(3).required().messages({
        "string.base": "Nome deve ser texto",
        "string.empty": "Nome é obrigatório",
        "string.min": "Nome deve ser no minimo 3 caracteres",
        "any.required": "Nome é obrigatorio"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email inválido",
        "string.empty": "Email é obrigatório",
        "any.required": "Email é obrigatório"
    }),
    senha: Joi.string().min(6).required().messages({
        "string.min": "Senha deve ter no minimo 6 caracteres",
        "string.empty": "Senha é obrigatória",
        "any.required": "Senha é obrigatória"
    })
});

export const UserLoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email inválido",
        "string.empty": "Email é obrigatório",
        "any.required": "Email é obrigatório"
    }),
    senha: Joi.string().required().messages({
        "string.empty": "Senha é obrigatória",
        "any.required": "Senha é obrigatória"
    })
});