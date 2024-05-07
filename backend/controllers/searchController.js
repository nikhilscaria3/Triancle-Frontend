const { Tag } = require("../models/tagModal")
const { Op } = require("sequelize");


const searchtags = async (req, res) => {
    const tag = req.query.tag
    console.log(tag);
    try {
        const tags = await Tag.findAll({
            where: {
                tagname: {
                    [Op.startsWith]: tag
                }
            }
        })
        
        res.json(tags)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while searching the tags' });

    }

}

module.exports = {
    searchtags
}