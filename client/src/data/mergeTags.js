export const mergeTags = [
  { tag: '{{name}}', label: 'Recipient Name' },
  { tag: '{{mediatorName}}', label: 'Mediator Name' },
  { tag: '{{mediatorEmail}}', label: 'Mediator Email' },
  { tag: '{{caseTitle}}', label: 'Case Title' },
  { tag: '{{caseNumber}}', label: 'Case Number' },
  { tag: '{{dateAndTime}}', label: 'Date & Time' },
  { tag: '{{zoomLink}}', label: 'Zoom Link' },
  { tag: '{{zoomUrl}}', label: 'Zoom URL' },
  { tag: '{{totalDue}}', label: 'Total Due' },
  { tag: '{{dueDate}}', label: 'Due Date' },
  { tag: '{{onboardingUrl}}', label: 'Onboarding URL' },
  { tag: '{{oldDateAndTime}}', label: 'Old Date & Time' },
  { tag: '{{newDateAndTime}}', label: 'New Date & Time' },
];

export const sampleData = {
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

export function renderPreview(body, mediatorName) {
  const data = { ...sampleData, mediatorName };
  return Object.entries(data).reduce(
    (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
    body
  );
}
