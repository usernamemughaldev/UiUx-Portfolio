import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import config from '../config';
import ContactCapsuleCanvas from '../components/ContactCapsuleCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function ContactHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Capsule entrance - spatial deep-dive effect
      gsap.fromTo(capsuleRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotateX: 15,
        },
        {
          scale: 1,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: capsuleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Parallax tilt on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!capsuleRef.current) return;

      const rect = capsuleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateY = ((e.clientX - centerX) / rect.width) * 5;
      const rotateX = -((e.clientY - centerY) / rect.height) * 5;

      gsap.to(capsuleRef.current, {
        rotateY,
        rotateX,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      if (!capsuleRef.current) return;
      gsap.to(capsuleRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove, { passive: true });
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Input focus glow effect
  useEffect(() => {
    if (!capsuleRef.current) return;

    if (focusedField) {
      gsap.to(capsuleRef.current, {
        boxShadow: '0 0 60px rgba(0, 212, 255, 0.2), 0 0 100px rgba(0, 212, 255, 0.1)',
        duration: 0.3
      });
    } else {
      gsap.to(capsuleRef.current, {
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        duration: 0.3
      });
    }
  }, [focusedField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Particle burst effect simulation
    const button = formRef.current?.querySelector('button[type="submit"]');
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      style={{ perspective: '1000px' }}
    >
      {/* Background - Three.js Canvas */}
      <ContactCapsuleCanvas />

      <div className="relative w-full max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--primary)]" />
            <span className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest">
              Get in Touch
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--primary)]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Create <span className="text-gradient">Together</span>
          </h2>

          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your vision to life.
          </p>
        </div>

        {/* 3D Message Capsule */}
        <div
          ref={capsuleRef}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(26, 26, 36, 0.8)',
            backdropFilter: 'blur(40px)',
            border: '1px solid var(--border)',
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, transparent 50%, rgba(255, 51, 102, 0.05) 100%)'
            }}
          />

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative z-10 p-8 md:p-12"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-[var(--text-secondary)]">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[var(--text-muted)]" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-4 rounded-xl overflow-hidden disabled:opacity-70"
                  data-cursor-hover
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="font-semibold text-white">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="font-semibold text-white">Send Message</span>
                        <Send className="w-5 h-5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </>
            )}
          </form>

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-[var(--primary)] to-transparent" />
          <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-[var(--primary)] to-transparent" />
          <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-[var(--secondary)] to-transparent" />
          <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-[var(--secondary)] to-transparent" />
          <div className="absolute bottom-0 left-0 w-20 h-px bg-gradient-to-r from-[var(--secondary)] to-transparent" />
          <div className="absolute bottom-0 left-0 w-px h-20 bg-gradient-to-t from-[var(--secondary)] to-transparent" />
          <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-[var(--primary)] to-transparent" />
          <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-[var(--primary)] to-transparent" />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            Or reach me directly at{' '}
            <a
              href={`mailto:${config.brand.email}`}
              className="text-[var(--primary)] hover:underline"
            >
              {config.brand.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
