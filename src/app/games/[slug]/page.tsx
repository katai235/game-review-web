import { createClient } from '@/app/supabase/server';
import { notFound } from 'next/navigation';
import ReviewForm from '@/app/components/ReviewForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper for YouTube
const getEmbedUrl = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const id = (match && match[2].length === 11) ? match[2] : null;
  return id ? `https://www.youtube.com/embed/${id}` : null;
};

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // 3. UPDATED QUERY: This fetches game info AND all linked reviews
  const { data: game, error } = await supabase
    .from('games')
    .select(`
      *,
      review_record (*)
    `)
    .eq('slug', slug)
    .single();

  if (error || !game) {
    notFound();
  }

  const embedUrl = getEmbedUrl(game.trailer_url);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <img src={game.cover_url} className="w-full md:w-64 rounded-xl border border-zinc-800 shadow-2xl" alt={game.title} />
          <div>
            <h1 className="text-5xl font-black mb-2 uppercase tracking-tighter">{game.title}</h1>
            <p className="text-purple-500 font-bold mb-4 uppercase text-xs tracking-widest">
              {game.genre} | {game.developer}
            </p>
            <div className="inline-block bg-zinc-900 border border-zinc-700 px-6 py-4 rounded-2xl">
              <span className="block text-xs text-zinc-500 uppercase font-bold">Critic Score</span>
              <span className="text-4xl font-black text-purple-400">{game.critic_score}%</span>
            </div>
          </div>
        </div>

        {/* TRAILER SECTION */}
        {embedUrl && (
          <div className="mb-12">
            <h2 className="text-sm font-black uppercase text-zinc-500 mb-4 tracking-widest">Archive Footage</h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800">
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* USER RECORDS SECTION */}
          <section>
            <h2 className="text-2xl font-black mb-6 uppercase italic">User Records</h2>
            <div className="space-y-4">
              {/* Changed game.reviews to game.review_record to match your DB */}
              {game.review_record?.map((r: any) => (
                <div key={r.id} className="bg-zinc-900/50 p-5 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-yellow-500 font-black text-sm">RATE: {r.rating}/10</span>
                    <span className="text-[10px] text-zinc-600 uppercase font-bold">
                      {new Date(r.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{r.content}</p>
                </div>
              ))}
              
              {(!game.review_record || game.review_record.length === 0) && (
                <div className="p-8 border-2 border-dashed border-zinc-900 rounded-xl text-center text-zinc-600">
                  No records found in the vault.
                </div>
              )}
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