const db = require('../../config/db');

exports.getTags = async (req, res) => {
    let {user} = req

    const result = await db.query(`SELECT * FROM tags t
    WHERE t.user_id = '${user.id}'
    
    `);
    res.json(result.rows);

};

exports.addTags = async(req, res)=>{
    const{title}=req.body;
    const {user} = req
    try{
        const result= await db.query(
            'insert into tags (title, user_id ) values ($1, $2) returning *',
            [title, user.id]
        );
        const newTag=result.rows[0];
        return res.status(201).json({ message: 'tag added successfully',tag: newTag })
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}