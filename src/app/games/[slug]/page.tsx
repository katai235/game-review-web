import { createClient } from '@/app/supabase/server';
import { notFound } from 'next/navigation';
import ReviewForm from '@/app/components/ReviewForm';

export default async function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: game } = await supabase
    .from('games')
    .select('*, reviews(*)')
    .eq('slug', slug)
    .single();

  if (!game) notFound();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <img src={game.cover_url} className="w-full md:w-64 rounded-xl border border-zinc-800" alt={game.title} />
          <div>
            <h1 className="text-5xl font-black mb-2 uppercase">{game.title}</h1>
            <p className="text-purple-500 font-bold mb-4">{game.genre} | 2025 Release</p>
            <div className="inline-block bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl">
              <span className="block text-xs text-zinc-500 uppercase">Average Score</span>
              <span className="text-4xl font-black">{game.critic_score}%</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">User Reviews</h2>
            <div className="space-y-4">
              {game.reviews?.map((r: any) => (
                <div key={r.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <span className="text-yellow-500 font-bold">★ {r.rating}/10</span>
                  <p className="text-zinc-300 mt-2">{r.content}</p>
                </div>
              ))}
              {game.reviews?.length === 0 && <p className="text-zinc-500 italic">No reviews yet. Be the first!</p>}
            </div>
          </section>

          <section>
            <ReviewForm gameId={game.id} slug={game.slug} />
          </section>
        </div>
      </div>
    </div>
  );
}