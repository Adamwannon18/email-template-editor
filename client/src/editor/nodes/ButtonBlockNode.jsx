import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

function ButtonBlockView({ node, updateAttributes, selected }) {
  return (
    <NodeViewWrapper contentEditable={false}>
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#1d4ed8',
            color: '#ffffff',
            padding: '10px 28px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '14px',
            letterSpacing: '0.01em',
            outline: selected ? '2px solid #93c5fd' : '2px solid transparent',
            outlineOffset: '3px',
            cursor: 'default',
            transition: 'outline 0.1s',
          }}
        >
          {node.attrs.text || 'Click Here'}
        </div>
      </div>

      {selected && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            paddingBottom: '12px',
            flexWrap: 'wrap',
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#6b7280',
            }}
          >
            <span>Label:</span>
            <input
              type="text"
              value={node.attrs.text}
              onChange={(e) => updateAttributes({ text: e.target.value })}
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                fontSize: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                padding: '3px 8px',
                width: '120px',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </label>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#6b7280',
            }}
          >
            <span>URL:</span>
            <input
              type="text"
              value={node.attrs.url}
              onChange={(e) => updateAttributes({ url: e.target.value })}
              onMouseDown={(e) => e.stopPropagation()}
              placeholder="https://… or {{onboardingUrl}}"
              style={{
                fontSize: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                padding: '3px 8px',
                width: '220px',
                outline: 'none',
                fontFamily: 'ui-monospace, monospace',
              }}
            />
          </label>
        </div>
      )}
    </NodeViewWrapper>
  );
}

export const ButtonBlockNode = Node.create({
  name: 'buttonBlock',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      text: { default: 'Click Here' },
      url: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="buttonBlock"]',
        getAttrs: (el) => ({
          text: el.querySelector('a')?.textContent?.trim() || 'Click Here',
          url: el.querySelector('a')?.getAttribute('href') || '',
        }),
      },
    ];
  },

  renderHTML({ node }) {
    const url = node.attrs.url || '#';
    const text = node.attrs.text || 'Click Here';
    return [
      'div',
      {
        'data-type': 'buttonBlock',
        style: 'text-align: center; padding: 16px 0;',
      },
      [
        'a',
        {
          href: url,
          style:
            'display: inline-block; background-color: #1d4ed8; color: #ffffff; padding: 10px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.01em;',
        },
        text,
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ButtonBlockView);
  },

  addCommands() {
    return {
      insertButtonBlock:
        () =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { text: 'Click Here', url: '' },
          }),
    };
  },
});
