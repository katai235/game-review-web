import { createClient } from '@/app/supabase/server';
import { revalidatePath } from 'next/cache';

export default function ReviewForm({ gameId, slug }: { gameId: string, slug: string }) {
  async function addReview(formData: FormData) {
    'use server';
    const supabase = await createClient();
    
    const rating = formData.get('rating');
    const content = formData.get('content');

    await supabase.from('reviews').insert({
      game_id: gameId,
      rating: Number(rating),
      content: content
    });

    revalidatePath(`/games/${slug}`);
  }

  return (
    <form action={addReview} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 sticky top-8">
      <h3 className="text-xl font-bold mb-4">Rate this Game</h3>
      <input name="rating" type="number" min="1" max="10" placeholder="Score (1-10)" required className="w-full bg-black border border-zinc-700 p-2 rounded mb-4" />
      <textarea name="content" placeholder="Write your thoughts..." required className="w-full bg-black border border-zinc-700 p-2 rounded mb-4 h-32" />
      <button className="w-full bg-purple-600 hover:bg-purple-700 font-bold py-3 rounded-lg transition-colors">
        Submit Review
      </button>
    </form>
  );
}