import React from 'react';
import { SkipOption } from '../services/skipApi';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { formatCurrency } from '../utils/format';

export default function SkipCard({ skip, isSelected, onSelect }: { skip: SkipOption; isSelected: boolean; onSelect: (skip: SkipOption) => void; }) {
  const baseClasses = 'relative border rounded-lg p-4 flex flex-col hover:shadow-lg transition focus:outline-none focus:ring ';
  const variantClasses = isSelected ? 'border-green-600 bg-white/50 backdrop-blur-sm' : 'border-gray-200 bg-white';
  const classes = baseClasses + variantClasses;

  return (
    <button type="button" aria-pressed={isSelected} onClick={() => onSelect(skip)} className={classes}>
      {isSelected && <CheckCircleIcon className="absolute top-2 right-2 h-6 w-6 text-green-600" />}
      {skip.imageUrl &&  <img src={skip.imageUrl} alt={skip.size + ' skip'} className="w-full h-32 object-contain mb-4" />}
      <h3 className="text-lg font-semibold mb-1">{skip.size}</h3>
      {skip.description && <p className="text-sm text-gray-600 mb-2">{skip.description}</p>}
      <div className="mt-auto font-bold text-xl">{formatCurrency(skip.price)}</div>
    </button>
  );
}