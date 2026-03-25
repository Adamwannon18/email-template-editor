import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import { useEffect, useRef } from 'react';

import { MergeTagNode } from './nodes/MergeTagNode';
import { ButtonBlockNode } from './nodes/ButtonBlockNode';
import EditorToolbar from './EditorToolbar';
import { htmlToTiptap, tiptapToHtml } from '../utils/htmlConversion';

export default function TipTapEditor({ value, onChange, insertTagRef, templateId }) {
  const lastEmittedRef = useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, autolink: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      GlobalDragHandle.configure({ dragHandleWidth: 20 }),
      MergeTagNode,
      ButtonBlockNode,
    ],
    content: htmlToTiptap(value),
    onUpdate({ editor }) {
      const html = tiptapToHtml(editor.getHTML());
      lastEmittedRef.current = html;
      onChange(html);
    },
    editorProps: {
      attributes: { class: 'focus:outline-none' },
    },
  });

  // Sync content when value changes from outside (reset / template navigation)
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (value !== lastEmittedRef.current) {
      lastEmittedRef.current = value;
      editor.commands.setContent(htmlToTiptap(value || '<p></p>'), false);
    }
  }, [value, templateId]);

  // Wire sidebar insert callback
  useEffect(() => {
    if (!insertTagRef || !editor) return;
    insertTagRef.current = (tag) => {
      editor.chain().focus().insertMergeTag({ tag }).run();
    };
  }, [editor, insertTagRef]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <EditorToolbar editor={editor} />

      {/* Email canvas: gray outer bg, white card centered at 600px */}
      <div className="flex-1 overflow-auto bg-gray-100 py-8 px-4">
        <div
          className="mx-auto bg-white shadow rounded-sm"
          style={{ maxWidth: 600 }}
        >
          <div className="px-10 py-8 text-sm text-gray-800 leading-relaxed">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
