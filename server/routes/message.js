var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
  console.log("id: ", req.params.id);

  res.sendStatus(200);
});

module.exports = router;
