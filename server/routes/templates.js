const express = require('express');
const router = express.Router();
const store = require('../services/localStore');

// GET /api/templates?mediatorId=... — list customizations for a mediator
router.get('/', (req, res) => {
  const { mediatorId } = req.query;
  if (!mediatorId) return res.status(400).json({ error: "'mediatorId' query param is required" });
  try {
    const templates = store.list(mediatorId);
    res.json({
      pagination: {
        totalResults: templates.length,
        returnedResults: templates.length,
        perPage: templates.length,
        totalPages: templates.length > 0 ? 1 : 0,
        nextCursor: null,
        nextPage: null,
      },
      data: templates,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/templates/:templateId?mediatorId=...
router.get('/:templateId', (req, res) => {
  const { mediatorId } = req.query;
  if (!mediatorId) return res.status(400).json({ error: "'mediatorId' query param is required" });
  try {
    const template = store.findByTemplateId(mediatorId, req.params.templateId);
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.json({ id: req.params.templateId, ...template });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/templates/:templateId?mediatorId=... — create or update a customization
router.put('/:templateId', (req, res) => {
  const { mediatorId } = req.query;
  if (!mediatorId) return res.status(400).json({ error: "'mediatorId' query param is required" });
  try {
    const { subject, bodyHtml } = req.body ?? {};
    const saved = store.upsert(mediatorId, req.params.templateId, { subject, bodyHtml });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/templates/:templateId?mediatorId=... — revert to default
router.delete('/:templateId', (req, res) => {
  const { mediatorId } = req.query;
  if (!mediatorId) return res.status(400).json({ error: "'mediatorId' query param is required" });
  try {
    const removed = store.remove(mediatorId, req.params.templateId);
    if (!removed) return res.status(404).json({ error: 'Template not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
