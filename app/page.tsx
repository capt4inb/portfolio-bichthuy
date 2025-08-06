"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Instagram, Facebook, Phone, Mail, Linkedin, ChevronDown, ArrowRight } from "lucide-react"
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef } from "react"
import CompanyLogosSection from "@/components/CompanyLogosSection"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useIsMobile } from "@/hooks/use-mobile"
import ExpandableText from "@/components/ExpandableText"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Refs for sections
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const resumeRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "resume", ref: resumeRef },
        { id: "projects", ref: projectsRef },
        { id: "contact", ref: contactRef },
      ]

      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = section.ref.current
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const refs: { [key: string]: React.RefObject<HTMLElement> } = {
      hero: heroRef,
      about: aboutRef,
      resume: resumeRef,
      projects: projectsRef,
      contact: contactRef,
    }

    const targetRef = refs[sectionId]
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const isMobile = useIsMobile();

  // --- Projects Section: chuẩn bị dữ liệu ---
  const allProjects = [
    // FPT Information System
    {
      title: "Ứng dụng Xanh",
      company: "FPT Information System",
      description: "Green application design for environmental sustainability initiatives and eco-friendly solutions",
      category: "Environmental Tech",
      gradient: "from-emerald-400 to-green-500",
      link: "https://www.figma.com/file/ZHUyaGGLbJKDVwQxNAwqrs/%E1%BB%A8ng-d%E1%BB%A5ng-Xanh?node-id=0%3A1",
    },
    {
      title: "FIS Insight",
      company: "FPT Information System",
      description: "Business intelligence dashboard and analytics platform design for data visualization",
      category: "Dashboard Design",
      gradient: "from-blue-400 to-indigo-500",
      link: "https://www.figma.com/file/cghOQDBOTLoOgEoESGYDni/FIS-Insight?node-id=1490%3A9450",
    },
    {
      title: "Hanwha Life VietNam - LIME Pro",
      company: "FPT Information System",
      description: "Insurance application interface design and user experience optimization for mobile platform",
      category: "Mobile App",
      gradient: "from-teal-400 to-blue-500",
      link: "https://www.figma.com/file/O9uzmAzkjjhySaOHT2r32R/LIME?node-id=1%3A2",
    },
    {
      title: "Sovisco - HD Bank",
      company: "FPT Information System",
      description: "Banking application design with focus on user experience and financial services",
      category: "FinTech",
      gradient: "from-purple-400 to-pink-500",
      link: "https://www.figma.com/file/LmxxynkJWaeBOsDC7MMtyN/People-App-(Copy)?node-id=254%3A0",
    },
    {
      title: "Tôn Đông Á",
      company: "FPT Information System",
      description: "Barcode and inventory management system design for manufacturing industry",
      category: "Industrial Design",
      gradient: "from-orange-400 to-red-500",
      link: "https://www.figma.com/file/zVKryPDDUoVTwz9VZyqSfH/TDA_Barcode?node-id=475%3A1932",
    },
    {
      title: "Á Châu Bank Super App",
      company: "FPT Information System",
      description: "Comprehensive banking super app design with multiple financial services integration",
      category: "Super App",
      gradient: "from-indigo-400 to-purple-500",
      link: "https://www.figma.com/file/cp8QPYqO1nYQLm2uOYfQho/ACB-Super-App?node-id=0%3A1",
    },
    {
      title: "wSPro 4.0 - Task Management",
      company: "FPT Information System",
      description: "Advanced task management and project collaboration platform design",
      category: "Productivity",
      gradient: "from-cyan-400 to-blue-500",
      link: "https://www.figma.com/file/BbBOST3ShZmnV5IA2uvxZs/wSPro-4.0-(Beta)",
    },
    // VNG CORP
    {
      title: "PRISM WEBSITE",
      company: "VNG CORP",
      description: "Corporate website design for PRISM platform with modern and professional interface",
      category: "Web Design",
      gradient: "from-violet-400 to-purple-500",
      link: "https://www.figma.com/design/m8JpNVqDmh4QHZ7XTOOXJ9/PRISM-WEBSITE?node-id=809-56614&t=ijDgn9e62looy2o8-1",
    },
    {
      title: "PRISM PLATFORM",
      company: "VNG CORP",
      description: "Comprehensive enterprise platform design with advanced analytics and management tools",
      category: "Enterprise Platform",
      gradient: "from-blue-400 to-indigo-500",
      link: "https://www.figma.com/design/nlvyONggJNKamuQnHETiHZ/%5BOfficial%5D-PRISM-Platform?node-id=0-1&t=0sTiTHE73KZHv4QG-1",
    },
    {
      title: "PRISM MOBILE APP",
      company: "VNG CORP",
      description: "Mobile application design for PRISM platform with intuitive user interface and seamless experience",
      category: "Mobile App",
      gradient: "from-purple-400 to-pink-500",
      link: "https://www.figma.com/design/JeXAEoxa2Fx8f8YZb48Xln/%5BOfficial%5D-PRISM-Mobile-App?node-id=0-1&t=KGtzm2WAznSZAVff-1",
    },
    {
      title: "PRISM MOBILE APP FOR MASAN CUSTOMER",
      company: "VNG CORP",
      description: "Customized PRISM mobile application design specifically tailored for Masan customer needs",
      category: "Custom Solution",
      gradient: "from-rose-400 to-pink-500",
      link: "https://www.figma.com/design/aw5Lr3Y08u5r9JT48ZXPKr/AA---PRISM-Mobile-App-For-Masan?node-id=0-1&t=RkoUiccUSWI2Icps-1",
    },
    {
      title: "AUTOMATED ARCHITECTURE BACK OFFICE FOR MASAN CUSTOMER",
      company: "VNG CORP",
      description: "Back office system design for automated architecture management for Masan operations",
      category: "Back Office System",
      gradient: "from-slate-400 to-gray-500",
      link: "https://www.figma.com/design/bt8T9iUoRawCPMaPS3hciA/A.A-BOS-For-Masan?node-id=7873-317247&t=pcNDhJfvFPvAbtuy-1",
    },
    {
      title: "PRISM CAMERA MODULE",
      company: "VNG CORP",
      description: "Camera module interface design for PRISM platform with advanced imaging capabilities",
      category: "IoT Interface",
      gradient: "from-green-400 to-teal-500",
      link: "https://www.figma.com/design/IAGlv9G1oMcAerIlLjfh6a/%5BOfficial%5D-Camera-Module?node-id=0-1&t=LfxEwP2UA6Nplb6t-1",
    },
    {
      title: "VCLOUDCAM (AI CLOUD CAMERA)",
      company: "VNG CORP",
      description: "AI-powered cloud camera platform design with intelligent monitoring and analytics features",
      category: "AI/ML Interface",
      gradient: "from-indigo-400 to-blue-500",
      link: "https://www.figma.com/design/LAzTZAJd3lDGJkwXbzSKZc/%5BINHERIT%5D-VEKA-V2-(VCLOUDCAM)?node-id=0-1&t=onAHn9Gz7hivVYhh-1",
    },
    {
      title: "VCLOUDCAM (AI CLOUD CAMERA) - MOBILE APP",
      company: "VNG CORP",
      description: "Mobile application for VCloudCam with real-time monitoring and AI-powered features",
      category: "Mobile AI App",
      gradient: "from-cyan-400 to-indigo-500",
      link: "https://www.figma.com/design/1mRF10O5cQsVrkAKszV1Xz/vCloudcam---Mobile-(NewUI)?node-id=6487-244012&t=0A8g9GUEgTruNIJY-1",
    },
    {
      title: "VCLOUDCAM (AI CLOUD CAMERA) - DESKTOP APP",
      company: "VNG CORP",
      description: "Desktop application design for VCloudCam with comprehensive monitoring and management tools",
      category: "Desktop App",
      gradient: "from-purple-400 to-indigo-500",
      link: "https://www.figma.com/design/HTjeqvFjwxsod9Z5axHNPZTh/vCloudcam---Desktop?node-id=2436-0&t=9l5sGJt3kiHzYrJW-1",
    },
  ];
  const companyTags = Array.from(new Set(allProjects.map((p) => p.company)));
  const [selectedCompany, setSelectedCompany] = useState(companyTags[0]);
  const projectsByCompany = allProjects.filter((p) => p.company === selectedCompany);
  // --- Projects Section ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-indigo-200/20 rounded-full blur-3xl transform translate-x-48 -translate-y-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-slate-200/40 to-purple-200/30 rounded-full blur-2xl transform -translate-x-32 translate-y-32"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-bl from-indigo-200/20 to-slate-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Enhanced Navbar */}
      {isMobile ? (
        <nav className="fixed top-0 left-0 w-full z-50">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" className="shadow-lg m-2 ml-2">
                <Menu className="w-6 h-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent tabIndex={0} className="w-full max-w-full rounded-none p-0 pt-12 bg-white/95 backdrop-blur-md border-b border-white/30 focus:outline-none" onClick={e => e.stopPropagation()}>
              <div className="flex flex-col space-y-4 px-6 pb-8">
                {[{ id: "hero", label: "Home" }, { id: "about", label: "About" }, { id: "resume", label: "Resume" }, { id: "projects", label: "Projects" }, { id: "contact", label: "Contact" }].map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className="w-full justify-start text-lg"
                    onClick={() => {
                      scrollToSection(item.id);
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </nav>
      ) : (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 shadow-lg border border-white/20">
          <div className="flex space-x-8">
            {[{ id: "hero", label: "Home" }, { id: "about", label: "About" }, { id: "resume", label: "Resume" }, { id: "projects", label: "Projects" }, { id: "contact", label: "Contact" }].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg ${activeSection === item.id ? "text-indigo-600 bg-white/20 shadow-sm" : "text-slate-600 hover:text-indigo-600 hover:bg-white/10"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center px-4 relative z-10 py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40"></div>
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-indigo-200/15 to-blue-200/15 rounded-full blur-2xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10">
          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="text-4xl lg:text-6xl font-light text-slate-700 mb-6 leading-tight tracking-wide"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.span
                    className="inline-block bg-gradient-to-r from-slate-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ 
                      scale: 1.02,
                      filter: "drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))"
                    }}
                  >
                    HELLO
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ 
                      scale: 1.02,
                      filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))"
                    }}
                  >
                    EVERYONE
                  </motion.span>
                </motion.h1>
                </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6"
              >
                <motion.p 
                  className="text-slate-600 leading-relaxed text-lg font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  I'm a{" "}
                  <motion.span 
                    className="font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block"
                    whileHover={{ 
                      scale: 1.01,
                      filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.2))"
                    }}
                  >
                    Product Design
                  </motion.span>{" "}
                  with 7 years of experience in the tech industry. With a background in IT and a Master's in Software Engineering in progress, I focus on{" "}
                  <motion.span 
                    className="font-medium bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent inline-block"
                    whileHover={{ 
                      scale: 1.01,
                      filter: "drop-shadow(0 0 8px rgba(147, 51, 234, 0.2))"
                    }}
                  >
                    creating intuitive digital experiences
                  </motion.span>{" "}
                  and connecting users, designers, and developers. I'm also passionate about education and aim to share my knowledge through teaching and mentorship.
                </motion.p>
                
                {/* Soft decorative element */}
                <motion.div 
                  className="w-16 h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                />

                <motion.div 
                  className="text-xl text-slate-600 mb-8 font-light leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  whileHover={{ 
                    color: "#4f46e5",
                    scale: 1.01
                  }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="text-2xl font-semibold text-slate-800">7+</div>
                      <div className="text-sm text-slate-600">Years Experience</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-semibold text-slate-800">20+</div>
                      <div className="text-sm text-slate-600">Projects Completed</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-semibold text-slate-800">5</div>
                      <div className="text-sm text-slate-600">Companies Worked</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-semibold text-slate-800">7.5</div>
                      <div className="text-sm text-slate-600">IELTS Score</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="bg-gradient-to-br from-purple-500/85 via-indigo-500/80 to-purple-600/90 backdrop-blur-md rounded-3xl p-6 lg:p-8 w-full max-w-sm shadow-2xl border border-white/20 hover:shadow-purple-500/30 hover:scale-105 transition-all duration-700 transform">
                {/* Soft glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-3xl blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl hover:scale-110 transition-all duration-500 transform">
                      <Image
                        src="/images/profile-new.jpg"
                        alt="Ho Bich Thuy"
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h2 className="text-xl lg:text-2xl font-light text-white mb-3 tracking-wide">HO BICH THUY</h2>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-white/60 to-white/40 mx-auto mb-3 rounded-full"></div>
                    <p className="text-lg lg:text-xl font-medium text-white/95">PRODUCT DESIGN</p>
                    <p className="text-xs text-white/80 mt-2 font-light">UX/UI Designer & Research Lead</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 lg:p-4 border border-white/15 hover:bg-white/30 transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-light text-sm">Follow On</span>
                      <div className="flex space-x-2">
                        <a
                          href="https://www.linkedin.com/in/thuyhb/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/35 hover:scale-110 transition-all duration-300"
                        >
                          <Linkedin className="w-4 h-4 text-white" />
                        </a>
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/35 hover:scale-110 transition-all duration-300">
                          <Instagram className="w-4 h-4 text-white" />
                        </button>
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/35 hover:scale-110 transition-all duration-300">
                          <Facebook className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Company Logos Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <CompanyLogosSection />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection("about")}
            className="animate-bounce text-slate-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-white/20 backdrop-blur-sm"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </motion.div>
      </section>

      {/* Enhanced About Section */}
      <section ref={aboutRef} className="py-20 px-4 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-sm"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-5xl font-light text-slate-800 mb-6">
                <span className="bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">
                  About
                </span>{" "}
                <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-8">
              {/* Two-column layout for About content */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Education & Achievements */}
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
                    Education & Achievements
                  </h3>

                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"></div>

                    <div className="space-y-8">
                      {/* Education Timeline */}
                      <div className="relative flex items-start">
                        <div className="absolute left-2.5 w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-2 border-white"></div>
                        <div className="ml-10">
                          <div className="flex items-center mb-2">
                            <span className="text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full mr-3">
                              2024
                            </span>
                            <h4 className="text-xl font-semibold text-slate-800">Master of Software Engineering</h4>
                          </div>
                          <p className="text-indigo-600 font-medium">FPT University</p>
                          <p className="text-slate-600 text-sm">April 2022 - October 2024</p>
                        </div>
                      </div>

                      <div className="relative flex items-start">
                        <div className="absolute left-2.5 w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full border-2 border-white"></div>
                        <div className="ml-10">
                          <div className="flex items-center mb-2">
                            <span className="text-sm font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full mr-3">
                              2021
                            </span>
                            <h4 className="text-xl font-semibold text-slate-800">Bachelor of Computer Science</h4>
                          </div>
                          <p className="text-indigo-600 font-medium">Greenwich Vietnam University</p>
                          <p className="text-slate-600 text-sm">July 2018 - December 2021</p>
                        </div>
                      </div>

                      {/* Achievements Section */}
                      <div className="relative flex items-start">
                        <div className="absolute left-2.5 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full border-2 border-white"></div>
                        <div className="ml-10">
                          <div className="flex items-center mb-4">
                            <span className="text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full mr-3">
                              Achievements
                            </span>
                            <h4 className="text-xl font-semibold text-slate-800">Key Milestones</h4>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                <span className="text-slate-700 text-sm">IELTS 7.5 - Advanced English Proficiency</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                <span className="text-slate-700 text-sm">7+ Years in Product Design</span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full"></div>
                                <span className="text-slate-700 text-sm">Led 20+ Successful Projects</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
                                <span className="text-slate-700 text-sm">Neurotechnology UX Specialist</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Design Tools Section */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Design Tools</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                      {/* Photoshop */}
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                          {/* Photoshop SVG */}
                          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="4" fill="#001E36"/>
                            <text x="16" y="22" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#31A8FF">Ps</text>
                          </svg>
                        </div>
                        <span className="text-xs text-slate-600 font-medium">Photoshop</span>
                      </div>

                      {/* Figma */}
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                          {/* Figma SVG */}
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#fff"/><path d="M12 12a3 3 0 1 0 0-6h-3v6h3z" fill="#F24E1E"/><path d="M9 15a3 3 0 1 0 0-6v6z" fill="#A259FF"/><path d="M12 21a3 3 0 0 0 3-3 3 3 0 0 0-3-3h-3v3a3 3 0 0 0 3 3z" fill="#0ACF83"/><path d="M6 6a3 3 0 0 1 3-3h3a3 3 0 1 1 0 6H9a3 3 0 0 1-3-3z" fill="#FF7262"/><path d="M6 12a3 3 0 0 1 3-3h3a3 3 0 1 1 0 6H9a3 3 0 0 1-3-3z" fill="#1ABCFE"/></svg>
                        </div>
                        <span className="text-xs text-slate-600 font-medium">Figma</span>
                      </div>

                      {/* Framer */}
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                          {/* Framer SVG */}
                          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="#fff"/><path d="M8 8h16v8H16l8 8H8v-8h8l-8-8z" fill="#0055FF"/></svg>
                        </div>
                        <span className="text-xs text-slate-600 font-medium">Framer</span>
                      </div>

                      {/* Balsamiq Mockups */}
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                          {/* Balsamiq SVG zigzag */}
                          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none"><path d="M4 20c2-2 6-6 10-6s8 6 12 6 2-6-2-6-8 6-12 6-6-6-2-6 8 6 12 6 6-6 2-6-8 6-12 6-6-6-2-6 8 6 12 6" stroke="#A7344A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <span className="text-xs text-slate-600 font-medium">Balsamiq</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - About Me Goals */}
                <div className="space-y-10">
                  {isMobile ? (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="short-term">
                        <AccordionTrigger>Short-term</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-800 leading-relaxed text-lg font-medium">
                            <ExpandableText
                              text={"To continue growing as a Product Designer by contributing to impactful UX/UI projects that prioritize user-centered design and seamless digital experiences. I aim to apply my technical background, creative problem-solving skills, and design expertise to craft intuitive interfaces that bridge the gap between users and technology. In the near term, I seek opportunities to collaborate with cross-functional teams, deepen my knowledge of design systems, và stay current with emerging tools and trends in the UX/UI field."}
                              maxChars={120}
                            />
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="long-term">
                        <AccordionTrigger>Long-term</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-800 leading-relaxed text-lg font-medium">
                            <ExpandableText
                              text={"To become a leading UX/UI expert with the ability to drive product vision, mentor junior designers, and influence design strategy at a broader organizational level. I aspire to build and lead high-performing design teams, contribute to the evolution of design best practices, and create products that not only meet business goals but also deliver meaningful value to users. Ultimately, I want to leave a lasting impact on the digital landscape through thoughtful, human-centered design."}
                              maxChars={120}
                            />
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <>
                      <div className="space-y-5">
                        <h4 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
                          Short-term:
                        </h4>
                        <p className="text-gray-800 leading-relaxed text-lg font-medium">
                          <ExpandableText
                            text={"To continue growing as a Product Designer by contributing to impactful UX/UI projects that prioritize user-centered design and seamless digital experiences. I aim to apply my technical background, creative problem-solving skills, and design expertise to craft intuitive interfaces that bridge the gap between users and technology. In the near term, I seek opportunities to collaborate with cross-functional teams, deepen my knowledge of design systems, và stay current with emerging tools and trends in the UX/UI field."}
                            maxChars={120}
                          />
                        </p>
                      </div>

                      <div className="w-32 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-full shadow-lg"></div>

                      <div className="space-y-5">
                        <h4 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
                          Long-term:
                        </h4>
                        <p className="text-gray-800 leading-relaxed text-lg font-medium">
                          <ExpandableText
                            text={"To become a leading UX/UI expert with the ability to drive product vision, mentor junior designers, and influence design strategy at a broader organizational level. I aspire to build and lead high-performing design teams, contribute to the evolution of design best practices, and create products that not only meet business goals but also deliver meaningful value to users. Ultimately, I want to leave a lasting impact on the digital landscape through thoughtful, human-centered design."}
                            maxChars={120}
                          />
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Resume Section */}
      <section ref={resumeRef} className="py-20 px-4 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-5xl font-light text-slate-800 mb-6">
                <span className="bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">
                  Experience
                </span>{" "}
                <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Timeline
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
            </motion.div>
            {/* Enhanced Timeline */}
            {isMobile ? (
              <ExperienceTimelineSlider jobs={[
                  {
                    year: "Jan 2023 - Now",
                    title: "UX & Research Lead",
                    company: "BRAIN-LIFE JSC",
                    description:
                      `- Lead end-to-end UX strategy for neurotechnology products, including EEG headbands and BCI/HCI-based platforms.\n- Translate complex neuroscientific data into intuitive, user-centered interface designs.\n- Collaborate closely with cross-functional teams (engineering, product, neuroscience) to align design with real-time brain data insights.\n- Conduct and oversee usability testing, A/B testing, and heuristic evaluations to refine product experience.\n- Build and maintain scalable design systems that meet both clinical and user experience standards.\n- Mentor designers and promote UX best practices across teams to ensure cohesive design execution.\n- Advocate for accessible, empathetic design grounded in cognitive science and user behavior.`,
                    tools: ["Figma", "FigJam", "Notion", "Jira", "Trello", "MATLAB"],
                    highlight: true,
                  },
                  {
                    year: "Jan 2023 - Now",
                    title: "Lecturer",
                    company: "ARENA MULTIMEDIA",
                    description:
                      `- Planning teaching, including lectures, seminars/tutorials and learning materials\n- Meeting students individually to discuss progress\n- Checking and assessing students' work\n- Pursuing research\n- Interviewing potential students\n- Carrying out administration, such as attending faculty meetings and writing reports\nSubjects taught:\n- Building Next Generation Website\n- Responsive Design\n- Web / App Designing Concepts\n- User & Product Research\n- UX Design\n- Digital Wireframe\n- UI Design\n- Prototyping`,
                    tools: ["Figma"],
                    highlight: false,
                  },
                  {
                    year: "Apr 2022 - Jan 2025",
                    title: "Product Designer / Product Owner",
                    company: "VNG CORPORATION",
                    description:
                      `- Identify opportunities for new products\n- Analyze how a new product ties in with market needs and consumer preferences\n- Set design requirements based on briefs from internal teams and external partners\n- Research materials and techniques, sketch drafts on paper or digitally\n- Use 3D modeling software to design products and components\n- Produce prototypes and test functionality, improve the design of existing products\n- Gather feedback from product users\n- Take care of the health and spirit of team members\n- Be Scrum Master if necessary`,
                    tools: ["Figma"],
                    highlight: true,
                  },
                  {
                    year: "July 2020 - Mar 2022",
                    title: "UX/UI Designer & Developer",
                    company: "FPT INFORMATION SYSTEM",
                    description:
                      `- Work closely with product and BA teams to gather requirements to innovate and deliver superior product design.\n- Create concept visual solution or framework and pitch to product and tech team from historical, design, business and competitive standpoint.\n- Follow DEV sprint framework to deliver on time for developers to start on implementation.\n- Design UI & UX for Web App, Mobile Apps and for internal products.\n- Collaborate with front-end developers to create professional and UX-optimized products.\n- Production of custom UI assets as required by the development team.\n- Maintain company products style guide.`,
                    tools: ["Figma", "Balsamiq Mockups", "Photoshop", "Ai"],
                    highlight: false,
                  },
                  {
                    year: "June 2018 - Feb 2020",
                    title: "UX Designer & Data Entry",
                    company: "TÔT.",
                    description:
                      `- Create personas through user research and data\n- Find creative ways to solve UX problems\n- Communicate design ideas and prototypes to developers\n- Entering data into database software and checking to ensure the accuracy of the data that has been inputted\n- Testing new database systems and software updates`,
                    tools: ["Sketch", "InVision", "Zeplin", "Survey Monkey", "Qualtrics", "User Testing"],
                    highlight: false,
                  },
                ]} />
            ) : (
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                <div className="space-y-12">
                  {[
                    {
                      year: "Jan 2023 - Now",
                      title: "UX & Research Lead",
                      company: "BRAIN-LIFE JSC",
                      description:
                        `- Lead end-to-end UX strategy for neurotechnology products, including EEG headbands and BCI/HCI-based platforms.\n- Translate complex neuroscientific data into intuitive, user-centered interface designs.\n- Collaborate closely with cross-functional teams (engineering, product, neuroscience) to align design with real-time brain data insights.\n- Conduct and oversee usability testing, A/B testing, and heuristic evaluations to refine product experience.\n- Build and maintain scalable design systems that meet both clinical and user experience standards.\n- Mentor designers and promote UX best practices across teams to ensure cohesive design execution.\n- Advocate for accessible, empathetic design grounded in cognitive science and user behavior.`,
                      tools: ["Figma", "FigJam", "Notion", "Jira", "Trello", "MATLAB"],
                      highlight: true,
                    },
                    {
                      year: "Jan 2023 - Now",
                      title: "Lecturer",
                      company: "ARENA MULTIMEDIA",
                      description:
                        `- Planning teaching, including lectures, seminars/tutorials and learning materials\n- Meeting students individually to discuss progress\n- Checking and assessing students' work\n- Pursuing research\n- Interviewing potential students\n- Carrying out administration, such as attending faculty meetings and writing reports\nSubjects taught:\n- Building Next Generation Website\n- Responsive Design\n- Web / App Designing Concepts\n- User & Product Research\n- UX Design\n- Digital Wireframe\n- UI Design\n- Prototyping`,
                      tools: ["Figma"],
                      highlight: false,
                    },
                    {
                      year: "Apr 2022 - Jan 2025",
                      title: "Product Designer / Product Owner",
                      company: "VNG CORPORATION",
                      description:
                        `- Identify opportunities for new products\n- Analyze how a new product ties in with market needs and consumer preferences\n- Set design requirements based on briefs from internal teams and external partners\n- Research materials and techniques, sketch drafts on paper or digitally\n- Use 3D modeling software to design products and components\n- Produce prototypes and test functionality, improve the design of existing products\n- Gather feedback from product users\n- Take care of the health and spirit of team members\n- Be Scrum Master if necessary`,
                      tools: ["Figma"],
                      highlight: true,
                    },
                    {
                      year: "July 2020 - Mar 2022",
                      title: "UX/UI Designer & Developer",
                      company: "FPT INFORMATION SYSTEM",
                      description:
                        `- Work closely with product and BA teams to gather requirements to innovate and deliver superior product design.\n- Create concept visual solution or framework and pitch to product and tech team from historical, design, business and competitive standpoint.\n- Follow DEV sprint framework to deliver on time for developers to start on implementation.\n- Design UI & UX for Web App, Mobile Apps and for internal products.\n- Collaborate with front-end developers to create professional and UX-optimized products.\n- Production of custom UI assets as required by the development team.\n- Maintain company products style guide.`,
                      tools: ["Figma", "Balsamiq Mockups", "Photoshop", "Ai"],
                      highlight: false,
                    },
                    {
                      year: "June 2018 - Feb 2020",
                      title: "UX Designer & Data Entry",
                      company: "TÔT.",
                      description:
                        `- Create personas through user research and data\n- Find creative ways to solve UX problems\n- Communicate design ideas and prototypes to developers\n- Entering data into database software and checking to ensure the accuracy of the data that has been inputted\n- Testing new database systems and software updates`,
                      tools: ["Sketch", "InVision", "Zeplin", "Survey Monkey", "Qualtrics", "User Testing"],
                      highlight: false,
                    },
                  ].map((job, index) => (
                    <motion.div key={index} variants={fadeInUp} className="relative flex items-start">
                      <div
                        className={`absolute left-6 w-5 h-5 rounded-full border-4 border-white shadow-lg ${
                          job.highlight
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                            : "bg-gradient-to-r from-slate-400 to-slate-500"
                        }`}
                      ></div>
                      <div className="ml-20 flex-1">
                        <div
                          className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                            job.highlight
                              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                              : "bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700"
                          }`}
                        >
                          {job.year}
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                          <h3 className="text-2xl font-bold text-slate-800 mb-2">{job.title}</h3>
                          <p className="text-lg font-semibold text-indigo-600 mb-2">{job.company}</p>
                          <p className="text-slate-700 mb-4">
                            <ExpandableText text={job.description} maxChars={120} />
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {job.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section ref={projectsRef} className="py-20 px-4 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-sm"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-5xl font-light text-slate-800 mb-6">
                <span className="bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">Featured</span>{" "}
                <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
            </motion.div>
            {/* Tabs for company */}
            <div className="flex gap-2 justify-center mb-6 flex-wrap">
              {companyTags.map((tag) => (
                <button
                  key={tag}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${selectedCompany === tag ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-indigo-500" : "bg-white/80 text-slate-700 border-slate-200 hover:bg-indigo-50"}`}
                  onClick={() => setSelectedCompany(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            {/* Projects list */}
            {isMobile ? (
              <ProjectsSlider projects={projectsByCompany} />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsByCompany.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 transition-all duration-500 flex flex-col h-full min-h-[480px] justify-between">
                      <div className={`w-full h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300"></div>
                        <span className="text-white font-bold text-lg z-10">{project.category}</span>
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
                      </div>
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                          <p className="text-indigo-600 font-medium text-sm mb-3">{project.company}</p>
                          <p className="text-slate-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs rounded-full font-medium">{project.category}</span>
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-auto h-8 flex items-center justify-center group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                            <Button variant="secondary" size="sm" className="flex items-center gap-1 px-2 py-1 text-xs font-semibold" asChild>
                              <span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect width="24" height="24" rx="6" fill="#fff"/>
                                  <path d="M12 12a3 3 0 1 0 0-6h-3v6h3z" fill="#F24E1E"/>
                                  <path d="M9 15a3 3 0 1 0 0-6v6z" fill="#A259FF"/>
                                  <path d="M12 21a3 3 0 0 0 3-3 3 3 0 0 0-3-3h-3v3a3 3 0 0 0 3 3z" fill="#0ACF83"/>
                                  <path d="M6 6a3 3 0 0 1 3-3h3a3 3 0 1 1 0 6H9a3 3 0 0 1-3-3z" fill="#FF7262"/>
                                  <path d="M6 12a3 3 0 0 1 3-3h3a3 3 0 1 1 0 6H9a3 3 0 0 1-3-3z" fill="#1ABCFE"/>
                                </svg>
                                Figma
                              </span>
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer ref={contactRef} className="relative z-10 py-16 px-6 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-indigo-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-light text-white mb-6">
              Let's{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Connect
              </span>
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"
            ></motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Phone className="w-6 h-6" />,
                label: "CALL",
                value: "0978974532",
                gradient: "from-blue-400 to-indigo-500",
              },
              {
                icon: <Mail className="w-6 h-6" />,
                label: "E-MAIL",
                value: "ThuyHB.17@gmail.com",
                gradient: "from-purple-400 to-pink-500",
              },
              {
                icon: <Linkedin className="w-6 h-6" />,
                label: "LINKEDIN",
                value: "linkedin.com/in/thuyhb",
                gradient: "from-indigo-400 to-purple-500",
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${contact.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {contact.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{contact.label}</h3>
                <p className="text-white/80 text-sm">{contact.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center text-white/60 text-sm">
            <p>© 2024 by Ho Bich Thuy. Crafted with passion for exceptional user experiences.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

function ExperienceTimelineSlider({ jobs }: { jobs: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 16 },
    mode: "snap",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  })
  const showIndicator = jobs.length > 1;
  return (
    <div className="relative pb-8">
      <div ref={sliderRef} className="keen-slider">
        {jobs.map((job, index) => (
          <div className="keen-slider__slide p-1" key={index}>
            <div className="relative flex items-start">
              <div className={`absolute left-6 w-5 h-5 rounded-full border-4 border-white shadow-lg ${job.highlight ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gradient-to-r from-slate-400 to-slate-500"}`}></div>
              <div className="ml-20 flex-1">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${job.highlight ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : "bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700"}`}>{job.year}</div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{job.title}</h3>
                  <p className="text-lg font-semibold text-indigo-600 mb-2">{job.company}</p>
                  <p className="text-slate-700 mb-4">
                    <ExpandableText text={job.description} maxChars={120} />
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.tools.map((tool: string) => (
                      <span key={tool} className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showIndicator && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 shadow-lg hover:scale-110 transition-all disabled:opacity-40"
            onClick={() => instanceRef.current?.prev()}
            disabled={currentSlide === 0}
            aria-label="Previous slide"
          >
            <ArrowRight className="w-6 h-6 text-indigo-600 rotate-180" />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 shadow-lg hover:scale-110 transition-all disabled:opacity-40"
            onClick={() => instanceRef.current?.next()}
            disabled={currentSlide === jobs.length - 1}
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6 text-indigo-600" />
          </button>
        </div>
      )}
    </div>
  )
}

function ProjectsSlider({ projects }: { projects: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1, spacing: 16 },
    mode: "snap",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });
  const showIndicator = projects.length > 1;
  return (
    <div className="relative pb-8">
      <div ref={sliderRef} className="keen-slider">
        {projects.map((project, index) => (
          <div className="keen-slider__slide p-1" key={index}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 transition-all duration-500 h-[480px] flex flex-col">
              <div className={`w-full h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300"></div>
                <span className="text-white font-bold text-lg z-10">{project.category}</span>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                  <p className="text-indigo-600 font-medium text-sm mb-3">{project.company}</p>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs rounded-full font-medium">{project.category}</span>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-auto h-8 flex items-center justify-center group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <Button variant="secondary" size="sm" className="flex items-center gap-1 px-2 py-1 text-xs font-semibold" asChild>
                      <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="6" fill="#fff"/>
                          <path d="M12 12a3 3 0 1 0 0-6h-3v6h3z" fill="#F24E1E"/>
                          <path d="M9 15a3 3 0 1 0 0-6v6z" fill="#A259FF"/>
                          <path d="M12 21a3 3 0 0 0 3-3 3 3 0 0 0-3-3h-3v3a3 3 0 0 0 3 3z" fill="#0ACF83"/>
                          <path d="M6 6a3 3 0 0 1 3-3h3a3 3 0 1 1 0 6H9a3 3 0 0 1-3-3z" fill="#FF7262"/>
                          <path d="M6 12a3 3 0 0 1 3-3h3a3 3 0 1 1 0 6H9a3 3 0 0 1-3-3z" fill="#1ABCFE"/>
                        </svg>
                        Figma
                      </span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showIndicator && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 shadow-lg hover:scale-110 transition-all disabled:opacity-40"
            onClick={() => instanceRef.current?.prev()}
            disabled={currentSlide === 0}
            aria-label="Previous slide"
          >
            <ArrowRight className="w-6 h-6 text-indigo-600 rotate-180" />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 shadow-lg hover:scale-110 transition-all disabled:opacity-40"
            onClick={() => instanceRef.current?.next()}
            disabled={currentSlide === projects.length - 1}
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6 text-indigo-600" />
          </button>
        </div>
      )}
    </div>
  );
}
