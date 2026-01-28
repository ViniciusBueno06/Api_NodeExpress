import { saveConfirmTokenModel } from "../models/emailTokenModel.js";
import { findUserByEmail } from "../models/userModel.js";
import { sendConfirmEmail } from "./email.js";

export const tokenReload = async (email) => {

    const token = crypto.randomUUID();

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); //aq esta para expirar após 24 horas
    const user = await findUserByEmail(email);
    await saveConfirmTokenModel (user.id, token, expiresAt);
    await sendConfirmEmail(email, token);
}