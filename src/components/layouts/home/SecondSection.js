import React from 'react';
import { Canvas } from 'react-three-fiber';

const Card = () => {
    return (
        <>
            <mesh>
                <boxBufferGeometry args={[4, 3, 0]} />
                <meshStandardMaterial color='black' />
            </mesh>
        </>
    )
}

const SecondSection = () => {
    return (
        <>
            <Canvas>
                <Card />
            </Canvas>
        </>
    )
};

export default SecondSection;