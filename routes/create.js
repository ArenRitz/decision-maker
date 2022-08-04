const express = require("express");
const router = express.Router();
const { createPoll } = require("../db/helper/polls");

module.exports = (db, client) => {
  router.get("/", (req, res) => {
    // View page to create a new poll
    res.render("create");
  });

  router.post("/", (req, res) => {
    // Submit to create new poll
    let id;
    const poll = req.body;
    console.log(poll);
    createPoll(db, poll)
      .then((pollId) => {
        id = pollId;
        const messageData = {
          from: "Decision Maker<admin@decision-maker.com>",
          to: poll.creatorEmail,
          subject: "Decision Maker admin links",
          text: `
        Thank you ${poll.creatorName} for using Decision Maker.

        Please forward this link: http://localhost:8080/submit/${id} to users to collect their votes on "${poll.title}".

        Please use this link: http://localhost:8080/results/${id} to access the current poll result of "${poll.title}"`,
        };
        return client.messages.create(process.env.DOMAIN, messageData);
      })
      .then(() => {
        return res.redirect(`/submit/${id}`);
      })
      .catch((err) => {
        console.error(err);
        res.redirect("/error");
      });
  });

  return router;
};
