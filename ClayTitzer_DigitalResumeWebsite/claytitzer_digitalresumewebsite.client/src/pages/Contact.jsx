import { useRef, useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import PageHeader from '../components/PageHeader'
import ScrollSpy from '../components/ScrollSpy'
import { contact } from '../data/resume'

const FORM_ACTION = 'https://formspree.io/f/mbdaovgb'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch(FORM_ACTION, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        formRef.current?.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <ScrollSpy sections={['Info', 'Message']} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">
        <PageHeader label="Connect" title="Get in Touch" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          {/* Contact info */}
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs text-gold tracking-widest uppercase m-0 mb-2">Location</p>
                <p className="text-base text-charcoal/80 m-0">{contact.location}</p>
              </div>
              <div>
                <p className="font-mono text-xs text-gold tracking-widest uppercase m-0 mb-2">Email</p>
                <a href={`mailto:${contact.email}`} className="text-base text-accent hover:text-accent-hover transition-colors duration-200 no-underline">
                  {contact.email}
                </a>
              </div>
              {contact.links.length > 0 && (
                <div>
                  <p className="font-mono text-xs text-gold tracking-widest uppercase m-0 mb-2">Links</p>
                  <div className="flex gap-4">
                    {contact.links.map(({ label, url }) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:text-accent-hover transition-colors duration-200 no-underline border border-accent/20 px-3 py-1.5 rounded-sm hover:border-accent/50"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal delay={200}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="block font-mono text-xs text-gold tracking-widest uppercase mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 text-sm text-charcoal bg-transparent border border-divider/60 rounded-sm outline-none focus:border-accent transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-mono text-xs text-gold tracking-widest uppercase mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 text-sm text-charcoal bg-transparent border border-divider/60 rounded-sm outline-none focus:border-accent transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-mono text-xs text-gold tracking-widest uppercase mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 text-sm text-charcoal bg-transparent border border-divider/60 rounded-sm outline-none focus:border-accent transition-colors duration-200 resize-y"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="text-sm font-medium px-5 py-2.5 bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-200 cursor-pointer border-none disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <p role="status" className="text-sm text-accent m-0 mt-2">Message sent — thank you!</p>
              )}
              {status === 'error' && (
                <p role="alert" className="text-sm text-gold m-0 mt-2">Something went wrong. Please try again or email directly.</p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}
