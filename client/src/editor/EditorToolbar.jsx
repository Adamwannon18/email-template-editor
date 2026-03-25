import { useState } from 'react';

/* ─── icon components ─────────────────────────────────────── */
const B = () => <span style={{ fontWeight: 800, fontSize: 13, lineHeight: 1, fontFamily: 'serif' }}>B</span>;
const I = () => <span style={{ fontStyle: 'italic', fontWeight: 700, fontSize: 13, lineHeight: 1, fontFamily: 'serif' }}>I</span>;
const U = () => <span style={{ textDecoration: 'underline', fontWeight: 700, fontSize: 13, lineHeight: 1 }}>U</span>;

const AlignLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" />
  </svg>
);
const AlignCenterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);
const AlignRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="12" x2="21" y2="12" /><line x1="6" y1="18" x2="21" y2="18" />
  </svg>
);
const BulletListIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" />
    <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" /><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const OrderedListIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" />
    <text x="2" y="8" fontSize="7" fontWeight="700" stroke="none" fill="currentColor">1</text>
    <text x="2" y="14" fontSize="7" fontWeight="700" stroke="none" fill="currentColor">2</text>
    <text x="2" y="20" fontSize="7" fontWeight="700" stroke="none" fill="currentColor">3</text>
  </svg>
);
const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
const DividerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" strokeOpacity="0.3" />
    <line x1="3" y1="18" x2="21" y2="18" strokeOpacity="0.3" />
  </svg>
);
const ButtonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="10" rx="3" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);
const UndoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" />
  </svg>
);
const RedoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 14 20 9 15 4" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" />
  </svg>
);

/* ─── helpers ─────────────────────────────────────────────── */
const Sep = () => <div style={{ width: 1, height: 20, backgroundColor: '#e5e7eb', margin: '0 4px', flexShrink: 0 }} />;

function Btn({ onMouseDown, active, title, disabled, children }) {
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      title={title}
      disabled={disabled}
      style={{
        padding: '5px 6px',
        borderRadius: 5,
        border: 'none',
        background: active ? '#dbeafe' : 'transparent',
        color: active ? '#1d4ed8' : '#374151',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        transition: 'background 0.1s',
      }}
      onMouseEnter={(e) => { if (!disabled && !active) e.currentTarget.style.background = '#f3f4f6'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = active ? '#dbeafe' : 'transparent'; }}
    >
      {children}
    </button>
  );
}

function getBlockStyle(editor) {
  if (editor.isActive('heading', { level: 1 })) return '1';
  if (editor.isActive('heading', { level: 2 })) return '2';
  if (editor.isActive('heading', { level: 3 })) return '3';
  return 'p';
}

function applyBlockStyle(editor, val) {
  if (val === 'p') {
    editor.chain().focus().setParagraph().run();
  } else {
    editor.chain().focus().toggleHeading({ level: Number(val) }).run();
  }
}

/* ─── main toolbar ────────────────────────────────────────── */
export default function EditorToolbar({ editor }) {
  const [showLink, setShowLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  if (!editor) return null;

  const openLinkPanel = () => {
    const existing = editor.getAttributes('link').href || '';
    setLinkUrl(existing);
    setShowLink(true);
    setTimeout(() => document.getElementById('toolbar-link-url')?.focus(), 50);
  };

  const applyLink = () => {
    if (linkUrl.trim()) {
      editor.chain().focus().setLink({ href: linkUrl.trim() }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setShowLink(false);
    setLinkUrl('');
  };

  const cancelLink = () => {
    setShowLink(false);
    setLinkUrl('');
    editor.chain().focus().run();
  };

  return (
    <div className="bg-white border-b border-gray-200 select-none shrink-0">
      {/* Main row */}
      <div className="flex items-center flex-wrap gap-0.5 px-3 py-1.5">

        {/* Block style */}
        <select
          value={getBlockStyle(editor)}
          onChange={(e) => applyBlockStyle(editor, e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            fontSize: 12,
            border: '1px solid #e5e7eb',
            borderRadius: 5,
            padding: '4px 6px',
            color: '#374151',
            background: '#fff',
            cursor: 'pointer',
            marginRight: 4,
            outline: 'none',
          }}
        >
          <option value="p">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        <Sep />

        {/* Inline formatting */}
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} active={editor.isActive('bold')} title="Bold (⌘B)"><B /></Btn>
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} active={editor.isActive('italic')} title="Italic (⌘I)"><I /></Btn>
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }} active={editor.isActive('underline')} title="Underline (⌘U)"><U /></Btn>

        <Sep />

        {/* Alignment */}
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('left').run(); }} active={editor.isActive({ textAlign: 'left' })} title="Align left"><AlignLeftIcon /></Btn>
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('center').run(); }} active={editor.isActive({ textAlign: 'center' })} title="Align center"><AlignCenterIcon /></Btn>
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('right').run(); }} active={editor.isActive({ textAlign: 'right' })} title="Align right"><AlignRightIcon /></Btn>

        <Sep />

        {/* Lists */}
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} active={editor.isActive('bulletList')} title="Bullet list"><BulletListIcon /></Btn>
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }} active={editor.isActive('orderedList')} title="Numbered list"><OrderedListIcon /></Btn>

        <Sep />

        {/* Link */}
        <Btn onMouseDown={(e) => { e.preventDefault(); openLinkPanel(); }} active={editor.isActive('link') || showLink} title="Insert / edit link"><LinkIcon /></Btn>

        {/* Horizontal rule */}
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setHorizontalRule().run(); }} active={false} title="Insert divider"><DividerIcon /></Btn>

        {/* Button block */}
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().insertButtonBlock().run(); }} active={false} title="Insert CTA button"><ButtonIcon /></Btn>

        <Sep />

        {/* Undo / Redo */}
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); }} disabled={!editor.can().undo()} title="Undo (⌘Z)"><UndoIcon /></Btn>
        <Btn onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); }} disabled={!editor.can().redo()} title="Redo (⌘⇧Z)"><RedoIcon /></Btn>
      </div>

      {/* Link input panel */}
      {showLink && (
        <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-100 bg-gray-50">
          <LinkIcon />
          <input
            id="toolbar-link-url"
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); applyLink(); }
              if (e.key === 'Escape') { e.preventDefault(); cancelLink(); }
            }}
            placeholder="https://… or {{onboardingUrl}}"
            className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); applyLink(); }}
            className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
          >
            Apply
          </button>
          {editor.isActive('link') && (
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().unsetLink().run(); setShowLink(false); }}
              className="text-xs text-red-500 hover:text-red-700 px-2 py-1 cursor-pointer"
            >
              Remove
            </button>
          )}
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); cancelLink(); }}
            className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
