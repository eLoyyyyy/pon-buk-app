var router = require('express').Router();
const UserController = require('../controllers/user_controller');

// UserController.init();

router.get('/', UserController.getUsers);

router.get('/search/:name', UserController.searchUser);

router.get('/search/', (req, res, next) => {
  setTimeout(() => {
    res.status(200).json([]);
  }, 500);
});

router.get('/:contactId', UserController.getUser);

router.post('/', UserController.addUser);

router.put('/:contactId', UserController.editUser);

router.delete('/:contactId', UserController.deleteUser);

module.exports = router;
