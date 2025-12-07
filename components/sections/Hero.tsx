'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download, Briefcase, GraduationCap } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-accent text-sm font-semibold uppercase tracking-wider mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to my Portfolio
            </motion.p>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="gradient-text">Rohit Bhanose</span>
              <br />
              <span className="text-white">CSE AI & DS</span>
              <br />
              <span className="neon-text-cyan">Engineering Student</span>
            </motion.h1>
            
            <motion.p
              className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              First-year Computer Science (AI & Data Science) student passionate about applying AI concepts to real-world challenges and building impactful projects.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                onClick={() => {
                  document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View My Experience
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.querySelector('#resume')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex items-center gap-2"
              >
                <Download size={20} />
                View Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Current Status */}
          <motion.div
            className="relative space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Currently Working At */}
            <motion.div
              className="glass-strong rounded-2xl p-6 border border-primary/30 shadow-neon-lg hover:shadow-neon transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/20 flex-shrink-0">
                  <Briefcase className="text-accent" size={28} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Currently Working At</p>
                  <a
                    href="https://aiera-mindlabs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors inline-flex items-center">
                      aiera mindlabs
                      <span className="ml-2 text-sm">↗</span>
                    </h3>
                  </a>
                  <p className="text-sm text-accent font-semibold mb-2">Digital Marketing & Social Media Head</p>
                  <p className="text-xs text-gray-400">Leading digital presence across Instagram, LinkedIn, and other platforms</p>
                </div>
              </div>
            </motion.div>

            {/* Currently Studying At */}
            <motion.div
              className="glass-strong rounded-2xl p-6 border border-primary/30 shadow-neon-lg hover:shadow-neon transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/20 flex-shrink-0">
                  <GraduationCap className="text-primary" size={28} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Currently Studying At</p>
                  <h3 className="text-xl font-bold text-white mb-2">MIT World Peace University</h3>
                  <p className="text-sm text-primary font-semibold mb-3">CSE (AI & Data Science)</p>
                  <div className="pt-3 border-t border-primary/20">
                    <h4 className="text-lg font-bold text-white mb-1">IIT Madras</h4>
                    <p className="text-sm text-primary font-semibold">BS Data Science & Applications</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button
            onClick={scrollToAbout}
            className="text-accent hover:text-primary transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown size={32} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

