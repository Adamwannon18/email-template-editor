import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { mergeTags } from '../../data/mergeTags';

function MergeTagPill({ node, selected }) {
  const def = mergeTags.find((t) => t.tag === `{{${node.attrs.tag}}}`);
  const label = def?.label ?? node.attrs.tag;

  return (
    <NodeViewWrapper as="span" style={{ display: 'inline', lineHeight: 'inherit' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '1px 8px',
          margin: '0 1px',
          backgroundColor: selected ? '#bfdbfe' : '#dbeafe',
          color: '#1d4ed8',
          border: `1px solid ${selected ? '#3b82f6' : '#93c5fd'}`,
          borderRadius: '9999px',
          fontSize: '12px',
          fontFamily: 'ui-monospace, Consolas, monospace',
          lineHeight: '1.6',
          whiteSpace: 'nowrap',
          cursor: 'default',
          userSelect: 'none',
          boxShadow: selected ? '0 0 0 2px #bfdbfe' : 'none',
          verticalAlign: 'middle',
        }}
        title={`{{${node.attrs.tag}}}`}
      >
        {label}
      </span>
    </NodeViewWrapper>
  );
}

export const MergeTagNode = Node.create({
  name: 'mergeTag',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,
  draggable: false,

  addAttributes() {
    return {
      tag: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="mergeTag"]',
        getAttrs: (el) => ({ tag: el.getAttribute('data-tag') || '' }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'mergeTag',
        'data-tag': node.attrs.tag,
      }),
      `{{${node.attrs.tag}}}`,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MergeTagPill);
  },

  addCommands() {
    return {
      insertMergeTag:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    };
  },
});
