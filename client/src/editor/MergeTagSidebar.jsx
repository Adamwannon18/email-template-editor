import { useState } from 'react';
import { mergeTags } from '../data/mergeTags';

export default function MergeTagSidebar({ onInsertTag }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className="bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-hidden transition-all duration-200"
      style={{ width: isOpen ? 200 : 36 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-2.5 py-2.5 border-b border-gray-100 min-h-[40px]">
        {isOpen && (
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide leading-none">Merge Tags</p>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-none">Click to insert</p>
          </div>
        )}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0 ml-auto"
          title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Tag list */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
          {mergeTags.map(({ tag, label }) => {
            const tagName = tag.slice(2, -2); // strip {{ and }}
            return (
              <button
                key={tag}
                onClick={() => onInsertTag(tagName)}
                className="text-left w-full px-2.5 py-2 rounded-md hover:bg-blue-50 transition-colors group cursor-pointer"
              >
                <div className="text-xs font-medium text-gray-700 group-hover:text-blue-700 leading-tight truncate">
                  {label}
                </div>
                <div className="text-[10px] text-gray-400 group-hover:text-blue-500 font-mono mt-0.5 leading-tight truncate">
                  {tag}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </aside>
  );
}
