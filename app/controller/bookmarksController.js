const db = require('../../config/db');

exports.checkbooks = async (req, res) => {

  try {
    const result = await db.query(`
      SELECT b.id, b.title, b.description, b.url, STRING_AGG(t.title, ',') AS tag_title
      FROM bookmarks b
      LEFT JOIN bookmarks_tags bt ON b.id = bt.bookmark_id
      LEFT JOIN tags t ON bt.tag_id = t.id
      WHERE b.is_active = true
      GROUP BY b.id, b.title, b.description, b.url
      ORDER BY b.id DESC
     
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

};

exports.createBookmark = async (req, res) => {
  const { url, title, description, tags } = req.body;
  try {
    // Insert bookmark into bookmarks table
    const bookmarkResult = await db.query(
      'INSERT INTO bookmarks (url, title, description) VALUES ($1, $2, $3) RETURNING *',
      [url, title, description]
    );

    const newBookmark = bookmarkResult.rows[0];
    const bookmarkId = newBookmark.id;

    // Insert tags and associate with the bookmark in bookmarks_tags table
    if (tags && tags.length > 0) {
      const tagIds = await Promise.all(
        tags.map(async (tagTitle) => {
          // Check if tag exists, if not, insert it
          const existingTag = await db.query('SELECT * FROM tags WHERE title = $1', [tagTitle]);
          if (existingTag.rows.length === 0) {
            const newTagResult = await db.query('INSERT INTO tags (title) VALUES ($1) RETURNING id', [tagTitle]);
            return newTagResult.rows[0].id;
          } else {
            return existingTag.rows[0].id;
          }
        })
      );

      // Associate tags with the bookmark in bookmarks_tags table
      await Promise.all(
        tagIds.map(async (tagId) => {
          
          await db.query('INSERT INTO bookmarks_tags (bookmark_id, tag_id) VALUES ($1, $2)', [bookmarkId, tagId]);
        })
      );
    }

    return res.status(201).json({ message: 'Bookmark added successfully', bookmark: newBookmark });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


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
