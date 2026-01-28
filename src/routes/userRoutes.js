import express from "express";
import { getUser, createUser,loginUser } from "../controllers/userController.js";
import { confirmEmail } from "../controllers/userController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { UserSchema ,UserLoginSchema} from "../validators/userValidator.js"; //JOI para validação
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/",getUser);  


router.post("/cadastro",  //rota de cadastro de usuario
            validate(UserSchema),
            createUser);

router.get("/confirm_email",confirmEmail);//rota de confirmar email para ativar a conta

router.post("/login", //rota de login 
            validate(UserLoginSchema),
            loginUser);
            
router.get("/protect",authMiddleware,(req,res)=>{ //rota para testar o token jwt
    res.json({
        message:"Você acessou uma rota protegida por token jwt!",
        user:req.user
    })
}) 

export default router;