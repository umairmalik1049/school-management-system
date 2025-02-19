const { dbQuery } = require("./dbFuncs.js");

const delTables = async () => {
  const query1 = "DROP TABLE IF EXISTS FACULTY";
  const query2 = "DROP TABLE IF EXISTS ENROLLMENT";
  const query3 = "DROP TABLE IF EXISTS STUDENT";
  const query4 = "DROP TABLE IF EXISTS CLASS_SUBJECT;";
  const query5 = "DROP TABLE IF EXISTS SUBJECT";
  const query6 = "DROP TABLE IF EXISTS TEACHER";
  const query7 = "DROP TABLE IF EXISTS CLASS";

  try {
    await dbQuery(query1);
    await dbQuery(query2);
    await dbQuery(query3);
    await dbQuery(query4);
    await dbQuery(query5);
    await dbQuery(query6);
    await dbQuery(query7);

    console.log("All Tables Deleted Successfully...!");
  } catch (err) {
    console.log("Error Deleting Tables...!" + err);
  }
};

module.exports = { delTables };
