import { createClient } from '@/app/supabase/server';
import ReviewForm from '@/app/components/ReviewForm';

export default async function SubmitPage() {
  const supabase = await createClient();

  // Fetch all games so the user can choose which one to review
  const { data: games } = await supabase
    .from('games')
    .select('id, title, slug')
    .order('title');

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Submit a Record
          </h1>
          <p className="text-zinc-500 mt-2">Add your verdict to the global archive.</p>
        </header>

        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
          {/* Note: You might need to update your ReviewForm to handle 
              selecting a game if one isn't provided via props */}
          <p className="text-sm text-zinc-400 mb-6">
            Please navigate to a specific game page to submit a review for now, 
            or use the form below if it's configured for general submission.
          </p>
          
          {/* If your ReviewForm requires a gameId, we should show the list of games here */}
          <div className="grid gap-2">
            {games?.map(game => (
              <a 
                key={game.id} 
                href={`/games/${game.slug}#review-form`}
                className="p-4 bg-zinc-800 hover:bg-purple-600 rounded-xl transition-colors flex justify-between items-center group"
              >
                <span className="font-bold">{game.title}</span>
                <span className="text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity">Review →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}