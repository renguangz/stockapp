import React from 'react';
import { Section } from './section';

const Section2 = ({ position }) => {
    return (
        <Section factor={1.5} offset={1}>
            <group position={position}>

            </group>
        </Section>
    )
};

export default Section2;