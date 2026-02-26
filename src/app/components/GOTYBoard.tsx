import { createClient } from '@/app/supabase/server'; 
import Link from 'next/link';

export default async function GOTYBoard() {
  const supabase = await createClient();
  
  const { data: awardWinners, error } = await supabase
    .from('games')
    .select(`
      *,
      country_votes (*),
      game_awards (*)
    `)
    .eq('is_goty_2025', true);

  if (error || !awardWinners || awardWinners.length === 0) return null;

  return (
    <section className="py-12 px-6 bg-zinc-950 rounded-3xl border border-yellow-500/20 my-10">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-4xl">🏆</span>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
          The 2025 Hall of Fame
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {awardWinners.map((game) => {
          const votesArray = (game.country_votes as any[]) || [];
          const awardsArray = (game.game_awards as any[]) || []; 
          
          const totalVotes = votesArray.reduce((acc, curr) => acc + (curr.vote_count || 0), 0);
          const topRegionRecord = [...votesArray].sort((a, b) => b.vote_count - a.vote_count)[0];
          const topRegionName = topRegionRecord ? topRegionRecord.country_name : 'N/A';
          const topRegionScore = topRegionRecord ? topRegionRecord.avg_score : 0;

          return (
            
            <div key={game.id} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between h-full hover:border-yellow-500/40 transition-all">
              <div>
                {/* AWARDS SECTION */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {awardsArray.length > 0 ? (
                    awardsArray.map((award) => (
                      <span key={award.id} className="text-yellow-500 text-[9px] font-black uppercase tracking-widest bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20 flex items-center gap-1">
                        🏆 {award.award_name}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest bg-zinc-800/50 px-2 py-1 rounded">
                      Nominee
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white leading-tight">{game.title}</h3>
                <p className="text-zinc-500 text-sm mt-1 mb-4">{game.developer}</p>
              </div>

              {/* STATS SECTION - Ensure no <p> tags wrap these <div>s */}
              <div className="mt-6 pt-4 border-t border-zinc-800 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">Global Popularity</span>
                    <span className="text-white font-black">{totalVotes.toLocaleString()} Votes</span>
                  </div>
                  <div className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter">
                    Top: {topRegionName}
                  </div>
                </div>

                {topRegionRecord && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      {/* Use <span> instead of <div> inside small text blocks */}
                      <span className="text-zinc-500 text-[9px] uppercase font-bold">
                        Avg Score in {topRegionName}
                      </span>
                      <span className="text-zinc-300 text-[9px] font-black">
                        {topRegionScore}%
                      </span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                        style={{ width: `${topRegionScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
