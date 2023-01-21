const Router = require("express");
const userController = require("./controllers/userController");
const authMiddleware = require("./authMiddleware");
const taskController = require("./controllers/taskController")
const epicController = require("./controllers/epicController")

const defResponse = function (req, res) {
    return res.json({
        message: 'Method not supported!!',
        method: 'get',
        path: req.originalUrl
    })
}

const router = new Router();
// task
const taskRouter = new Router();
taskRouter.post('/', authMiddleware, taskController.insert);
taskRouter.put('/', authMiddleware, taskController.update);
taskRouter.delete('/', authMiddleware, taskController.delete);
taskRouter.get('/', authMiddleware, taskController.getAll);
taskRouter.get('/:epicId', authMiddleware, taskController.getByEpic);
router.use('/task', taskRouter);
// epic
const epicRouter = new Router();
epicRouter.post('/', authMiddleware, epicController.insert);
epicRouter.put('/', authMiddleware, epicController.update);
epicRouter.delete('/', authMiddleware, epicController.delete);
epicRouter.get('/', authMiddleware, epicController.getAll);
router.use('/epic', epicRouter);
//user
const userRouter = new Router();
userRouter.post('/', userController.login);
userRouter.get('/', authMiddleware, userController.check);
router.use('/login', userRouter);

router.get('*', defResponse);

module.exports = router