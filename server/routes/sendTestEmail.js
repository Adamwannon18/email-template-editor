const express = require('express');
const router = express.Router();
const store = require('../services/localStore');
const loops = require('../services/loopsService');
const { defaultTemplates } = require('../data/defaultTemplates');


// Mediator slug → display name
const MEDIATOR_NAMES = {
  'matthew-proudfoot': 'Matthew Proudfoot',
  'joel-bertet': 'Joel Bertet',
  'eric-wannon': 'Eric Wannon',
};

// Sample data for merge tag substitution (mirrors client/src/data/mergeTags.js)
const SAMPLE_DATA = {
  name: 'Jane Smith',
  mediatorEmail: 'matthew@scalemediation.com',
  caseTitle: 'Smith vs. Johnson Construction LLC',
  caseNumber: 'CASE-2025-0142',
  dateAndTime: 'February 18, 2025 at 10:00 AM EST',
  zoomLink: '<a href="https://zoom.us/j/98765432100">https://zoom.us/j/98765432100</a>',
  zoomUrl: 'https://zoom.us/j/98765432100',
  totalDue: '$1,500.00',
  dueDate: 'February 10, 2025',
  onboardingUrl: '<a href="https://app.scalemediation.com/onboarding/abc123">Complete Onboarding Form</a>',
  oldDateAndTime: 'February 18, 2025 at 10:00 AM EST',
  newDateAndTime: 'February 25, 2025 at 2:00 PM EST',
};

// POST /api/send-test-email
router.post('/', async (req, res) => {
  const { templateId, mediatorId, recipientEmail } = req.body ?? {};

  if (!templateId || !mediatorId || !recipientEmail) {
    return res.status(400).json({ error: "'templateId', 'mediatorId', and 'recipientEmail' are required" });
  }

  // 1. Resolve the default template
  const defaultTemplate = defaultTemplates.find((t) => t.id === templateId);
  if (!defaultTemplate) {
    return res.status(400).json({ error: `Unknown templateId: ${templateId}` });
  }

  // 2. Map local template ID to Loops transactional template ID
  const LOOPS_TEMPLATE_IDS = {
    'default-1': 'cmn4qooc201aj0ixosocgspba', // Mediation Scheduled
  };
  const loopsTransactionalId = LOOPS_TEMPLATE_IDS[templateId];
  if (!loopsTransactionalId) {
    return res.status(404).json({ error: `No Loops template mapped for templateId: ${templateId}` });
  }

  // 3. Get the mediator's customized content, or fall back to the default
  const custom = store.findByTemplateId(mediatorId, templateId);
  const bodyHtml = custom?.bodyHtml ?? defaultTemplate.body;

  // 4. Resolve mediator name and render all merge tags with sample data
  const mediatorName = MEDIATOR_NAMES[mediatorId] ?? mediatorId;
  const data = { ...SAMPLE_DATA, mediatorName };
  const renderedBody = Object.entries(data).reduce(
    (html, [key, val]) => html.replaceAll(`{{${key}}}`, val),
    bodyHtml
  );

  // 5. Send via Loops
  try {
    const result = await loops.sendTransactional({
      transactionalId: loopsTransactionalId,
      email: recipientEmail,
      dataVariables: { emailBody: renderedBody },
    });
    res.json(result);
  } catch (err) {
    res.status(502).json({ error: `Loops send failed: ${err.message}`, details: err.data });
  }
});

module.exports = router;
