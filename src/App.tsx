import React, { useState } from 'react';
import { useSkips } from './hooks/useSkips';
import SkipGrid from './components/SkipGrid';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { formatCurrency } from './utils/format';
import { SkipOption } from './services/skipApi';

export default function App() {
  const { skips, loading, error } = useSkips('NR32', 'Lowestoft');
  const [selected, setSelected] = useState<SkipOption | null>(null);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose your skip size</h1>
      <SkipGrid skips={skips} selectedId={selected?.id || null} onSelect={setSelected} />
      <div className="mt-8 flex justify-center">
        <button disabled={!selected} className="bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50">Continue</button>
      </div>
   {selected && (
  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-center">
    Selected: <strong>{selected.size}</strong> at {formatCurrency(selected.price)}
    {/* Uyarı metni */}
    <p className="mt-3 text-xs text-gray-500 max-w-2xl mx-auto">
      Imagery and information shown throughout this website may not reflect the exact
      shape or size specification, colours may vary, options and/or accessories may
      be featured at additional cost.
    </p>
  </div>
)}

    </div>
  );
}