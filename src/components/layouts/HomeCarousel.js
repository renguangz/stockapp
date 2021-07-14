import React, { Suspense, useEffect, useRef } from 'react';
import './home/App.css';
import { Canvas } from 'react-three-fiber';
import state from './home/state';
import Section1 from './home/FirstSection';

// (8)
const Lights = () => {
    return (
        <>
            <ambientLight intensity={1} />
        </>
    )
}

function HomeCarousel() {
    const domContent = useRef();
    const scrollArea = useRef();
    const onScroll = (e) => (state.top.current = e.target.scrollTop)
    useEffect(() => {
        onScroll({ target: scrollArea.current })
    })

    return (
        <div className='canvas'>
            {/* (1) */}
            <Canvas colorManagement>
                <Lights />
                {/* (7) */}
                <Suspense fallback={null}>
                    <Section1 />
                </Suspense>
            </Canvas>
            {/* (11) scroll area */}
            <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
                <div style={{ position: 'sticky', top: 0 }} ref={domContent}></div>
                <div style={{ height: `${state.sections.top * 100}vh` }}></div>
            </div>
        </div>
    )
};

export default HomeCarousel;