const connection = require("./dbConnection");

// ------------ Function to send queries to DB

const dbQuery = (q) => {
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { dbQuery };
