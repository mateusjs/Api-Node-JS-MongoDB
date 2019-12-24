const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// router.get('/post', function (req, res) {
//     res.send('Tá nos posts do routes');
// });

//Retorna todos os posts (do banco)
router.get('/', async function (req, res) {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (ex) {

    }
});

//retonra um post especifico do banco
router.get('/:postId', async (req, res) => {
    try {
        const getPost = await Post.findById(req.params.postId);
        res.json(getPost);
    } catch (ex) {
        res.json({ message: ex });
    }
});

//faz um post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (ex) {
        res.json({ message: ex });
    }
});

//update de um post
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } });
        res.json(updatePost);
    } catch (ex) {
        res.json({ message: ex });
    }
});

//deleta um post (item banco)
router.delete('/:postId', async (req, res) => {
    try {
        //poderia ser Post.remove({_id: req.params.postId })  creio que em vez do id tbm pode ser qualquer
        //propriedade do json (descrption por exemplo)
        const removePost = await Post.remove({ _id: req.params.postId })
        // const post = await Post.findByIdAndDelete(req.params.postId);
        res.json(removePost);
    } catch (ex) {
        res.json(ex)
    }
})


module.exports = router;