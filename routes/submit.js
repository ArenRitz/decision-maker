
'use strict'
const express = require('express');
const router  = express.Router();
const {getPoll} = require('../db/helper/polls')
const {nameRequiredCheck} = require('../db/helper/submit-helpers')


module.exports = (db) => {
  let id;

  router.get("/:id", (req, res) => {    // View submit page to vote
    id = req.params.id;
    getPoll(db, req.params.id)
    .then((data) => {
      const name_required = data.nameRequired
      const templateVar = {choices: data.choices, id, name_required}
      res.render('submit', templateVar)
    });
  })

  router.post(`/:id`, (req, res) => {  // Submit to vote on poll
    id = req.params.id;
    nameRequiredCheck(db, id)
    const choiceObj = req.body;
    console.log(choiceObj);
    let rank = Object.keys(choiceObj).length;
    console.log(rank)
    let x = 1;

    for (let choice in req.body) {

    console.log(x, req.body[choice])
    x++;
  }
  })


  return router;
}
