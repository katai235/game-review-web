'use client';

import { createClient } from '@/app/supabase/client'; // Point to the new file
import { useRouter } from 'next/navigation';

export default function ReviewForm({ gameId, slug }: { gameId: string, slug: string }) {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    // 1. CAPTURE THE FORM HERE (Before the await)
    const form = event.currentTarget; 
    
    const supabase = createClient();
    const formData = new FormData(form); // Use 'form' instead of 'event.currentTarget'

    const rating = Number(formData.get('rating'));
    const content = formData.get('content');

    // 2. The Insert Logic
    const { error } = await supabase
      .from('review_record')
      .insert({
        game_id: gameId,
        rating: rating,
        content: content,
      });

    if (error) {
      console.error("Submission error:", error.message);
      alert("Error: " + error.message);
    } else {
      // 3. SUCCESS! Use the 'form' variable we saved earlier
      form.reset(); 
      router.refresh(); 
      alert("Review Recorded in the Vault!");
    }
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-purple-500/50">
      <h3 className="text-xl font-bold mb-4">Rate this Game</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="rating" type="number" min="1" max="10" placeholder="Score (1-10)" required className="bg-black border border-zinc-800 p-3 rounded text-white" />
        <textarea name="content" placeholder="Write thoughts..." required className="bg-black border border-zinc-800 p-3 rounded text-white h-32" />
        <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition-all uppercase">
          Submit
        </button>
      </form>
    </div>
  );
}