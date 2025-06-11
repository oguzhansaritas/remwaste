// src/components/SkipGrid.tsx
import React, { useRef } from 'react';
import SkipCard from './SkipCard';
import { SkipOption } from '../services/skipApi';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function SkipGrid({
  skips,
  selectedId,
  onSelect
}: {
  skips: SkipOption[];
  selectedId: string | null;
  onSelect: (skip: SkipOption) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (listRef.current) {
      const { clientWidth } = listRef.current;
      listRef.current.scrollBy({ left: dir === 'left' ? -clientWidth : clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
      </button>

      {/* Card List */}
    <div
  ref={listRef}
  className="
    flex flex-col   /* mobile: dikey akış */
    items-center    /* mobile: tüm kartları ortalar */
    md:flex-row     /* md+: yatay */
    md:items-stretch
    overflow-y-auto md:overflow-x-auto
    gap-6 p-2
  "
  style={{ WebkitOverflowScrolling: 'touch' }}
>

        {skips.map((skip) => (
          <div key={skip.id} className="flex-shrink-0">
            <SkipCard skip={skip} isSelected={skip.id === selectedId} onSelect={onSelect} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
}
