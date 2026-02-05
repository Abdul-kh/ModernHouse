"use client"

interface MirrorTransitionOverlayProps {
  isActive: boolean
}

export function MirrorTransitionOverlay({ isActive }: MirrorTransitionOverlayProps) {
  if (!isActive) return null

  return (
    <div className={`mirror-transition-overlay ${isActive ? 'active' : ''}`}>
      <div className="mirror-portal">
        <div 
          className="mirror-ripple animating" 
          style={{ 
            width: '100%', 
            height: '100%',
            top: 0,
            left: 0
          }} 
        />
      </div>
    </div>
  )
}
