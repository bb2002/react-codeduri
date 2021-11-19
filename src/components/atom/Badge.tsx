import React from 'react';
import "../../stylesheet/atom/Badge.css"

interface BadgeProps {
  color: any
  badgeURL: string
}

const Badge = ({ color, badgeURL }: BadgeProps) => {
  return (
    <div id="badge-image" style={{ backgroundImage: `url(${badgeURL})`, backgroundColor: `${color}` }} />
  )
}

export default Badge;