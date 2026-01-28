export const errorMiddleware = (err,req,res,next)=>{

    console.log(err);

    //erro controlado
    if(err.status){

        return res.status(err.status).json(
            {
                error:err.message
            }
        );

    }

    //erro inesperado
    return res.status(500).json(
        {
            error:"Erro interno do servidor"
        }
    );

}