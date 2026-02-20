'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function SearchBoard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      // Use empty string to stay on the current page (Home)
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="relative max-w-md w-full">
      <input
        type="text"
        placeholder="Search titles..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q') ?? ''}
        className="w-full rounded-full bg-zinc-900 border border-zinc-700 px-5 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
      />
      {isPending && (
        <div className="absolute right-4 top-2.5 h-5 w-5 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      )}
    </div>
  );
}