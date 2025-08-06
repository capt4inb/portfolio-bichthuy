"use client"

import { motion } from "framer-motion"

interface Company {
  name: string
  role: string
}

const CompanyLogo = ({ company, delay = 0 }: { company: Company; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="group flex-shrink-0"
    >
      <div className="px-6 py-3 min-w-[220px] text-center">
        <div className="space-y-2">
          <div className="text-xs font-bold text-gray-700 group-hover:text-gray-900 transition-colors whitespace-nowrap">
            {company.name}
          </div>
          <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors whitespace-nowrap">
            {company.role}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CompanyLogosSection() {
  const companies: Company[] = [
    { 
      name: "TÔT", 
      role: "UX Designer & Data Entry"
    },
    { 
      name: "FPT INFORMATION SYSTEM", 
      role: "UX/UI Designer & Developer"
    },
    { 
      name: "VNG CORPORATION", 
      role: "Product Designer / Product Owner"
    },
    { 
      name: "ARENA MULTIMEDIA", 
      role: "Lecturer"
    },
    { 
      name: "BRAIN-LIFE JSC", 
      role: "UX & Research Lead"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <p className="text-sm text-gray-600 font-medium">Trusted by leading companies</p>
      </motion.div>

      {/* Continuous scrolling animation */}
      <div className="relative overflow-hidden">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        {/* Animated scrolling content */}
        <motion.div 
          className="flex items-center gap-8 py-2"
          animate={{
            x: [0, -1000]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Duplicate companies for seamless loop */}
          {[...companies, ...companies, ...companies].map((company, index) => (
            <CompanyLogo key={`${company.name}-${index}`} company={company} delay={index * 0.1} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
