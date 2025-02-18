const { dbQuery } = require("./dbFuncs.js");

const delData = async () => {
  const q1 = "DELETE FROM ENROLLMENT";
  const q2 = "DELETE FROM CLASS_SUBJECT";
  const q3 = "DELETE FROM STUDENT";
  const q4 = "DELETE FROM SUBJECT";
  const q5 = "DELETE FROM TEACHER";
  const q6 = "DELETE FROM CLASS";
  const q7 = "DELETE FROM FACULTY";

  try {
    await dbQuery(q1);
    await dbQuery(q2);
    await dbQuery(q3);
    await dbQuery(q4);
    await dbQuery(q5);
    await dbQuery(q6);
    await dbQuery(q7);

    console.log("Data Deleted Successfully...!");
  } catch (err) {
    console.log("Error in deleting data : ", err);
  }
};

module.exports = { delData };
