import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Prateek Dwivedi - Full Stack Engineer';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#09090b', // Zinc-950
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
                    backgroundSize: '100px 100px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Green Status Dot */}
                    <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 20px #10b981' }} />
                    <div style={{ color: '#a1a1aa', fontSize: 24, fontFamily: 'monospace' }}>
                        System Online
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
                    <h1 style={{ fontSize: 80, fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-0.05em' }}>
                        PRATEEK DWIVEDI
                    </h1>
                    <h2 style={{ fontSize: 40, color: '#a1a1aa', marginTop: 20, fontWeight: 400 }}>
                        Full Stack Engineer • System Architect
                    </h2>
                </div>

                {/* Mock Code Block */}
                <div style={{
                    marginTop: 60,
                    background: '#18181b',
                    border: '1px solid #27272a',
                    borderRadius: '12px',
                    padding: '20px 40px',
                    color: '#e4e4e7',
                    fontSize: 24,
                    fontFamily: 'monospace',
                    display: 'flex'
                }}>
                    Building scalable systems with a 0→1 mindset.
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
