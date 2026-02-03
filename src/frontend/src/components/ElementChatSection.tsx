import React from 'react';
import { MessageSquare } from 'lucide-react';

export function ElementChatSection() {
  const elementChatUrl = 'https://matrix.to/#/%23x39-matrix:matrix.org';

  const handleChatClick = () => {
    window.open(elementChatUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 px-4 bg-black border-t border-[#FF0000]/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleChatClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] border-2 border-[#FF0000] rounded-lg transition-all duration-300 hover:border-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Abrir chat privado en Element (MATRIX)"
          >
            {/* Faint red-neon glow effect */}
            <div className="absolute inset-0 rounded-lg bg-[#FF0000]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon */}
            <MessageSquare className="w-6 h-6 text-[#FF0000] relative z-10 group-hover:animate-pulse" />
            
            {/* Text */}
            <span className="text-lg md:text-xl font-orbitron font-bold text-[#FF0000] relative z-10 glow-text-red group-hover:text-white transition-colors duration-300">
              Chat Privado en Element (MATRIX)
            </span>
            
            {/* Metallic finish overlay */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </button>
          
          {/* Optional subtitle */}
          <p className="mt-4 text-sm text-gray-400 font-montserrat text-center">
            Únete a nuestra comunidad en Matrix para comunicación segura y descentralizada
          </p>
        </div>
      </div>
    </section>
  );
}
