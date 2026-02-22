import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';

export default function CombatEffects() {
  const { camera } = useThree();
  const [muzzleFlash, setMuzzleFlash] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => {
      setMuzzleFlash(true);
      setTimeout(() => setMuzzleFlash(false), 100);
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, []);

  return (
    <>
      {muzzleFlash && (
        <pointLight
          position={[camera.position.x, camera.position.y, camera.position.z]}
          intensity={2}
          color="#ff6600"
          distance={5}
        />
      )}
    </>
  );
}
