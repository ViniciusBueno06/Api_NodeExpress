export const validate = (project) => {

    return(req,res,next)=>{
        const {error,value} = project.validate(req.body, {
            abortEarly:false //retorna todos os erros
        }); 

        if (error){
            return res.status(400).json({ 
                error:"Dados inválidos",
                details:error.details.map(d=>d.message) 

            });
        }

        req.body=value; //retorna dados ja validados pelo Joi ex: um numero que vier como String, retorna como tipo Int
        next();

    }
}