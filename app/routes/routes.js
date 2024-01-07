module.exports = app =>{
    const auth = require("../middleware/auth");
    const userController = require("../controller/usersController");
    const bookmarksController=require("../controller/bookmarksController");
    const tagsController=require("../controller/tagsController")
    console.log("test");

    app.get("/users", userController.checkMobile);
    app.get("/book", auth ,bookmarksController.checkbooks);
    app.post("/createbooks", auth ,bookmarksController.createBookmark);
    app.put("/update/:id/",bookmarksController.updateBookmark);
    app.get("/tags", auth ,tagsController.getTags);
    app.post("/addtags",auth ,tagsController.addTags);
    app.post("/addusers",userController.addUser);
    app.put("/delbook/:id/",bookmarksController.softDeleteBookmark)
};