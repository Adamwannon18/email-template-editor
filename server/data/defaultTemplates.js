// Mirror of client/src/data/defaultTemplates.js — CommonJS for server use
const defaultTemplates = [
  {
    id: 'default-1',
    name: 'Mediation Meeting Scheduled',
    subject: 'Your Mediation Session Has Been Scheduled — {{caseNumber}}',
    body: `<p>Hi {{name}},</p>

<p>Your mediation session with {{mediatorName}} has been reserved.</p>

<p><strong>Case Details:</strong><br>
Case Title: {{caseTitle}}<br>
Case Number: {{caseNumber}}<br>
Mediation Date &amp; Time: {{dateAndTime}}<br>
Zoom Link: {{zoomLink}}</p>

<p>To ensure the session runs smoothly, please complete the onboarding form. This form is an essential step in the process and provides a convenient way to:</p>

<ul>
  <li>Upload documents relevant to the mediation</li>
  <li>Share important case details in advance</li>
  <li>Provide invoice information for a seamless payment process</li>
  <li>Add participants to the mediation without back-and-forth emails</li>
</ul>

<p>Completing this form helps us prepare everything in advance, making the mediation more efficient and productive for everyone involved.</p>

<p>{{onboardingUrl}}</p>

<p>If you have any questions regarding the onboarding process, please reply to this email.<br>
To reach the mediator, please contact them directly at {{mediatorEmail}}. Messages sent to scale@app.scalemediation.com do not go straight to the mediator and may be delayed before being forwarded.</p>

<p>Best Regards,<br>
{{mediatorName}}</p>`,
  },
  {
    id: 'default-2',
    name: 'Onboarding Reminder',
    subject: 'Reminder: Complete Your Onboarding for Case {{caseNumber}}',
    body: `<p>Hi {{name}},</p>

<p>Thanks for choosing {{mediatorName}} for your mediation. This is a quick reminder that your onboarding form is still pending. Completing your onboarding is essential to ensure everything is set for your upcoming session.</p>

<p><strong>Case Details:</strong><br>
Case Title: {{caseTitle}}<br>
Case Number: {{caseNumber}}<br>
Mediation Date &amp; Time: {{dateAndTime}}</p>

<p>If you have any questions regarding the onboarding process, please reply to this email.<br>
Thanks for your attention!</p>

<p>Best Regards,<br>
{{mediatorName}}</p>`,
  },
  {
    id: 'default-3',
    name: 'New Invoice',
    subject: 'Invoice for Mediation Services — {{caseNumber}}',
    body: `<p>Hi {{name}},</p>

<p>Thank you for choosing {{mediatorName}} and submitting your onboarding form. Your mediation session is scheduled for {{dateAndTime}}.</p>

<p>An invoice has been created for {{totalDue}} that is due on {{dueDate}}.<br>
Please complete the payment to ensure that your session proceeds as planned.</p>

<p><strong>Case Details:</strong><br>
Case Title: {{caseTitle}}<br>
Case Number: {{caseNumber}}<br>
Mediation Date &amp; Time: {{dateAndTime}}<br>
Total Amount Due: {{totalDue}}</p>

<p>Best Regards,<br>
{{mediatorName}}</p>`,
  },
  {
    id: 'default-4',
    name: 'Payment Reminder',
    subject: 'Payment Reminder: Mediation Invoice Due — {{caseNumber}}',
    body: `<p>Hi {{name}},</p>

<p>This is a reminder that your payment for mediation services is now overdue. Please note that if the payment is not completed, your mediation session with {{mediatorName}} can be canceled.</p>

<p>Payments can be securely made via Stripe. Please complete the payment to ensure that your session proceeds as planned.</p>

<p>Amount Due: {{totalDue}}<br>
Due by: {{dueDate}}<br>
Case Title: {{caseTitle}}<br>
Case Number: {{caseNumber}}<br>
Mediation Date &amp; Time: {{dateAndTime}}</p>

<p>If you have any questions regarding this invoice, simply reply to this email or reach out to our support team for help.</p>

<p>Best Regards,<br>
{{mediatorName}}</p>`,
  },
  {
    id: 'default-5',
    name: 'Brief Reminder',
    subject: 'Reminder: Submit Your Brief for Case {{caseNumber}}',
    body: `<p>Hi {{name}},</p>

<p>This is a reminder to submit your brief for mediation services scheduled with {{mediatorName}} which is now overdue. In preparation for the session, all briefs must be submitted in a timely fashion.</p>

<p><strong>Case Details:</strong><br>
Case Title: {{caseTitle}}<br>
Case Number: {{caseNumber}}<br>
Mediation Date &amp; Time: {{dateAndTime}}</p>

<p>If you have any questions, please reply to this email.<br>
Thanks for your attention!</p>

<p>Best Regards,<br>
{{mediatorName}}</p>`,
  },
  {
    id: 'default-6',
    name: 'Zoom Meeting Details',
    subject: 'Zoom Link for Your Upcoming Mediation — {{caseNumber}}',
    body: `<p>Hi {{mediatorName}},</p>

<p>Your mediation session is scheduled for {{dateAndTime}}.</p>

<p>Please find the Zoom meeting information below. The link has been created, and you can join the session at the scheduled time. Simply click on the link to join:<br>
{{zoomLink}}</p>

<p><strong>Case Details:</strong><br>
Case Number: {{caseNumber}}<br>
Case Title: {{caseTitle}}<br>
Mediation Date &amp; Time: {{dateAndTime}}</p>

<p>If you have any questions regarding this upcoming mediation session, simply reply to this email or reach out to our support team for help.<br>
If you cannot access this link, you can also copy-paste this meeting URL in the browser to join the meeting: {{zoomUrl}}</p>

<p>Best Regards,<br>
{{mediatorName}}</p>`,
  },
  {
    id: 'default-7',
    name: 'Case Reschedule',
    subject: 'Your Mediation Has Been Rescheduled — {{caseNumber}}',
    body: `<p>Hi {{name}},</p>

<p>Your mediation session for the case {{caseTitle}} ({{caseNumber}}) has been rescheduled.</p>

<p>Old Mediation Date: {{oldDateAndTime}}<br>
New Mediation Date: {{newDateAndTime}}</p>

<p>All participants have been notified. If you have any questions, feel free to reply to this email or contact our support team.</p>

<p>Best Regards,<br>
{{mediatorName}}</p>`,
  },
];

module.exports = { defaultTemplates };
