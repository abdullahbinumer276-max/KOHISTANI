import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Mail,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Youtube,
  Twitter,
  Instagram
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { db, sendMessage } = useCMS();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Documentary Topic Suggestion');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    sendMessage({
      name,
      email,
      subject,
      message
    });

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 relative bg-star-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase font-mono">
              Direct Communication
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F5F5F0] tracking-tight">
            Contact & Collaborations
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Have a documentary topic suggestion, historical manuscript discovery, or institutional collaboration inquiry? Reach out directly to {db.branding.channelName}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Details & Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-sm bg-[#111111] border border-white/10 space-y-4 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-[#F5F5F0]">
                Direct Contacts
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-white/70">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-black/60 text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block font-mono uppercase">Official Email</span>
                    <a href={`mailto:${db.branding.email}`} className="text-[#F5F5F0] hover:text-[#D4AF37] transition-colors">
                      {db.branding.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-red-950/40 text-red-400 flex items-center justify-center shrink-0 border border-red-700/30">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block font-mono uppercase">YouTube Channel</span>
                    <span className="text-[#F5F5F0]">{db.branding.handle}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-[#111111] border border-white/10 space-y-3 shadow-xl">
              <h4 className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
                Collaboration Categories
              </h4>
              <ul className="space-y-1.5 text-xs text-white/60 font-light">
                <li>• Academic Manuscript & Archival Sharing</li>
                <li>• University & School Educational Licensing</li>
                <li>• Voice Acting & Sound Composition</li>
                <li>• Sponsorships & Historical Media Inquiries</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <div className="p-6 sm:p-8 rounded-sm bg-[#111111] border border-white/15 shadow-2xl space-y-6">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#F5F5F0]">
                    Message Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 max-w-sm mx-auto font-light">
                    Thank you for contacting The Kohistani. Your message has been logged in our CMS inbox and our research team will respond shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-sm bg-white/5 hover:bg-white/10 text-xs font-bold text-[#D4AF37] transition-colors border border-white/10 uppercase tracking-wider font-mono"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#F5F5F0]">
                    Send a Message
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1 font-mono uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Dr. Zayd Al-Mansoor"
                      className="w-full px-4 py-2.5 bg-black/50 border border-white/15 text-sm text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#D4AF37] rounded-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1 font-mono uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. zayd@history.org"
                      className="w-full px-4 py-2.5 bg-black/50 border border-white/15 text-sm text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#D4AF37] rounded-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1 font-mono uppercase">
                      Subject / Topic
                    </label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black/50 border border-white/15 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#D4AF37] rounded-sm transition-colors"
                    >
                      <option value="Documentary Topic Suggestion" className="bg-[#111111] text-white">Documentary Topic Suggestion</option>
                      <option value="Historical Manuscript / Research Collaboration" className="bg-[#111111] text-white">Historical Manuscript / Research Collaboration</option>
                      <option value="School / Educational Licensing" className="bg-[#111111] text-white">School / Educational Licensing</option>
                      <option value="General Inquiry / Appreciation" className="bg-[#111111] text-white">General Inquiry / Appreciation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1 font-mono uppercase">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Detail your inquiry, proposed historical event, or manuscript reference..."
                      className="w-full px-4 py-2.5 bg-black/50 border border-white/15 text-sm text-[#F5F5F0] placeholder-white/30 focus:outline-none focus:border-[#D4AF37] rounded-sm transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-sm bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold text-xs tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to The Kohistani</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
