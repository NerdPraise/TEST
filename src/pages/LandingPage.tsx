import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Check } from 'lucide-react'

const LandingPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add('animate-fade-in')
    }
  }, [])

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-20 mt-12 relative opacity-1 transition-opacity duration-700"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-exo leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
              Detect Fake Images
            </span>
            <br />
            with Advanced AI Technology
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Instantly analyze any image and determine if it's authentic or
            AI-generated with cutting-edge deep learning technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/upload"
              className="btn-primary text-center text-white flex items-center justify-center"
            >
              Try It Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="#about"
              className="btn-secondary text-center flex items-center justify-center"
            >
              Learn More
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent-teal mr-2" />
              <span className="text-slate-300">Fast Analysis</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent-teal mr-2" />
              <span className="text-slate-300">99% Accuracy</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-accent-teal mr-2" />
              <span className="text-slate-300">Easy to Use</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative">
        <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-exo text-white">
                How It Works
              </h2>
              <p className="text-slate-300">
                Our advanced AI system analyzes pixel patterns, metadata, and
                image inconsistencies that are invisible to the human eye but
                reveal whether an image is authentic or AI-generated.
              </p>
              <div className="pt-4">
                <Link
                  to="/upload"
                  className="text-accent-blue font-semibold flex items-center hover:text-blue-400 transition-colors"
                >
                  Try the detector <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <div className="glass-card-dark p-4 flex">
                <div className="mr-4">
                  <Shield className="h-10 w-10 text-accent-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Trustworthy Results
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Our model has been trained on millions of real and fake
                    images for optimal accuracy.
                  </p>
                </div>
              </div>

              <div className="glass-card-dark p-4 flex">
                <div className="mr-4">
                  <Zap className="h-10 w-10 text-accent-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Instant Analysis
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Get results in seconds with our optimized classification
                    algorithms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-3xl mx-auto">
        <div className="glass-card p-8 md:p-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
          <h2 className="text-3xl font-bold font-exo text-white mb-4">
            Ready to detect fake images?
          </h2>
          <p className="text-slate-300 mb-8">
            Upload your image now and get instant results with our
            state-of-the-art classification technology.
          </p>
          <Link
            to="/upload"
            className="btn-primary mx-auto text-center inline-block text-white"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
