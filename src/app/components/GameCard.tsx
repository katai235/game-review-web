import Image from 'next/image';
import Link from 'next/link';

interface GameProps {
  title: string;
  cover_url: string;
  genre: string;
  developer: string;
  critic_score: number;
  plaform: string[];
  is_goty_2025: boolean; // 1. Add to interface
}

// 2. Add to destructuring list
export default function GameCard({ 
  title, 
  cover_url, 
  genre, 
  developer, 
  critic_score, 
  plaform, 
  is_goty_2025 
}: GameProps) {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-purple-500 transition-all group">
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Critic Score Badge */}
        <div className="absolute top-2 right-2 z-10 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded border border-zinc-700">
          {critic_score}%
        </div>

        {/* GOTY Winner Ribbon - Now this will work! */}
        {is_goty_2025 && (
          <div className="absolute top-0 left-0 z-20 bg-yellow-500 text-black text-[10px] font-black px-3 py-1 uppercase tracking-tighter shadow-lg">
            🏆 2025 Winner
          </div>
        )}

        <Image
          src={cover_url}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">{genre}</p>
        <h3 className="font-bold text-white text-lg mt-1 leading-tight">{title}</h3>
        <p className="text-zinc-500 text-xs mt-1">by {developer}</p>

        <div className="flex gap-1 mt-3">
          {plaform?.map((p) => (
            <span key={p} className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}