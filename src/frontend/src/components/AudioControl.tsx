import React from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { UseBackgroundAudioReturn } from '../hooks/useBackgroundAudio';

interface AudioControlProps {
  audio: UseBackgroundAudioReturn;
}

/**
 * Audio control component with mute/unmute and play/pause buttons
 * Displays remaining time when playing
 */
export function AudioControl({ audio }: AudioControlProps) {
  const { isPlaying, isMuted, isLoaded, error, remainingSeconds, toggleMute, play, stop } = audio;

  const handlePlayPause = async () => {
    if (isPlaying) {
      stop();
    } else {
      try {
        await play();
      } catch (err) {
        console.error('[AudioControl] Play failed:', err);
      }
    }
  };

  if (error) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <VolumeX className="w-4 h-4" />
        <span>Audio unavailable</span>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <Volume2 className="w-4 h-4 animate-pulse" />
        <span>Loading audio...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        disabled={!isLoaded}
        className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title={isPlaying ? 'Pause music' : 'Play Chopin Nocturne No. 9'}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-500 font-orbitron">{remainingSeconds}s</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-400 font-orbitron">Chopin</span>
          </>
        )}
      </button>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        disabled={!isLoaded}
        className="p-2 bg-black/50 hover:bg-black/70 border border-red-500/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-gray-500" />
        ) : (
          <Volume2 className="w-4 h-4 text-red-500" />
        )}
      </button>
    </div>
  );
}
