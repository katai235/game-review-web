import Image from 'next/image';
import Link from 'next/link';

export default function GameCard({ title, critic_score, cover_url, slug, genre, isAward }: any) {
  return (
    <Link href={`/games/${slug}`} className={`group relative block rounded-xl overflow-hidden transition-all ${isAward ? 'border-2 border-yellow-500/50' : 'bg-zinc-900'}`}>
      <div className={`relative ${isAward ? 'aspect-video' : 'aspect-[3/4]'}`}>
        
        {/* --- PASTE THE FIX HERE --- */}
        <Image 
          src={cover_url || 'https://placehold.co/400x600/1a1a1a/666666?text=No+Image'} 
          alt={title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform" 
        />
        {/* -------------------------- */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/20 text-xs font-bold">
          {critic_score}%
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-[10px] text-purple-400 font-bold uppercase tracking-tighter">{genre}</p>
        <h3 className="font-bold text-lg leading-tight group-hover:text-purple-400 transition-colors">{title}</h3>
      </div>
    </Link>
  );
}