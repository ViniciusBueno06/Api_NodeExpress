import { HttpError } from "../errors/HttpError.js";
import { deleteConfirmTokenModel, findByConfirmTokenModel } from "../models/emailTokenModel.js";
import { confirmUserEmailModel } from "../models/userModel.js"; // você precisa ter isso

export const confirmEmailService = async (token) => {

    // 1 - busca token válido (retorna objeto ou undefined)
    const tokenData = await findByConfirmTokenModel(token);

    if (!tokenData) {
        throw new HttpError(400, "Token inválido ou expirado");
    }

    // 2 - marca usuário como confirmado
    await confirmUserEmailModel(tokenData.user_id);

    // 3 - remove token usado
    await deleteConfirmTokenModel(tokenData.user_id);

    return true;
};
