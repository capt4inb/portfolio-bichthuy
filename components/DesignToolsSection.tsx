"use client"

import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useRef } from "react"

const FloatingSkillCard = ({
  skill,
  index,
  isHovered,
  onHover,
}: {
  skill: string
  index: number
  isHovered: boolean
  onHover: (index: number | null) => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(springY, [-100, 100], [10, -10])
  const rotateY = useTransform(springX, [-100, 100], [-10, 10])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((event.clientX - centerX) * 0.3)
    y.set((event.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onHover(null)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
    >
      <div
        className={`
        relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md 
        rounded-2xl p-4 border border-white/30 shadow-lg
        transition-all duration-300 transform-gpu
        ${isHovered ? "shadow-2xl scale-105 bg-gradient-to-br from-white/90 to-white/70" : ""}
        hover:shadow-xl hover:border-white/50
      `}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
            {skill}
          </span>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-200"></div>
      </div>
    </motion.div>
  )
}

const FloatingToolCard = ({
  tool,
  icon,
  index,
  isHovered,
  onHover,
}: {
  tool: string
  icon: string
  index: number
  isHovered: boolean
  onHover: (index: number | null) => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 400, damping: 25 })
  const springY = useSpring(y, { stiffness: 400, damping: 25 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((event.clientX - centerX) * 0.2)
    y.set((event.clientY - centerY) * 0.2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onHover(null)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 120,
      }}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
    >
      <div
        className={`
        relative bg-gradient-to-br from-slate-50/90 to-white/80 backdrop-blur-md 
        rounded-3xl p-6 border border-white/40 shadow-lg
        transition-all duration-300 transform-gpu
        ${isHovered ? "shadow-2xl scale-110 bg-gradient-to-br from-white/95 to-slate-50/90" : ""}
        hover:shadow-xl hover:border-indigo-200/50
      `}
      >
        {/* Animated background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Icon with floating animation */}
        <motion.div
          className="text-4xl mb-3 relative z-10"
          animate={{
            y: isHovered ? [-2, 2, -2] : [0, -3, 0],
            rotate: isHovered ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>

        {/* Tool name */}
        <div className="relative z-10 text-center">
          <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{tool}</span>
        </div>

        {/* Orbiting elements */}
        <motion.div
          className="absolute top-2 right-2 w-1 h-1 bg-indigo-400 rounded-full"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-purple-400 rounded-full"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.3, 0.8, 0.3] : 0.2,
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        />
      </div>
    </motion.div>
  )
}

export default function DesignToolsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const [hoveredTool, setHoveredTool] = useState<number | null>(null)

  const designSkills = ["User Research", "Illustrator", "Interaction Design", "Web Design", "Copywriting"]

  const tools = [
    { name: "Photoshop", icon: "🎨" },
    { name: "Figma", icon: "✨" },
    { name: "Framer", icon: "⚡" },
    { name: "Balsamiq Mockups", icon: "📝" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h3 className="text-3xl font-bold text-slate-800 mb-3 flex items-center justify-center">
          <motion.span
            className="text-4xl mr-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            🛠️
          </motion.span>
          Design Skills & Tools
        </h3>
        <motion.div
          className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-3"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <p className="text-slate-600 text-sm">Interactive expertise showcase</p>
      </motion.div>

      {/* Design Skills Section */}
      <div className="mb-12 relative z-10">
        <motion.h4
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl font-semibold text-slate-800 mb-6 text-center"
        >
          Design Skills
        </motion.h4>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {designSkills.map((skill, index) => (
            <FloatingSkillCard
              key={skill}
              skill={skill}
              index={index}
              isHovered={hoveredSkill === index}
              onHover={setHoveredSkill}
            />
          ))}
        </div>
      </div>

      {/* Animated Divider */}
      <motion.div
        className="flex items-center justify-center mb-12 relative z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
        <motion.div
          className="px-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </motion.div>
        <motion.div
          className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
      </motion.div>

      {/* Tools Section */}
      <div className="relative z-10">
        <motion.h4
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl font-semibold text-slate-800 mb-6 text-center"
        >
          Tools & Software
        </motion.h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {tools.map((tool, index) => (
            <FloatingToolCard
              key={tool.name}
              tool={tool.name}
              icon={tool.icon}
              index={index}
              isHovered={hoveredTool === index}
              onHover={setHoveredTool}
            />
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 bg-indigo-400/50 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-purple-400/50 rounded-full"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
    </motion.div>
  )
}
