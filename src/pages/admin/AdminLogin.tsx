import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Lock,
  User,
  Key,
  Eye,
  EyeOff,
  Shield,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const { db, login } = useCMS();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!usernameOrEmail.trim() || !password) {
      setErrorMsg('Please enter your username (or email) and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login(usernameOrEmail, password, rememberMe);
      setIsSubmitting(false);

      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMsg(res.message || 'Invalid username or password. Please verify and try again.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('An unexpected security error occurred during verification.');
    }
  };

  const handleQuickFill = (userIdentifier: string, userPass: string) => {
    setUsernameOrEmail(userIdentifier);
    setPassword(userPass);
    setErrorMsg(null);
  };

  const initialSuperAdmin = {
    username: 'hello19',
    pass: 'idk19',
    label: 'Initial Super Admin Account'
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-4 py-12 relative bg-star-pattern selection:bg-[#D4AF37] selection:text-black">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Return to website link */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center relative z-10">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-[#D4AF37] transition-colors font-mono uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Archive</span>
        </button>

        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 px-2 py-0.5 border border-[#D4AF37]/20 rounded-xs">
          <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
          <span>Encrypted Auth</span>
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#0F0F0F] border border-white/15 p-8 rounded-sm shadow-2xl space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 border-2 border-[#D4AF37] mx-auto flex items-center justify-center rotate-45 bg-black/80 shadow-xl">
            {db.branding.mainLogo ? (
              <div className="-rotate-45 w-9 h-9 overflow-hidden flex items-center justify-center">
                <img
                  src={db.branding.mainLogo}
                  alt={db.branding.channelName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <span className="-rotate-45 font-serif font-bold text-[#D4AF37] text-xl">K</span>
            )}
          </div>

          <div className="pt-2">
            <h1 className="font-serif text-2xl font-bold text-[#F5F5F0] tracking-wide">
              {db.branding.channelName}
            </h1>
            <p className="text-xs text-[#D4AF37] font-mono uppercase tracking-widest mt-0.5">
              Command Center Authentication
            </p>
          </div>
          <p className="text-xs text-white/50 leading-relaxed font-light">
            Authorized personnel only. Enter your credentials to manage historical archives, video releases, and security settings.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 bg-red-950/50 border border-red-800/70 rounded-sm flex items-start gap-2.5 text-xs text-red-200 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
              Username or Registered Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <User className="w-4 h-4" />
              </div>
              <input
                id="login-username"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="e.g. hello19 or admin@thekohistani.com"
                required
                autoComplete="username"
                className="w-full pl-10 pr-4 py-2.5 bg-black/70 border border-white/15 focus:border-[#D4AF37] text-sm text-[#F5F5F0] placeholder-white/25 rounded-sm focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-white/70">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <Key className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-2.5 bg-black/70 border border-white/15 focus:border-[#D4AF37] text-sm text-[#F5F5F0] placeholder-white/25 rounded-sm focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-white/70 cursor-pointer select-none hover:text-white">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded-xs bg-black/60 border-white/20 text-[#D4AF37] focus:ring-0 focus:ring-offset-0"
              />
              <span className="font-mono text-[11px]">Remember this device (30 Days)</span>
            </label>
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            <span>{isSubmitting ? 'Verifying Encrypted Hash...' : 'Sign In to Admin Panel'}</span>
          </button>
        </form>

        {/* Initial Super Admin Setup Card */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="p-3 bg-[#161616] border border-[#D4AF37]/30 rounded-sm">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#D4AF37] mb-1.5">
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Default Super Admin Credentials</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-xs text-[#D4AF37]">
                SHA-256 Hashed
              </span>
            </div>
            
            <p className="text-[11px] text-white/60 mb-2 font-light">
              Use the provisioned initial administrator credentials to access the system:
            </p>

            <button
              type="button"
              onClick={() => handleQuickFill(initialSuperAdmin.username, initialSuperAdmin.pass)}
              className="w-full p-2 rounded-xs bg-black/60 hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37]/50 text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="font-mono text-xs text-white/80 group-hover:text-white">
                <span>user: </span><span className="text-[#D4AF37] font-bold">hello19</span>
                <span className="mx-2 text-white/30">|</span>
                <span>pass: </span><span className="text-[#D4AF37] font-bold">idk19</span>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider group-hover:underline">
                Autofill →
              </span>
            </button>
          </div>

          {/* Additional Team Demo Accounts */}
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-1">
            <span>Additional Team Accounts:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('tariq', 'tariq2026')}
                className="hover:text-[#D4AF37] underline"
              >
                @tariq (Admin)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleQuickFill('sara', 'sara2026')}
                className="hover:text-[#D4AF37] underline"
              >
                @sara (Editor)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
