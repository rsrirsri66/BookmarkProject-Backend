const db = require('../../config/db');

exports.checkbooks = async (req, res) => {

    const result = await db.query('SELECT * FROM bookmarks');
    res.json(result.rows);

};

exports.createBookmark = async(req,res)=>{
    const {url, title, description}=req.body;
    try{
        const result=await db.query(
            'insert into bookmarks (url, title, description)values ($1, $2, $3)returning *',
            [url, title, description]
        );
        const newBookmark = result.rows[0];

        return res.status(201).json({ message: 'Bookmark added successfully', bookmark: newBookmark });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

 exports.updateBookmark = async (req, res) => {
        const { id } = req.params; // Assuming your route includes a parameter for the bookmark ID
        const { url, title, description } = req.body;
        try {
            const checkBookmark = await db.query('SELECT * FROM bookmarks WHERE id = $1', [id]);
        
            if (checkBookmark.rows.length === 0) {
              return res.status(404).json({ error: 'Bookmark not found' });
            }
     // Update the bookmark
     const result = await db.query(
        'UPDATE bookmarks SET url = $1, title = $2, description = $3 WHERE id = $4 RETURNING *',
        [url, title, description, id]
      );
      const updatedBookmark = result.rows[0];
      return res.json({ message: 'Bookmark updated successfully', bookmark: updatedBookmark });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    }
