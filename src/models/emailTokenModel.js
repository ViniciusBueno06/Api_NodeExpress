import { db } from "../config/db.js";

export const saveConfirmTokenModel = (userId, token, expireToken) => {
  const query = `
    INSERT INTO email_confirm_tokens (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [userId, token, expireToken], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

///---------

export const findByConfirmTokenModel = (token) => {
  const query = `
    SELECT * FROM email_confirm_tokens 
    WHERE token = ? AND expires_at > NOW()
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [token], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]); // retorna UM token ou undefined
    });
  });
};


///---------

export const deleteConfirmTokenModel = (userId) => {
  const q = `
    DELETE FROM email_confirm_tokens
    WHERE user_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(q, [userId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};
