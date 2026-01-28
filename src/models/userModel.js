import { db } from "../config/db.js";

//retorna todos os usuarios
export const findAllUsersModel = () => {    //Buscar todos os usuarios
  const query = "SELECT * FROM users";

  return new Promise((resolve, reject) => {
    db.query(query, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

//pra verificar se existe email igual
export const findUserByEmail = async (email)=>{

    const query = "SELECT * FROM users WHERE email = ?";
    
    return new Promise((resolve,reject)=>{
        db.query(query,[email],(error,results)=>{
            if(error) reject(error);
            else resolve(results[0]);
        });
    });

};

//insere novo usuario
export const insertUserModel = (nome,email,senha)=>{
    const query = "INSERT INTO users (name_user,email,password) VALUES (?,?,?)";

    return new Promise((resolve,reject)=>{
        db.query(query,[nome,email,senha],(error,results)=>{
            if(error)reject(error);
            else resolve({
                id:results.insertId,
                nome,
                email
            });
        });
    });
};



//confirma o email do usuario
export const confirmUserEmailModel = (userId) => {
  const query = `
    UPDATE users
    SET email_confirmed = true
    WHERE id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [userId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

