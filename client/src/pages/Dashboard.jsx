import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultTemplates } from '../data/defaultTemplates';
import { api } from '../services/api';
import { useMediator } from '../App';

function StatusBadge({ status }) {
  if (status === 'Customized') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        Customized
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
      Default
    </span>
  );
}

function formatDate(isoString) {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { mediator } = useMediator();
  const [customizations, setCustomizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.listTemplates(mediator.slug)
      .then((res) => setCustomizations(res.data ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [mediator.slug]);

  const rows = defaultTemplates.map((def) => {
    const match = customizations.find((c) => c.id === def.id);
    return {
      ...def,
      status: match ? 'Customized' : 'Default',
      lastModified: match?.updatedAt ?? null,
    };
  });

  return (
    <div className="max-w-5xl mx-auto w-full px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Email Templates</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage transactional email templates for <span className="font-medium text-gray-700">{mediator.name}</span>. Customized templates override the system defaults.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          Failed to load templates: {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Template</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide">Last Modified</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  i === rows.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900">{row.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{row.description}</div>
                </td>
                <td className="px-5 py-4">
                  {loading ? (
                    <span className="inline-block w-20 h-5 bg-gray-100 rounded-full animate-pulse"></span>
                  ) : (
                    <StatusBadge status={row.status} />
                  )}
                </td>
                <td className="px-5 py-4 text-gray-500">
                  {loading ? (
                    <span className="inline-block w-24 h-4 bg-gray-100 rounded animate-pulse"></span>
                  ) : (
                    formatDate(row.lastModified)
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => navigate(`/edit/${row.id}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors cursor-pointer"
                  >
                    Edit
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
