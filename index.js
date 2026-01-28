import app from "./src/app.js";
import 'dotenv/config'


app.listen(process.env.PORT,() => {
    console.log(`Servidor rodando na porta ${process.env.PORT} | ${process.env.APP_URL}`);
});