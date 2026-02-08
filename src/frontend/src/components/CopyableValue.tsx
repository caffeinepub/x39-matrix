import { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

interface CopyableValueProps {
  value: string;
  label?: string;
  className?: string;
}

/**
 * Reusable component for displaying a long value (like a principal ID) with copy-to-clipboard functionality.
 * Features safe wrapping/truncation and consistent feedback across desktop and mobile.
 */
export function CopyableValue({ value, label, className = '' }: CopyableValueProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy value:', err);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="flex items-start gap-2 p-3 bg-black/60 rounded border border-red-500/20">
        <code className="flex-1 text-xs text-white break-all font-mono leading-relaxed">
          {value}
        </code>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-2 hover:bg-white/10 rounded transition-colors"
          aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
          type="button"
        >
          {copied ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
      {copied && (
        <p className="text-xs text-green-500 animate-fade-in">
          Copied to clipboard!
        </p>
      )}
    </div>
  );
}
