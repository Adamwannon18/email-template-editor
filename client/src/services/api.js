const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
}

export const api = {
  listTemplates: (mediatorId) => request(`/templates?mediatorId=${encodeURIComponent(mediatorId)}`),
  getTemplate: (mediatorId, templateId) => request(`/templates/${templateId}?mediatorId=${encodeURIComponent(mediatorId)}`),
  saveTemplate: (mediatorId, templateId, body) =>
    request(`/templates/${templateId}?mediatorId=${encodeURIComponent(mediatorId)}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  deleteTemplate: (mediatorId, templateId) =>
    request(`/templates/${templateId}?mediatorId=${encodeURIComponent(mediatorId)}`, { method: 'DELETE' }),
  sendTestEmail: (templateId, mediatorId, recipientEmail) =>
    request('/send-test-email', {
      method: 'POST',
      body: JSON.stringify({ templateId, mediatorId, recipientEmail }),
    }),
};
