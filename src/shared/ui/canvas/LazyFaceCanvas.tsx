'use client';

import dynamic from 'next/dynamic';

const FaceWireframeCanvas = dynamic(() => import('./FaceWireframeCanvas'), { 
  ssr: false,
  loading: () => <div style={{width: '100%', height: '100%', opacity: 0}} /> 
});

export default function LazyFaceCanvas() {
  return <FaceWireframeCanvas />;
}
