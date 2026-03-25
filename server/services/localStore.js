const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/customizations.json');

function read() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function write(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  // Returns array of { id, subject, bodyHtml, customizedAt, updatedAt } for all customized templates
  list(mediatorId) {
    const store = read();
    const mediatorData = store[mediatorId] ?? {};
    return Object.entries(mediatorData).map(([templateId, t]) => ({
      id: templateId,
      subject: t.subject,
      bodyHtml: t.bodyHtml,
      customizedAt: t.customizedAt,
      updatedAt: t.updatedAt,
    }));
  },

  findByTemplateId(mediatorId, templateId) {
    const store = read();
    return store[mediatorId]?.[templateId] ?? null;
  },

  upsert(mediatorId, templateId, data) {
    const store = read();
    if (!store[mediatorId]) store[mediatorId] = {};
    const existing = store[mediatorId][templateId];
    const now = new Date().toISOString();
    store[mediatorId][templateId] = {
      subject: data.subject ?? existing?.subject ?? '',
      bodyHtml: data.bodyHtml ?? existing?.bodyHtml ?? '',
      customizedAt: existing?.customizedAt ?? now,
      updatedAt: now,
    };
    write(store);
    return { id: templateId, ...store[mediatorId][templateId] };
  },

  remove(mediatorId, templateId) {
    const store = read();
    if (!store[mediatorId]?.[templateId]) return false;
    delete store[mediatorId][templateId];
    write(store);
    return true;
  },
};
