'use client';

import dynamic from 'next/dynamic';

const WireframeGridCanvas = dynamic(() => import('./WireframeGridCanvas'), { 
  ssr: false,
  loading: () => <div style={{width: '100%', height: '100%', opacity: 0}} />
});

export default function LazyGridCanvas() {
  return <WireframeGridCanvas />;
}
