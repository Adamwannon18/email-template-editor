import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultTemplates } from '../data/defaultTemplates';
import { renderPreview } from '../data/mergeTags';
import { api } from '../services/api';
import { useMediator } from '../App';
import TipTapEditor from '../editor/TipTapEditor';
import MergeTagSidebar from '../editor/MergeTagSidebar';

export default function Editor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { mediator } = useMediator();

  const defaultTemplate = defaultTemplates.find((t) => t.id === templateId);

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isCustomized, setIsCustomized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saved' | 'error' | null
  const [saveError, setSaveError] = useState('');
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // 'sent' | 'error' | null
  const [sendError, setSendError] = useState('');
  const [activeTab, setActiveTab] = useState('editor');

  const insertTagRef = useRef(null);

  // Load this mediator's customization for this template (or fall back to default)
  useEffect(() => {
    if (!defaultTemplate) return;
    setSaveStatus(null);

    api.getTemplate(mediator.slug, templateId)
      .then((custom) => {
        setSubject(custom.subject ?? defaultTemplate.subject);
        setBody(custom.bodyHtml ?? defaultTemplate.body);
        setIsCustomized(true);
      })
      .catch(() => {
        // 404 or error → use default
        setSubject(defaultTemplate.subject);
        setBody(defaultTemplate.body);
        setIsCustomized(false);
      });
  }, [templateId, mediator.slug]);

  const handleInsertTag = (tagName) => {
    insertTagRef.current?.(tagName);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);
    setSaveError('');
    try {
      await api.saveTemplate(mediator.slug, templateId, { subject, bodyHtml: body });
      setIsCustomized(true);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus('error');
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSendTest = async () => {
    const recipientEmail = window.prompt('Send test email to:');
    if (!recipientEmail) return;
    setSending(true);
    setSendStatus(null);
    setSendError('');
    try {
      await api.sendTestEmail(templateId, mediator.slug, recipientEmail);
      setSendStatus('sent');
      setTimeout(() => setSendStatus(null), 4000);
    } catch (err) {
      setSendStatus('error');
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  };

  const handleReset = async () => {
    const confirmed = window.confirm(
      `Reset "${defaultTemplate.name}" to default for ${mediator.name}?\n\nThis will permanently delete their custom version.`
    );
    if (!confirmed) return;
    if (isCustomized) {
      try {
        await api.deleteTemplate(mediator.slug, templateId);
      } catch {
        // ignore — reset locally regardless
      }
    }
    setSubject(defaultTemplate.subject);
    setBody(defaultTemplate.body);
    setIsCustomized(false);
    setSaveStatus(null);
  };

  if (!defaultTemplate) {
    return (
      <div className="flex items-center justify-center flex-1 text-sm text-gray-500">
        Template not found.{' '}
        <button onClick={() => navigate('/')} className="ml-2 text-blue-600 underline cursor-pointer">
          Go back
        </button>
      </div>
    );
  }

  const previewHtml = renderPreview(body, mediator.name);

  return (
    <div className="flex flex-col flex-1 min-h-0">

      {/* ── Sub-header ───────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Templates
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-900">{defaultTemplate.name}</span>
          {isCustomized ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Customized
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Default
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {saveStatus === 'saved' && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="text-xs text-red-600 truncate max-w-48" title={saveError}>
              {saveError || 'Save failed'}
            </span>
          )}
          {sendStatus === 'sent' && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Test email sent
            </span>
          )}
          {sendStatus === 'error' && (
            <span className="text-xs text-red-600 truncate max-w-48" title={sendError}>
              {sendError || 'Send failed'}
            </span>
          )}
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 rounded-md transition-colors cursor-pointer"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSendTest}
            disabled={sending}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60 border border-gray-200 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {sending ? (
              <>
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Sending…
              </>
            ) : (
              'Send Test Email'
            )}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {saving ? (
              <>
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving…
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>

      {/* ── Subject line ─────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center gap-3 shrink-0">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="flex-1 text-sm text-gray-900 border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Email subject line…"
        />
      </div>

      {/* ── Workspace ────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Merge tag sidebar */}
        <MergeTagSidebar onInsertTag={handleInsertTag} />

        {/* Center: tabs + editor/preview */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Tab bar */}
          <div className="bg-white border-b border-gray-200 px-4 flex items-center gap-0 shrink-0">
            {['editor', 'preview'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer capitalize ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'editor' ? 'Editor' : 'Preview'}
              </button>
            ))}
            {activeTab === 'preview' && (
              <span className="ml-auto text-xs text-gray-400 pr-1">
                Previewing as <span className="font-medium text-gray-600">{mediator.name}</span>
              </span>
            )}
          </div>

          {/* Editor pane — keep mounted, toggle visibility */}
          <div
            className="flex-1 flex flex-col min-h-0 overflow-hidden"
            style={{ display: activeTab === 'editor' ? 'flex' : 'none' }}
          >
            <TipTapEditor
              value={body}
              onChange={setBody}
              insertTagRef={insertTagRef}
              templateId={templateId}
            />
          </div>

          {/* Preview pane */}
          <div
            className="flex-1 overflow-auto bg-gray-100"
            style={{ display: activeTab === 'preview' ? 'block' : 'none' }}
          >
            <div className="max-w-2xl mx-auto my-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-semibold text-gray-600">Subject:</span>
                  <span className="text-gray-800">{renderPreview(subject, mediator.name)}</span>
                </div>
              </div>
              <div
                className="px-8 py-6 text-sm text-gray-800 leading-relaxed"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
