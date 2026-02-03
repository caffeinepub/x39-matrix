import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Game state management
interface GameState {
  score: number;
  lives: number;
  isPlaying: boolean;
  isGameOver: boolean;
  isVictory: boolean;
  enemiesEaten: number;
  icpCollected: number;
}

// Enemy types
type EnemyType = 'BTC' | 'SOL' | 'ETH';

interface Enemy {
  id: string;
  type: EnemyType;
  position: THREE.Vector3;
  health: number;
}

interface Collectible {
  id: string;
  position: THREE.Vector3;
}

// Keyboard state
interface KeyboardState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

// ICP Player Character Component
function ICPPlayer({ position }: { position: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* ICP Logo - Torus shape representing the ICP infinity symbol */}
      <mesh ref={meshRef} castShadow>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial
          color="#FF0000"
          metalness={0.9}
          roughness={0.1}
          emissive="#FF0000"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Inner glow */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.5, 0.15, 16, 32]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.5} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.3}
        color="#FF0000"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        ICP
      </Text>
    </group>
  );
}

// Enemy Character Component
function EnemyCharacter({ enemy }: { enemy: Enemy }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const colors: Record<EnemyType, string> = {
    BTC: '#F7931A',
    SOL: '#14F195',
    ETH: '#627EEA',
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.03;
      meshRef.current.rotation.x += 0.02;
    }
  });

  return (
    <group position={enemy.position}>
      <mesh ref={meshRef} castShadow>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={colors[enemy.type]}
          metalness={0.7}
          roughness={0.3}
          emissive={colors[enemy.type]}
          emissiveIntensity={0.4}
        />
      </mesh>
      <Text
        position={[0, 0.9, 0]}
        fontSize={0.25}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {enemy.type}
      </Text>
    </group>
  );
}

// ICP Collectible Component
function ICPCollectible({ collectible }: { collectible: Collectible }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.05;
      meshRef.current.position.y = collectible.position.y + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <group position={collectible.position}>
      <mesh ref={meshRef} castShadow>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial
          color="#FF0000"
          metalness={0.9}
          roughness={0.1}
          emissive="#FF0000"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Glow effect */}
      <pointLight color="#FF0000" intensity={0.5} distance={2} />
    </group>
  );
}

// Game Scene Component
function GameScene({
  gameState,
  playerPosition,
  onCollision,
  keyboardState,
}: {
  gameState: GameState;
  playerPosition: THREE.Vector3;
  onCollision: (type: 'enemy' | 'collectible', id: string) => void;
  keyboardState: KeyboardState;
}) {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const playerPosRef = useRef(playerPosition);

  // Update player position reference
  useEffect(() => {
    playerPosRef.current = playerPosition;
  }, [playerPosition]);

  // Spawn enemies
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const spawnInterval = setInterval(() => {
      const types: EnemyType[] = ['BTC', 'SOL', 'ETH'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const angle = Math.random() * Math.PI * 2;
      const distance = 15 + Math.random() * 5;

      const newEnemy: Enemy = {
        id: `enemy-${Date.now()}-${Math.random()}`,
        type: randomType,
        position: new THREE.Vector3(
          Math.cos(angle) * distance,
          0.5,
          Math.sin(angle) * distance
        ),
        health: 100,
      };

      setEnemies((prev) => [...prev, newEnemy]);
    }, 2500);

    return () => clearInterval(spawnInterval);
  }, [gameState.isPlaying]);

  // Spawn collectibles
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const spawnInterval = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 8 + Math.random() * 8;

      const newCollectible: Collectible = {
        id: `icp-${Date.now()}-${Math.random()}`,
        position: new THREE.Vector3(
          Math.cos(angle) * distance,
          0.5,
          Math.sin(angle) * distance
        ),
      };

      setCollectibles((prev) => [...prev, newCollectible]);
    }, 3500);

    return () => clearInterval(spawnInterval);
  }, [gameState.isPlaying]);

  // Update enemy positions (AI chase behavior) and check collisions
  useFrame((state, delta) => {
    if (!gameState.isPlaying) return;

    const playerPos = playerPosRef.current;
    const collisionDistance = 1.0;
    const collectibleDistance = 0.8;

    // Update enemies - chase player
    setEnemies((prev) => {
      const updated = prev.map((enemy) => {
        // Calculate direction to player
        const direction = new THREE.Vector3()
          .subVectors(playerPos, enemy.position)
          .normalize();

        // Move enemy towards player
        const speed = 2.5 * delta;
        const newPosition = enemy.position.clone().add(direction.multiplyScalar(speed));

        return {
          ...enemy,
          position: newPosition,
        };
      });

      // Check collisions with player
      return updated.filter((enemy) => {
        const distance = enemy.position.distanceTo(playerPos);
        if (distance < collisionDistance) {
          onCollision('enemy', enemy.id);
          return false; // Remove enemy
        }
        return true;
      });
    });

    // Check collectible collisions
    setCollectibles((prev) =>
      prev.filter((collectible) => {
        const distance = collectible.position.distanceTo(playerPos);
        if (distance < collectibleDistance) {
          onCollision('collectible', collectible.id);
          return false; // Remove collectible
        }
        return true;
      })
    );
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#FF0000" />
      <pointLight position={[-10, 3, -10]} intensity={0.3} color="#FF0000" />
      <pointLight position={[10, 3, 10]} intensity={0.3} color="#FF0000" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.5, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#000000" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Grid */}
      <gridHelper args={[60, 60, '#FF0000', '#330000']} position={[0, -0.49, 0]} />

      {/* Player */}
      <ICPPlayer position={playerPosition} />

      {/* Enemies */}
      {enemies.map((enemy) => (
        <EnemyCharacter key={enemy.id} enemy={enemy} />
      ))}

      {/* Collectibles */}
      {collectibles.map((collectible) => (
        <ICPCollectible key={collectible.id} collectible={collectible} />
      ))}
    </>
  );
}

// Main Game Component
export function X39ICPGame({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    isPlaying: false,
    isGameOver: false,
    isVictory: false,
    enemiesEaten: 0,
    icpCollected: 0,
  });
  const [playerPosition, setPlayerPosition] = useState(new THREE.Vector3(0, 0.5, 0));
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const playerPositionRef = useRef(playerPosition);
  const keyboardStateRef = useRef(keyboardState);

  // Update refs
  useEffect(() => {
    playerPositionRef.current = playerPosition;
  }, [playerPosition]);

  useEffect(() => {
    keyboardStateRef.current = keyboardState;
  }, [keyboardState]);

  // Keyboard controls
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') {
        setKeyboardState((prev) => ({ ...prev, forward: true }));
      }
      if (key === 's' || key === 'arrowdown') {
        setKeyboardState((prev) => ({ ...prev, backward: true }));
      }
      if (key === 'a' || key === 'arrowleft') {
        setKeyboardState((prev) => ({ ...prev, left: true }));
      }
      if (key === 'd' || key === 'arrowright') {
        setKeyboardState((prev) => ({ ...prev, right: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') {
        setKeyboardState((prev) => ({ ...prev, forward: false }));
      }
      if (key === 's' || key === 'arrowdown') {
        setKeyboardState((prev) => ({ ...prev, backward: false }));
      }
      if (key === 'a' || key === 'arrowleft') {
        setKeyboardState((prev) => ({ ...prev, left: false }));
      }
      if (key === 'd' || key === 'arrowright') {
        setKeyboardState((prev) => ({ ...prev, right: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.isPlaying]);

  // Player movement loop
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const moveSpeed = 5;
    const maxDistance = 25;

    const interval = setInterval(() => {
      const keys = keyboardStateRef.current;
      const currentPos = playerPositionRef.current.clone();

      let moveX = 0;
      let moveZ = 0;

      if (keys.forward) moveZ -= 1;
      if (keys.backward) moveZ += 1;
      if (keys.left) moveX -= 1;
      if (keys.right) moveX += 1;

      // Normalize diagonal movement
      if (moveX !== 0 && moveZ !== 0) {
        moveX *= 0.707;
        moveZ *= 0.707;
      }

      const newX = currentPos.x + moveX * moveSpeed * 0.016;
      const newZ = currentPos.z + moveZ * moveSpeed * 0.016;

      // Boundary check
      const clampedX = Math.max(-maxDistance, Math.min(maxDistance, newX));
      const clampedZ = Math.max(-maxDistance, Math.min(maxDistance, newZ));

      const newPosition = new THREE.Vector3(clampedX, 0.5, clampedZ);
      setPlayerPosition(newPosition);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [gameState.isPlaying]);

  // Check victory condition
  useEffect(() => {
    if (gameState.isPlaying && gameState.enemiesEaten >= 20) {
      setGameState((prev) => ({
        ...prev,
        isPlaying: false,
        isVictory: true,
      }));
    }
  }, [gameState.enemiesEaten, gameState.isPlaying]);

  // Check game over condition
  useEffect(() => {
    if (gameState.isPlaying && gameState.lives <= 0) {
      setGameState((prev) => ({
        ...prev,
        isPlaying: false,
        isGameOver: true,
      }));
    }
  }, [gameState.lives, gameState.isPlaying]);

  const startGame = () => {
    setGameState({
      score: 0,
      lives: 3,
      isPlaying: true,
      isGameOver: false,
      isVictory: false,
      enemiesEaten: 0,
      icpCollected: 0,
    });
    setPlayerPosition(new THREE.Vector3(0, 0.5, 0));
    setKeyboardState({
      forward: false,
      backward: false,
      left: false,
      right: false,
    });
  };

  const handleCollision = (type: 'enemy' | 'collectible', id: string) => {
    if (type === 'enemy') {
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 100,
        enemiesEaten: prev.enemiesEaten + 1,
      }));
    } else if (type === 'collectible') {
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 50,
        icpCollected: prev.icpCollected + 1,
        lives: Math.min(prev.lives + 1, 5),
      }));
    }
  };

  const handleReplay = () => {
    startGame();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/90 backdrop-blur-sm border-b border-red-500/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-white font-orbitron">
              <span className="text-red-500 text-sm">PUNTUACIÓN:</span>
              <span className="text-2xl font-bold ml-2">{gameState.score}</span>
            </div>
            <div className="text-white font-orbitron">
              <span className="text-red-500 text-sm">VIDAS:</span>
              <span className="text-2xl font-bold ml-2">{'❤️'.repeat(gameState.lives)}</span>
            </div>
            <div className="text-white font-orbitron">
              <span className="text-red-500 text-sm">ENEMIGOS COMIDOS:</span>
              <span className="text-xl font-bold ml-2">{gameState.enemiesEaten}/20</span>
            </div>
            <div className="text-white font-orbitron">
              <span className="text-red-500 text-sm">ICP:</span>
              <span className="text-xl font-bold ml-2">{gameState.icpCollected}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg border-2 border-red-500 transition-all"
          >
            CERRAR
          </button>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="flex-1 relative">
        {!gameState.isPlaying && !gameState.isGameOver && !gameState.isVictory && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/95">
            <div className="text-center space-y-6 max-w-2xl px-4">
              <h2 className="text-5xl font-bold text-red-500 neon-text-red font-orbitron">
                ICP vs Criptos
              </h2>
              <p className="text-xl text-white font-montserrat">
                Controla el logo de ICP y come a las criptomonedas enemigas (BTC, SOL, ETH).
                <br />
                ¡Recolecta logos de ICP para ganar vidas extra!
              </p>
              <div className="space-y-2 text-gray-400 font-montserrat">
                <p>⌨️ WASD o Flechas para mover</p>
                <p>🎯 Toca enemigos para comerlos (+100 puntos)</p>
                <p>💎 Recolecta ICP para ganar vidas (+50 puntos)</p>
                <p>🏆 Come 20 enemigos para ganar</p>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-red-600 hover:bg-black hover:text-red-600 text-white font-bold text-xl uppercase tracking-wider shadow-2xl neon-button border-2 border-red-600 transition-all duration-300 rounded-lg"
              >
                INICIAR JUEGO
              </button>
            </div>
          </div>
        )}

        {gameState.isGameOver && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/95">
            <div className="text-center space-y-6 max-w-2xl px-4">
              <h2 className="text-5xl font-bold text-red-500 neon-text-red font-orbitron">
                GAME OVER
              </h2>
              <div className="space-y-3 text-white font-montserrat text-xl">
                <p>
                  <span className="text-red-500">Puntuación Final:</span> {gameState.score}
                </p>
                <p>
                  <span className="text-red-500">Enemigos Comidos:</span> {gameState.enemiesEaten}
                </p>
                <p>
                  <span className="text-red-500">ICP Recolectados:</span> {gameState.icpCollected}
                </p>
              </div>
              <button
                onClick={handleReplay}
                className="px-8 py-4 bg-red-600 hover:bg-black hover:text-red-600 text-white font-bold text-xl uppercase tracking-wider shadow-2xl neon-button border-2 border-red-600 transition-all duration-300 rounded-lg"
              >
                JUGAR DE NUEVO
              </button>
            </div>
          </div>
        )}

        {gameState.isVictory && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/95">
            <div className="text-center space-y-6 max-w-2xl px-4">
              <h2 className="text-6xl font-bold text-red-500 neon-text-red font-orbitron animate-pulse">
                ¡VICTORIA!
              </h2>
              <p className="text-2xl text-white font-montserrat">
                ¡Has dominado el mundo cripto!
              </p>
              <div className="space-y-3 text-white font-montserrat text-xl">
                <p>
                  <span className="text-red-500">Puntuación Final:</span> {gameState.score}
                </p>
                <p>
                  <span className="text-red-500">Enemigos Comidos:</span> {gameState.enemiesEaten}
                </p>
                <p>
                  <span className="text-red-500">ICP Recolectados:</span> {gameState.icpCollected}
                </p>
              </div>
              <button
                onClick={handleReplay}
                className="px-8 py-4 bg-red-600 hover:bg-black hover:text-red-600 text-white font-bold text-xl uppercase tracking-wider shadow-2xl neon-button border-2 border-red-600 transition-all duration-300 rounded-lg"
              >
                JUGAR DE NUEVO
              </button>
            </div>
          </div>
        )}

        <Canvas
          shadows
          camera={{ position: [0, 15, 15], fov: 60 }}
          style={{ background: '#000000' }}
        >
          <GameScene
            gameState={gameState}
            playerPosition={playerPosition}
            onCollision={handleCollision}
            keyboardState={keyboardState}
          />
        </Canvas>
      </div>

      {/* Instructions */}
      {gameState.isPlaying && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg px-6 py-3">
          <p className="text-white font-montserrat text-sm text-center">
            ⌨️ WASD o Flechas para mover | 🎯 Toca enemigos para comerlos | 💎 Recolecta ICP para vidas
          </p>
        </div>
      )}
    </div>
  );
}
