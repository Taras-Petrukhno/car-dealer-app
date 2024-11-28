'use client';

import Selectors from './components/selecrots/selecrots';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selectors, setSelectors] = useState({ allSelected: null, MakeId: null, year: null });

  const linkClasses = (active) => {
    return active ? 'px-12 py-3 bg-teal-900 rounded-xl text-white' : 'hidden';
  };
  return (
    <main className="flex flex-col items-center">
      <h1 className="mb-10 mt-10 font-semibold">Options for your car</h1>
      <Selectors
        className="mb-4 flex justify-center gap-x-10"
        selectors={selectors}
        setSelectors={setSelectors}
      />
      <Link
        className={linkClasses(selectors.allSelected)}
        onClick={(e) => {
          if (!selectors.allSelected) e.preventDefault();
        }}
        href={`/result/${selectors?.MakeId}/${selectors?.year}`}
      >
        Go to result page
      </Link>
    </main>
  );
}
