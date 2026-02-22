import { useEffect, useRef } from 'react';
import { useShoot } from '../../hooks/usePlayerState';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function WeaponSystem() {
  const { shoot, isShooting } = useShoot();
  const { identity } = useInternetIdentity();
  const lastShotTime = useRef(0);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // Only left click
      if (!identity) return;

      const now = Date.now();
      if (now - lastShotTime.current < 500) return; // Fire rate limit

      lastShotTime.current = now;
      
      // For demo purposes, shoot at a random target
      // In a real multiplayer game, this would use raycasting to detect hit targets
      shoot();
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [shoot, identity]);

  return null;
}
