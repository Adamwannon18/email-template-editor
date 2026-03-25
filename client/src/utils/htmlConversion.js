import { mergeTags } from '../data/mergeTags';

/**
 * Convert Loops-format HTML (with {{tags}}) → TipTap-parseable HTML.
 * Uses DOMParser so {{tags}} inside href/src attributes are NOT transformed.
 */
export function htmlToTiptap(html) {
  if (!html) return '<p></p>';

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);

  const TAG_RE = /\{\{(\w+)\}\}/g;

  for (const textNode of textNodes) {
    const text = textNode.textContent;
    if (!text.includes('{{')) continue;

    const frag = doc.createDocumentFragment();
    let lastIndex = 0;
    let match;
    TAG_RE.lastIndex = 0;

    while ((match = TAG_RE.exec(text)) !== null) {
      if (match.index > lastIndex) {
        frag.appendChild(doc.createTextNode(text.slice(lastIndex, match.index)));
      }
      const span = doc.createElement('span');
      span.setAttribute('data-type', 'mergeTag');
      span.setAttribute('data-tag', match[1]);
      span.textContent = match[0];
      frag.appendChild(span);
      lastIndex = TAG_RE.lastIndex;
    }

    if (lastIndex < text.length) {
      frag.appendChild(doc.createTextNode(text.slice(lastIndex)));
    }

    textNode.parentNode.replaceChild(frag, textNode);
  }

  return doc.body.innerHTML;
}

/**
 * Convert TipTap HTML → Loops-format HTML.
 * Strips <span data-type="mergeTag" data-tag="name">…</span> → {{name}}.
 */
export function tiptapToHtml(html) {
  if (!html) return '';
  return html.replace(
    /<span data-type="mergeTag" data-tag="([^"]*)"[^>]*>[^<]*<\/span>/g,
    '{{$1}}'
  );
}
