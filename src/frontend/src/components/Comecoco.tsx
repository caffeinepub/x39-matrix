import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  x: number;
  y: number;
  color: string;
}

export function Comecoco() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover' | 'win'>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  // Game constants
  const CELL_SIZE = 20;
  const GRID_WIDTH = 28;
  const GRID_HEIGHT = 31;
  const PACMAN_SPEED = 2;
  const GHOST_SPEED = 1.5;

  // Game state refs
  const pacmanPos = useRef<Position>({ x: 14, y: 23 });
  const pacmanDir = useRef<Position>({ x: 0, y: 0 });
  const nextDir = useRef<Position>({ x: 0, y: 0 });
  const ghosts = useRef<Ghost[]>([
    { x: 13, y: 11, color: '#FF0000' },
    { x: 14, y: 11, color: '#FFB8FF' },
    { x: 13, y: 14, color: '#00FFFF' },
    { x: 14, y: 14, color: '#FFB852' },
  ]);
  const dots = useRef<boolean[][]>([]);
  const animationFrame = useRef<number>(0);

  // Simple maze layout (1 = wall, 0 = path)
  const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ];

  // Initialize dots
  useEffect(() => {
    const newDots: boolean[][] = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
      newDots[y] = [];
      for (let x = 0; x < GRID_WIDTH; x++) {
        newDots[y][x] = maze[y][x] === 0;
      }
    }
    dots.current = newDots;
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      switch (e.key) {
        case 'ArrowUp':
          nextDir.current = { x: 0, y: -1 };
          e.preventDefault();
          break;
        case 'ArrowDown':
          nextDir.current = { x: 0, y: 1 };
          e.preventDefault();
          break;
        case 'ArrowLeft':
          nextDir.current = { x: -1, y: 0 };
          e.preventDefault();
          break;
        case 'ArrowRight':
          nextDir.current = { x: 1, y: 0 };
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = 0;
    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw maze
      ctx.fillStyle = '#0000FF';
      for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
          if (maze[y][x] === 1) {
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        }
      }

      // Draw dots
      ctx.fillStyle = '#FFB852';
      for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
          if (dots.current[y] && dots.current[y][x]) {
            ctx.beginPath();
            ctx.arc(
              x * CELL_SIZE + CELL_SIZE / 2,
              y * CELL_SIZE + CELL_SIZE / 2,
              3,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }

      // Update Pac-Man direction
      const nextX = Math.floor(pacmanPos.current.x + nextDir.current.x);
      const nextY = Math.floor(pacmanPos.current.y + nextDir.current.y);
      if (nextX >= 0 && nextX < GRID_WIDTH && nextY >= 0 && nextY < GRID_HEIGHT) {
        if (maze[nextY][nextX] === 0) {
          pacmanDir.current = { ...nextDir.current };
        }
      }

      // Move Pac-Man
      const newX = pacmanPos.current.x + pacmanDir.current.x * 0.1;
      const newY = pacmanPos.current.y + pacmanDir.current.y * 0.1;
      const gridX = Math.floor(newX);
      const gridY = Math.floor(newY);

      if (gridX >= 0 && gridX < GRID_WIDTH && gridY >= 0 && gridY < GRID_HEIGHT) {
        if (maze[gridY][gridX] === 0) {
          pacmanPos.current = { x: newX, y: newY };

          // Collect dots
          if (dots.current[gridY] && dots.current[gridY][gridX]) {
            dots.current[gridY][gridX] = false;
            setScore((prev) => prev + 10);
          }
        }
      }

      // Draw Pac-Man
      ctx.fillStyle = '#FFFF00';
      ctx.beginPath();
      ctx.arc(
        pacmanPos.current.x * CELL_SIZE + CELL_SIZE / 2,
        pacmanPos.current.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0.2 * Math.PI,
        1.8 * Math.PI
      );
      ctx.lineTo(
        pacmanPos.current.x * CELL_SIZE + CELL_SIZE / 2,
        pacmanPos.current.y * CELL_SIZE + CELL_SIZE / 2
      );
      ctx.fill();

      // Move and draw ghosts
      ghosts.current.forEach((ghost) => {
        // Simple ghost AI - move towards Pac-Man
        const dx = pacmanPos.current.x - ghost.x;
        const dy = pacmanPos.current.y - ghost.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          const moveX = (dx / distance) * 0.05;
          const moveY = (dy / distance) * 0.05;

          const newGhostX = ghost.x + moveX;
          const newGhostY = ghost.y + moveY;
          const ghostGridX = Math.floor(newGhostX);
          const ghostGridY = Math.floor(newGhostY);

          if (
            ghostGridX >= 0 &&
            ghostGridX < GRID_WIDTH &&
            ghostGridY >= 0 &&
            ghostGridY < GRID_HEIGHT &&
            maze[ghostGridY][ghostGridX] === 0
          ) {
            ghost.x = newGhostX;
            ghost.y = newGhostY;
          }
        }

        // Draw ghost
        ctx.fillStyle = ghost.color;
        ctx.beginPath();
        ctx.arc(
          ghost.x * CELL_SIZE + CELL_SIZE / 2,
          ghost.y * CELL_SIZE + CELL_SIZE / 2,
          CELL_SIZE / 2 - 2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Check collision with Pac-Man
        const collisionDist = Math.sqrt(
          Math.pow(pacmanPos.current.x - ghost.x, 2) +
          Math.pow(pacmanPos.current.y - ghost.y, 2)
        );
        if (collisionDist < 0.5) {
          setLives((prev) => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameState('gameover');
            } else {
              // Reset positions
              pacmanPos.current = { x: 14, y: 23 };
              pacmanDir.current = { x: 0, y: 0 };
              nextDir.current = { x: 0, y: 0 };
            }
            return newLives;
          });
        }
      });

      // Check win condition
      let dotsRemaining = 0;
      for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
          if (dots.current[y] && dots.current[y][x]) {
            dotsRemaining++;
          }
        }
      }
      if (dotsRemaining === 0) {
        setGameState('win');
      }

      animationFrame.current = requestAnimationFrame(gameLoop);
    };

    animationFrame.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [gameState]);

  const startGame = () => {
    // Reset game state
    pacmanPos.current = { x: 14, y: 23 };
    pacmanDir.current = { x: 0, y: 0 };
    nextDir.current = { x: 0, y: 0 };
    ghosts.current = [
      { x: 13, y: 11, color: '#FF0000' },
      { x: 14, y: 11, color: '#FFB8FF' },
      { x: 13, y: 14, color: '#00FFFF' },
      { x: 14, y: 14, color: '#FFB852' },
    ];

    // Reset dots
    const newDots: boolean[][] = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
      newDots[y] = [];
      for (let x = 0; x < GRID_WIDTH; x++) {
        newDots[y][x] = maze[y][x] === 0;
      }
    }
    dots.current = newDots;

    setScore(0);
    setLives(3);
    setGameState('playing');
  };

  const returnToMenu = () => {
    setGameState('menu');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* Title */}
      <header className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-red-500 neon-text-red font-orbitron mb-2">
          Comecoco
        </h2>
        <p className="text-gray-400 text-lg">
          Juego clásico estilo Pac-Man
        </p>
      </header>

      {/* Game Canvas */}
      <div className="relative bg-black border-4 border-red-500/50 rounded-lg shadow-red-glow">
        <canvas
          ref={canvasRef}
          width={GRID_WIDTH * CELL_SIZE}
          height={GRID_HEIGHT * CELL_SIZE}
          className="block"
        />

        {/* Menu Overlay */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-6 rounded-lg">
            <h3 className="text-3xl font-bold text-yellow-400 font-orbitron">
              ¡Comecoco!
            </h3>
            <p className="text-white text-center px-4">
              Usa las flechas del teclado para moverte
            </p>
            <Button
              onClick={startGame}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 text-lg"
            >
              Jugar
            </Button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-6 rounded-lg">
            <h3 className="text-3xl font-bold text-red-500 font-orbitron neon-text-red">
              Game Over
            </h3>
            <p className="text-white text-xl">
              Puntuación: {score}
            </p>
            <div className="flex gap-4">
              <Button
                onClick={startGame}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2"
              >
                Reintentar
              </Button>
              <Button
                onClick={returnToMenu}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                Menú
              </Button>
            </div>
          </div>
        )}

        {/* Win Overlay */}
        {gameState === 'win' && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-6 rounded-lg">
            <h3 className="text-3xl font-bold text-yellow-400 font-orbitron">
              ¡Victoria!
            </h3>
            <p className="text-white text-xl">
              Puntuación Final: {score}
            </p>
            <div className="flex gap-4">
              <Button
                onClick={startGame}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2"
              >
                Jugar de Nuevo
              </Button>
              <Button
                onClick={returnToMenu}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                Menú
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Score and Lives Display */}
      {gameState === 'playing' && (
        <div className="flex gap-8 text-white text-lg font-orbitron">
          <div>
            <span className="text-red-500">Puntos:</span> {score}
          </div>
          <div>
            <span className="text-red-500">Vidas:</span> {lives}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-gray-400 text-sm max-w-md">
        <p>
          Usa las teclas de flecha para mover a Pac-Man. Recoge todos los puntos mientras evitas a los fantasmas.
        </p>
      </div>
    </div>
  );
}
