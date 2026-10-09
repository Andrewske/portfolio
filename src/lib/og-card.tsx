import { ImageResponse } from 'next/og'
import { siteConfig } from '~/lib/site-config'

export const ogSize = { width: 1200, height: 630 }

interface OgCardProps {
  heading: string
  subheading: string
}

export const renderOgCard = ({ heading, subheading }: OgCardProps): ImageResponse =>
  new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: '#000',
        color: '#e5e7eb',
        fontFamily: 'monospace',
        border: '2px solid rgba(34,197,94,0.3)',
      }}
    >
      <div style={{ display: 'flex', fontSize: 32, color: '#4ade80' }}>
        $ {siteConfig.name.toLowerCase().replace(' ', '-')}
      </div>
      <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, color: '#fff', marginTop: 24 }}>
        {heading}
      </div>
      <div style={{ display: 'flex', fontSize: 34, color: '#fde047', marginTop: 24 }}>
        {subheading}
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#6b7280', marginTop: 48 }}>
        {siteConfig.url.replace('https://', '')}
      </div>
    </div>,
    ogSize,
  )
