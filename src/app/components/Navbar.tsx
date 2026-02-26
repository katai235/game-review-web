import { createClient } from '@/app/supabase/server'; 
import Link from 'next/link';

export default async function Navbar() {
  const supabase = await createClient();

  //Fetch the total count of reviews from the review_record table
  const { count, error } = await supabase
    .from('review_record')
    .select('*', { count: 'exact', head: true });

  const reviewCount = count || 0;

  return (
    <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-black italic tracking-tighter hover:text-purple-500 transition-colors">
          GAME Review
        </Link>

        {/* Links */}
        <div className="flex gap-8 items-center text-sm font-medium">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
            All Games
          </Link>
          <Link href="/top-rated" className="text-zinc-400 hover:text-white transition-colors">
            Top Rated
          </Link>
          
          {/* BUTTON: shows the count */}
          <Link 
            href="/submit" 
            className="group flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-bold transition-all text-xs shadow-[0_0_15px_-3px_rgba(147,51,234,0.5)]"
          >
            <span>Submit Review</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] group-hover:bg-white/30 transition-colors">
              {reviewCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}