import { createClient } from '@/app/supabase/server';
import GameCard from '@/app/components/GameCard';

export default async function TopRatedPage() {
  const supabase = await createClient();

  // Fetch games sorted by critic_score (highest 100% first)
  const { data: games, error } = await supabase
    .from('games')
    .select('*')
    .order('critic_score', { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500">Database connection failed. Check your Supabase keys.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-l-4 border-purple-600 pl-6">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">
            The Top Rated Vault
          </h1>
          <p className="text-zinc-500 mt-2">The highest-rated titles of 2025/2026, ranked by critical acclaim.</p>
        </header>

        {/* The Leaderboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {games?.map((game, index) => (
            <div key={game.id} className="relative group">
              {/* Rank Badge overlay */}
              <div className="absolute -top-4 -left-4 z-30 bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black italic border-4 border-black shadow-2xl group-hover:scale-110 transition-transform">
                #{index + 1}
              </div>
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}