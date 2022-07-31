/**
 * This function takes poll_id and returns the poll object
 * and all its choices for the user to vote on
 * @param {*} db - pg pool object
 * @param {*} poll_id - poll_id to retrieve the poll from the database
 * @returns poll object
 */

const nameRequiredCheck = (db, poll_id) => {
  return db.query(`
  SELECT name_required
  FROM polls
  WHERE id = $1;`, [poll_id])
    .then((data) => {
      console.log(data.rows)
      return data.rows;
    });
}

module.exports = {
  nameRequiredCheck
}
