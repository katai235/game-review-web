import { Suspense } from 'react';
import { createClient } from '@/app/supabase/server'; 
import GameCard from '@/app/components/GameCard';
import SearchBoard from '@/app/components/SearchBoard';

export default async function HomePage(props: { 
  searchParams: Promise<{ q?: string }> 
}) {
  const searchParams = await props.searchParams;
  const q = searchParams?.q; // Safety check

  const supabase = await createClient();

  const { data: winners } = await supabase
    .from('games')
    .select('*')
    .eq('is_goty_2025', true)
    .limit(3);

  const { data: gotyGames } = await supabase
  .from('games')
  .select('*')
  .eq('is_goty_2025', true)
  .order('critic_score', { ascending: false });

  let query = supabase.from('games').select('*');
  if (q) query = query.ilike('title', `%${q}%`);
  const { data: allGames } = await query;

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black italic uppercase">Game Vault '25</h1>
        <Suspense fallback={<div className="h-10 w-48 bg-zinc-900 animate-pulse rounded-full" />}>
          <SearchBoard />
        </Suspense>
      </div>

      {!q && winners && (
        <section className="mb-16">
          <h2 className="text-yellow-500 font-bold mb-6 italic tracking-widest uppercase">🏆 GOTY Nominees</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {winners.map(game => <GameCard key={game.id} {...game} isAward={true} />)}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-zinc-500 font-bold mb-6 uppercase tracking-widest text-sm">
           {q ? `Results for "${q}"` : "Recently Reviewed"}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {allGames?.map(game => <GameCard key={game.id} {...game} />)}
        </div>
      </section>
    </main>
  );
}
