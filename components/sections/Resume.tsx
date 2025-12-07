'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, FileText, Eye, X } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function Resume() {
  const [showResume, setShowResume] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Section id="resume" title="Resume" subtitle="View & Download">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center" glow>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-6">
                <FileText className="text-white" size={40} />
              </div>
              <h3 className="text-3xl font-bold mb-4 gradient-text">Rohit Bhanose</h3>
              <p className="text-gray-300 text-lg mb-2">CSE AI &amp; DS Engineering Student</p>
              <p className="text-gray-400 text-sm">MIT World Peace University &amp; IIT Madras</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* VIEW RESUME BUTTON */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button
                  onClick={() => setShowResume(true)}
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye size={20} />
                  View Resume
                </Button>
              </motion.div>

              {/* DOWNLOAD BUTTON */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  href="/resume.pdf"
                  download="Rohit_Bhanose_Resume.pdf"
                  variant="outline"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download PDF
                </Button>
              </motion.div>
            </div>

            {/* Quick Info */}
            <motion.div
              className="grid md:grid-cols-3 gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card hover>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <a
                  href="mailto:rohit.bhanose@gmail.com"
                  className="text-accent hover:text-primary transition-colors"
                >
                  rohit.bhanose@gmail.com
                </a>
              </Card>
              <Card hover>
                <p className="text-gray-400 text-sm mb-1">Phone</p>
                <p className="text-white">8788457198</p>
              </Card>
              <Card hover>
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-white">Pune, India</p>
              </Card>
            </motion.div>
          </Card>
        </motion.div>
      </div>

      {/* POPUP MODAL */}
      {showResume && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowResume(false)}
        >
          <div
            className="relative w-full max-w-6xl bg-white rounded-xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b bg-white">
              <h2 className="text-xl font-bold text-gray-800">Resume Preview</h2>
              <button
                onClick={() => setShowResume(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Images Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <img
                  src="/resume-1.png"
                  alt="Resume Page 1"
                  className="w-full md:w-[48%] shadow-lg rounded-sm object-contain bg-white"
                />
                <img
                  src="/resume-2.png"
                  alt="Resume Page 2"
                  className="w-full md:w-[48%] shadow-lg rounded-sm object-contain bg-white"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-white flex justify-end">
              <a
                href="/resume.pdf"
                download="Rohit_Bhanose_Resume.pdf"
                className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Download size={18} />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
