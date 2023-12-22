const db = require('../../config/db');

exports.getTags = async (req, res) => {

    const result = await db.query('SELECT * FROM tags');
    res.json(result.rows);

};

exports.addTags = async(req, res)=>{
    const{title}=req.body;
    try{
        const result= await db.query(
            'insert into tags (title) values ($1) returning *',
            [title]
        );
        const newTag=result.rows[0];
        return res.status(201).json({ message: 'tag added successfully',tag: newTag })
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}