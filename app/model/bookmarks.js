const db =require("../../config/db")

exports.bookmark=async(Bookmark)=>{
    return await db.query("select * from bookmarks")
}