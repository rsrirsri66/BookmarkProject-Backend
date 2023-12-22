module.exports = app =>{
    const auth = require("../middleware/auth");
    const userController = require("../controller/usersController");
    const bookmarksController=require("../controller/bookmarksController");
    const tagsController=require("../controller/tagsController")
    console.log("test");

    app.get("/users", userController.checkMobile);
    app.get("/book", bookmarksController.checkbooks);
    app.post("/createbooks",bookmarksController.createBookmark);
    app.put("/update/:id",bookmarksController.updateBookmark);
    app.get("/tags",tagsController.getTags);
    app.post("/addtags",tagsController.addTags)
};