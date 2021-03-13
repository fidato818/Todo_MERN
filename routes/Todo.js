const express = require("express");
const router = express.Router();
const TodoPost = require("../model/Post");

router.post("/addPost", (req, res) => {
  const post = req.body;

  const newPost = new TodoPost(post);

  newPost
    .save()
    .then((result) => {
      res.send({ message: "Volunteers Found", isPost: true, result });
      console.log("Result: ", result);
    })
    .catch((err) => {
      res.send({ message: err });
    });
}); 

router.get("/:postId", async (req, res) => {
  TodoPost.findOne({ _id: req.params.postId })

    .then((result) => {
      res.send({ message: "Volunteers Found", isPost: true, result });
      console.log("Result: ", result);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

router.put("/:postId", async (req, res) => {
  TodoPost.findByIdAndUpdate({ _id: req.params.postId }, req.body, {
    new: true,
    runValidators: true,
  })

    .then((result) => {
      res.send({ message: "Volunteers Found", isPost: true, result });
      console.log("Result: ", result);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

router.delete("/:postId", async (req, res) => {
  TodoPost.findByIdAndRemove({ _id: req.params.postId })

    .then((result) => {
      res.send({ message: "Volunteers delete", isPost: true, result });
      console.log("Result: ", result);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

router.get("/", async (req, res) => {
  const posts = await TodoPost.find();
  if (!posts) {
    return res.status(409).json({ message: "NO POSTS YET" });
  }

  res.status(200).json(posts);
});

module.exports = router;
