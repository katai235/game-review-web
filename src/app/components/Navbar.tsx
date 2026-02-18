import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-black italic tracking-tighter hover:text-purple-500 transition-colors">
          GAME VAULT '25
        </Link>

        {/* Links */}
        <div className="flex gap-8 items-center text-sm font-medium">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
            All Games
          </Link>
          <Link href="/top-rated" className="text-zinc-400 hover:text-white transition-colors">
            Top Rated
          </Link>
          <Link 
            href="/submit" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-bold transition-all text-xs"
          >
            Submit Review
          </Link>
        </div>
      </div>
    </nav>
  );
}