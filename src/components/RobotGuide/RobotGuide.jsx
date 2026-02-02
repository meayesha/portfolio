import { useEffect, useState } from 'react'
import RobotAvatar from './RobotAvatar'
import RobotBubble from './RobotBubble'
import { useRobotGuide } from './useRobotGuide'
import './RobotGuide.css'

export default function RobotGuide() {
  const { message, visible } = useRobotGuide()
  const [pointing, setPointing] = useState(false)

  useEffect(() => {
    if (visible) {
      setPointing(true)
      const t = setTimeout(() => setPointing(false), 1600)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <div className="robot-wrapper">
      <RobotAvatar isSpeaking={visible} pointing={pointing} />
      <RobotBubble text={message} visible={visible} />
    </div>
  )
}
