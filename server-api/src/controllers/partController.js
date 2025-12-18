const Part = require('../models/Part');
const { partValidator } = require('../utils/validators');

exports.createPart = async (req, res, next) => {
  try {
    const { error, value } = partValidator.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    const part = await Part.create(value);
    res.status(201).json(part);
  } catch (err) {
    next(err);
  }
};

exports.getPart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const part = await Part.findById(id);
    res.json(part);
  } catch (err) {
    next(err);
  }
};

exports.getAllParts = async (req, res, next) => {
  try {
    const { limit = 100, offset = 0 } = req.query;
    const parts = await Part.findAll(parseInt(limit), parseInt(offset));
    res.json(parts);
  } catch (err) {
    next(err);
  }
};

exports.updatePart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = partValidator.validate(req.body, { 
      abortEarly: false,
      presence: 'optional'
    });

    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    const part = await Part.update(id, value);
    res.json(part);
  } catch (err) {
    next(err);
  }
};

exports.deletePart = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Part.delete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.searchParts = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query parameter "q" is required' });
    }
    const parts = await Part.search(q);
    res.json(parts);
  } catch (err) {
    next(err);
  }
};
