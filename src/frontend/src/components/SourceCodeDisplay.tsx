import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface SourceCodeDisplayProps {
  files: Array<{
    path: string;
    content: string;
  }>;
}

export function SourceCodeDisplay({ files }: SourceCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullCode = files.map(file => `// ${file.path}\n${file.content}`).join('\n\n');
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="source-code-display-container w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header with Copy Button */}
      <div className="flex items-center justify-between mb-6 p-4 bg-black/80 border border-red-500/50 rounded-lg backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-red-500 neon-text-red font-orbitron">
          Código Fuente de Componentes
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-6 py-3 bg-black border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all duration-300 font-orbitron"
          style={{
            textShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
          }}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span>Copiar código</span>
            </>
          )}
        </button>
      </div>

      {/* Code Display Area */}
      <div className="code-display-area bg-black/90 border-2 border-red-500/50 rounded-lg overflow-hidden backdrop-blur-sm">
        {files.map((file, index) => (
          <div key={index} className="file-section">
            {/* File Path Header */}
            <div className="file-header bg-red-500/10 border-b border-red-500/30 px-6 py-3">
              <p className="text-red-400 font-mono text-sm font-semibold">
                {file.path}
              </p>
            </div>

            {/* Code Content */}
            <div className="code-content p-6 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                <code>{file.content}</code>
              </pre>
            </div>

            {/* Separator between files */}
            {index < files.length - 1 && (
              <div className="border-t-2 border-red-500/30 my-4" />
            )}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-black/60 border border-red-500/30 rounded-lg backdrop-blur-sm">
        <p className="text-gray-400 text-sm text-center font-mono">
          Componentes del frontend de x39 Matrix - Código completo disponible para revisión
        </p>
      </div>
    </div>
  );
}
