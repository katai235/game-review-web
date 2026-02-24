'use client';

import Image from 'next/image';
import Link from 'next/link';

interface GameProps {
  title: string;
  slug: string;        
  developer: string;
  genre: string;       
  platform: string[];  
  critic_score: number;
  cover_url: string;   
  is_goty_2025: boolean;
}

export default function GameCard({
  title,
  slug,
  cover_url,
  genre,
  developer,
  critic_score,
  platform,
  is_goty_2025
}: GameProps) {
  const gameUrl = `/games/${slug?.toLowerCase().replace(/\s+/g, '-') || 'not-found'}`;
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-purple-500 transition-all group flex flex-col h-full relative">
      
      {/* 1. WRAP THE IMAGE AND TOP INFO */}
      <Link href={gameUrl} className="flex-grow">
        <div className="relative aspect-[3/4] overflow-hidden">
          <div className="absolute top-2 right-2 z-10 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded border border-zinc-700">
            {critic_score}%
          </div>

          {is_goty_2025 && (
            <div className="absolute top-0 left-0 z-20 bg-yellow-500 text-black text-[10px] font-black px-3 py-1 uppercase tracking-tighter shadow-lg">
              🏆 2025 Winner
            </div>
          )}

          <Image
            src={cover_url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-4">
          <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">{genre}</p>
          <h3 className="font-bold text-white text-lg mt-1 leading-tight group-hover:text-purple-400 transition-colors">{title}</h3>
          <p className="text-zinc-500 text-xs mt-1 mb-3">by {developer}</p>

          <div className="flex flex-wrap gap-1">
            {platform?.map((p) => (
              <span key={p} className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700 uppercase font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* 2. THE ACTION BUTTON (Separate from the main link) */}
      <div className="p-4 pt-0 mt-auto">
        <Link
          href={`${gameUrl}#review-form`}
          className="block w-full text-center bg-zinc-800 hover:bg-purple-600 text-white text-[10px] font-black py-2.5 rounded border border-zinc-700 hover:border-purple-400 transition-all uppercase tracking-widest shadow-lg"
        >
          Review
        </Link>
      </div>
    </div>
  );
}