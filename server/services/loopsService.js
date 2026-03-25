const LOOPS_API_BASE = 'https://app.loops.so/api/v1';

function getHeaders() {
  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    throw new Error('LOOPS_API_KEY is not set in environment variables');
  }
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
}

async function handleResponse(response) {
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { message: text };
  }

  if (!response.ok) {
    const error = new Error(data.message || `Loops API error: ${response.status} ${response.statusText}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

async function listTemplates() {
  const response = await fetch(`${LOOPS_API_BASE}/transactional`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

async function getTemplateById(id) {
  const response = await fetch(`${LOOPS_API_BASE}/transactional/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

async function createTemplate(templateData) {
  const response = await fetch(`${LOOPS_API_BASE}/transactional`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(templateData),
  });
  return handleResponse(response);
}

async function updateTemplate(id, templateData) {
  const response = await fetch(`${LOOPS_API_BASE}/transactional/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(templateData),
  });
  return handleResponse(response);
}

async function deleteTemplate(id) {
  const response = await fetch(`${LOOPS_API_BASE}/transactional/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

async function sendTransactional({ transactionalId, email, dataVariables }) {
  const response = await fetch(`${LOOPS_API_BASE}/transactional`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ transactionalId, email, dataVariables }),
  });
  return handleResponse(response);
}

module.exports = {
  listTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  sendTransactional,
};
