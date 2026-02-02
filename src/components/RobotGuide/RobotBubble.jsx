import { AnimatePresence, motion } from 'framer-motion'

export default function RobotBubble({ text, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="speech-bubble visible"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
