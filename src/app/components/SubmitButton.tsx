'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
        pending 
        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
      }`}
    >
      {pending ? (
        <>
          <span className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
          Posting to Vault...
        </>
      ) : (
        'Submit Review'
      )}
    </button>
  );
}