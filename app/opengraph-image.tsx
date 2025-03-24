import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Abdul Aziz - Fullstack Developer';
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom right, #3b82f6, #1e3a8a)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 24,
            padding: 48,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            width: '90%',
            height: '90%',
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Abdul 'Aziz
          </h1>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 'normal',
              margin: '24px 0',
              textAlign: 'center',
            }}
          >
            Fullstack Developer & Web Engineer
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              marginTop: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 24px',
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: 24,
              }}
            >
              React
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 24px',
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: 24,
              }}
            >
              Next.js
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 24px',
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: 24,
              }}
            >
              TypeScript
            </div>
          </div>
          <p
            style={{
              fontSize: 24,
              marginTop: 48,
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            Building modern, performant, and beautiful web applications
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
