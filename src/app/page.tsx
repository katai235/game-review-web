import { Suspense } from 'react';
import { createClient } from '@/app/supabase/server';
import GameCard from '@/app/components/GameCard';
import SearchBoard from '@/app/components/SearchBoard';
import GOTYBoard from '@/app/components/GOTYBoard';

export default async function HomePage(props: {
  searchParams: Promise<{ q?: string }>
}) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q;
  const supabase = await createClient();

  // 1. Fetch data for Winners (Nominees)
  const { data: winners } = await supabase
    .from('games')
    .select('*')
    .eq('is_goty_2025', true)
    .order('critic_score', { ascending: false });

  // 2. Fetch All Games (Searchable)
  let query = supabase.from('games').select('*');
  if (q) query = query.ilike('title', `%${q}%`);
  const { data: allGames } = await query;

  return (
    <div className="py-8 space-y-12">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">
          Archive Records
        </h1>
        <Suspense fallback={<div className="h-10 w-48 bg-zinc-900 animate-pulse rounded-full" />}>
          <SearchBoard />
        </Suspense>
      </section>

      {/* Hall of Fame (GOTY) Section */}
      <GOTYBoard />

      {/* Main Grid Section */}
      <section>
        <h2 className="text-zinc-500 font-bold mb-6 uppercase tracking-widest text-xs">
          {q ? `Results for "${q}"` : 'Recently Archived'}
        </h2>
        
        {/* RESPONSIVE GRID: 1 col on mobile, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allGames && allGames.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>

        {(!allGames || allGames.length === 0) && (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 italic">No records found matching your query.</p>
          </div>
        )}
      </section>
    </div>
  );
}
