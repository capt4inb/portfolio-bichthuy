"use client"

import { motion } from "framer-motion"

const CompanyLogo = ({ name, delay = 0 }: { name: string; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="group flex-shrink-0"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-sm border border-white/30 group-hover:shadow-md group-hover:bg-white/95 transition-all duration-300 min-w-[120px] text-center">
        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors whitespace-nowrap">
          {name}
        </span>
      </div>
    </motion.div>
  )
}

export default function CompanyLogosSection() {
  const companies = [
    "VNG Corporation",
    "FPT Information",
    "Brain-Life JSC",
    "Arena Multimedia",
    "Greenwich Vietnam",
    "TÔT.",
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <p className="text-sm text-slate-600 font-medium">Trusted by leading companies</p>
      </motion.div>

      {/* Desktop Layout - Horizontal Row */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {companies.map((company, index) => (
            <CompanyLogo key={company} name={company} delay={index * 0.1} />
          ))}
        </div>
      </div>

      {/* Mobile Layout - Grid */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-3">
          {companies.map((company, index) => (
            <CompanyLogo key={company} name={company} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
