import React from 'react';
import './App.css';
import { Html, Reflector } from '@react-three/drei';
import { CaretUpOutlined } from '@ant-design/icons';
import { Section } from './section';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import taiwan_stock from '../../images/mocked/taiwan-stock.jpeg';
import { Link } from 'react-router-dom';

// (5)
const Card = () => {
    const mapCard = useLoader(THREE.TextureLoader, taiwan_stock)
    return (
        <>
            <boxBufferGeometry attach='geometry' args={[6, 4.5, 0]} />
            {/* <meshStandardMaterial attach='material' color='white' /> */}
            <meshStandardMaterial attach='material' map={mapCard} />
        </>
    )
}

// (2)
const Section1 = ({ position, domContent }) => {
    return (
        <>
            {/* (4) */}
            <group position={position}>
                {/* (6) */}
                <mesh position={[0.8, 0.6, 0]}>
                    <Card />
                </mesh>
                <Reflector
                    blur={[512, 512]}
                    mixBlur={0.25} //反射的銳利度
                    mixStrength={0.7} // 反射強度，透明度
                    resolution={1024}
                    args={[50, 50]} // 平台大小
                    rotation={[-Math.PI / 2, 0, 0]}
                    mirror={1} // 1 幾乎看不到平台, 0 平台很明顯
                    minDepthThreshold={0.25}
                    maxDepthThreshold={1}
                    depthScale={0.5}
                    position={[0, -1.8, 0]}
                />
                <Html fullscreen portal={domContent}>
                    <div className='container'>
                        <div className='titleContainer'>
                            <h1 className='title'>台股加權指數</h1>
                        </div>
                        <div className='infoContainer'>
                            <h2 className='stockinfo'>17847.52</h2>
                        </div>
                        <div className='numContainer'>
                            <h3 className='stockrise'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h3>
                        </div>
                        <div className='btnContainer'>
                            <div className='btn bgcBtn'>
                                <h2 className='btnWord firstBtn'>
                                    {/* <Link to='/mylist'> */}
                                        進入股票清單
                                    {/* </Link> */}
                                </h2>
                            </div>
                            <div className='btn secondBtnBgc'>
                                {/* <Link to='search'> */}
                                    <h2 className='btnWord secondBtn'>查詢個股資訊</h2>
                                {/* </Link> */}
                            </div>
                        </div>
                    </div>
                    <div className='otherCardsContainer'>
                        <div className='cardOutter'>
                            <div className='cardTitleContainer'>
                                <h2 className='cardTitle'>台股指數</h2>
                                <h2 className='cardNum'>17847.52</h2>
                                <h2 className='cardNum'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h2>
                            </div>
                            <div className='cardImg'></div>
                        </div>
                        <div className='cardOutter'>
                            <div className='cardTitleContainer'>
                                <h2 className='cardTitle'>美股指數</h2>
                                <h2 className='cardNum'>17847.52</h2>
                                <h2 className='cardNum'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h2>
                            </div>
                            <div className='cardImg'></div>
                        </div>
                        <div className='cardOutter'>
                            <div className='cardTitleContainer'>
                                <h2 className='cardTitle'>台股指數</h2>
                                <h2 className='cardNum'>17847.52</h2>
                                <h2 className='cardNum'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h2>
                            </div>
                            <div className='cardImg'></div>
                        </div>
                        <div className='cardOutter'>
                            <div className='cardTitleContainer'>
                                <h2 className='cardTitle'>台股指數</h2>
                                <h2 className='cardNum'>17847.52</h2>
                                <h2 className='cardNum'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h2>
                            </div>
                            <div className='cardImg'></div>
                        </div>
                        <div className='cardOutter'>
                            <div className='cardTitleContainer'>
                                <h2 className='cardTitle'>台股指數</h2>
                                <h2 className='cardNum'>17847.52</h2>
                                <h2 className='cardNum'><CaretUpOutlined style={{ fill: 'red' }} />33.19(0.19%)</h2>
                            </div>
                            <div className='cardImg'></div>
                        </div>
                    </div>
                </Html>
            </group>
        </>
    )
}

export default Section1;