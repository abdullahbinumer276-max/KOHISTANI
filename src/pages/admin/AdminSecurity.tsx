import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Key,
  Lock,
  User,
  UserPlus,
  Users,
  Edit2,
  Trash2,
  Power,
  RefreshCw,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Search,
  CheckCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { UserRole, AdminUser } from '../../types';

export const AdminSecurity: React.FC = () => {
  const {
    db,
    currentUser,
    activeUser,
    changeCurrentPassword,
    updateCurrentUsername,
    createAdminUser,
    updateAdminUser,
    resetAdminUserPassword,
    toggleUserStatus,
    deleteAdminUser,
    switchUserRole,
    showToast
  } = useCMS();

  const loggedUser = currentUser || activeUser;
  const isSuperAdmin = loggedUser.role === 'super_admin';

  // --- TAB SUB-NAVIGATION ---
  const [activeSection, setActiveSection] = useState<'profile_security' | 'user_management' | 'role_matrix'>('profile_security');

  // --- USERNAME CHANGE STATE ---
  const [newUsername, setNewUsername] = useState(loggedUser.username || '');
  const [usernameMsg, setUsernameMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameMsg(null);
    if (!newUsername.trim()) {
      setUsernameMsg({ type: 'error', text: 'Username cannot be empty.' });
      return;
    }
    const res = await updateCurrentUsername(newUsername.trim());
    if (res.success) {
      setUsernameMsg({ type: 'success', text: res.message });
    } else {
      setUsernameMsg({ type: 'error', text: res.message });
    }
  };

  // --- PASSWORD CHANGE STATE ---
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    if (!oldPassword) {
      setPassError('Please enter your current password.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match. Please verify.');
      return;
    }

    setIsChangingPass(true);

    try {
      const res = await changeCurrentPassword(oldPassword, newPassword);
      setIsChangingPass(false);

      if (res.success) {
        setPassSuccess('Your password has been securely updated and hashed using SHA-256 with a unique salt.');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPassError(res.message);
      }
    } catch (err) {
      setIsChangingPass(false);
      setPassError('Failed to update password. An unexpected error occurred.');
    }
  };

  // --- USER MANAGEMENT STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [resetPassUser, setResetPassUser] = useState<AdminUser | null>(null);
  const [newResetPassword, setNewResetPassword] = useState('');

  // Create User Form State
  const [createForm, setCreateForm] = useState({
    username: '',
    name: '',
    email: '',
    role: 'editor' as UserRole,
    password: '',
    title: ''
  });
  const [createError, setCreateError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    if (!createForm.username || !createForm.name || !createForm.email || !createForm.password) {
      setCreateError('Please fill in all required fields.');
      return;
    }

    if (createForm.password.length < 6) {
      setCreateError('Password must be at least 6 characters.');
      return;
    }

    setIsCreating(true);
    const res = await createAdminUser(createForm);
    setIsCreating(false);

    if (res.success) {
      setIsCreateModalOpen(false);
      setCreateForm({
        username: '',
        name: '',
        email: '',
        role: 'editor',
        password: '',
        title: ''
      });
    } else {
      setCreateError(res.message);
    }
  };

  // Edit User Form State
  const [editForm, setEditForm] = useState({
    name: '',
    username: '',
    email: '',
    role: 'editor' as UserRole,
    title: ''
  });

  const openEditModal = (user: AdminUser) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      title: user.title || ''
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const res = await updateAdminUser(editingUser.id, editForm);
    if (res.success) {
      setEditingUser(null);
    }
  };

  const handleResetUserPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPassUser) return;
    if (!newResetPassword || newResetPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }

    const res = await resetAdminUserPassword(resetPassUser.id, newResetPassword);
    if (res.success) {
      setResetPassUser(null);
      setNewResetPassword('');
    }
  };

  // Filtered users
  const filteredUsers = db.users.filter(u => {
    const matchesSearch =
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const rolesMatrix: { role: UserRole; title: string; desc: string; permissions: string[] }[] = [
    {
      role: 'super_admin',
      title: 'Super Admin',
      desc: 'Complete control over brand settings, security policies, team accounts, and database restores.',
      permissions: [
        'User Management (Create, Edit, Delete, Reset)',
        'Change Super Admin Username & Master Password',
        'Database Backup (Export / Import JSON)',
        'Full Branding & Channel Styling Access',
        'Homepage Layouts & Hero Section Customization',
        'Full Video, Article, Timeline & Personality CRUD',
        'Messages Inbox & Contact Form Direct Replies'
      ]
    },
    {
      role: 'admin',
      title: 'Admin',
      desc: 'Access to website layout, category structures, SEO tags, messages inbox, and content publishing.',
      permissions: [
        'Homepage Layout & Section Ordering',
        'Categories & Historical Eras Management',
        'SEO & Meta-Tag Configuration',
        'Full Video, Article, Timeline & Personality Management',
        'Messages Inbox Review & Reply'
      ]
    },
    {
      role: 'editor',
      title: 'Editor',
      desc: 'Focused purely on documentary entry, article writing, timeline milestones, and media asset management.',
      permissions: [
        'Video & Documentary Upload & Management',
        'Article Drafting & Publishing',
        'Timeline Event Submission & Editing',
        'Historical Personality Archive Management',
        'Media Library Asset Uploads & Copy'
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      {/* Header & Route Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>/admin/settings/security</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F0]">
            Security & User Management
          </h2>
          <p className="text-xs text-white/50 mt-1 font-light">
            Manage admin credentials, update portal password with cryptographic hashing, and administer team privileges.
          </p>
        </div>

        {/* Sub Navigation Pills */}
        <div className="flex items-center bg-black/60 border border-white/15 p-1 rounded-sm">
          <button
            onClick={() => setActiveSection('profile_security')}
            className={`px-3 py-1.5 rounded-xs text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSection === 'profile_security'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            My Account & Password
          </button>
          <button
            onClick={() => setActiveSection('user_management')}
            className={`px-3 py-1.5 rounded-xs text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSection === 'user_management'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Team Users ({db.users.length})
          </button>
          <button
            onClick={() => setActiveSection('role_matrix')}
            className={`px-3 py-1.5 rounded-xs text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeSection === 'role_matrix'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Role Privileges
          </button>
        </div>
      </div>

      {/* SECTION 1: MY ACCOUNT & PASSWORD */}
      {activeSection === 'profile_security' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Active User Overview Card */}
          <div className="p-6 bg-[#0E0E0E] border border-[#D4AF37]/40 rounded-sm shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold text-[#D4AF37] shrink-0">
                {loggedUser.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif text-xl font-bold text-[#F5F5F0]">
                    {loggedUser.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 uppercase font-bold">
                    {loggedUser.role.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/50 font-mono">
                  <span>username: <strong className="text-[#D4AF37]">@{loggedUser.username}</strong></span>
                  <span>•</span>
                  <span>{loggedUser.email}</span>
                </div>
                <div className="text-[11px] text-[#D4AF37]/80">
                  {loggedUser.title || 'Super Administrator'}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/40 border border-emerald-700/50 rounded-sm text-emerald-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Session Encrypted</span>
              </span>
              <span className="text-[10px] font-mono text-white/40">
                Created: {loggedUser.createdAt || '2026-01-01'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Change Username Card */}
            <div className="bg-[#0F0F0F] border border-white/15 p-6 rounded-sm space-y-5">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <User className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <h3 className="font-serif text-base font-bold text-[#F5F5F0]">
                    Change Username
                  </h3>
                  <p className="text-[11px] text-white/40">
                    Your unique administrative username used for logging into the portal.
                  </p>
                </div>
              </div>

              {usernameMsg && (
                <div
                  className={`p-3 rounded-sm flex items-start gap-2.5 text-xs ${
                    usernameMsg.type === 'success'
                      ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-200'
                      : 'bg-red-950/40 border border-red-800/60 text-red-200'
                  }`}
                >
                  {usernameMsg.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span>{usernameMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdateUsername} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                    Current Username
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`@${loggedUser.username}`}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-xs text-white/40 rounded-sm font-mono cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                    New Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#D4AF37] font-mono text-xs">
                      @
                    </div>
                    <input
                      id="security-new-username"
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="e.g. hello19 or master_admin"
                      required
                      minLength={3}
                      className="w-full pl-8 pr-3 py-2 bg-black/70 border border-white/15 focus:border-[#D4AF37] text-xs text-[#F5F5F0] rounded-sm focus:outline-none transition-colors font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-white/40 mt-1">
                    Letters, numbers, and underscores only. Min 3 characters.
                  </p>
                </div>

                <button
                  id="security-update-username-btn"
                  type="submit"
                  className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Update Admin Username</span>
                </button>
              </form>
            </div>

            {/* Change Password Card */}
            <div className="bg-[#0F0F0F] border border-white/15 p-6 rounded-sm space-y-5">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <Lock className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <h3 className="font-serif text-base font-bold text-[#F5F5F0]">
                    Change Portal Password
                  </h3>
                  <p className="text-[11px] text-white/40">
                    Passwords are salted and securely hashed using Web Crypto SHA-256.
                  </p>
                </div>
              </div>

              {passError && (
                <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-sm flex items-start gap-2.5 text-xs text-red-200">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{passError}</span>
                </div>
              )}

              {passSuccess && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-sm flex items-start gap-2.5 text-xs text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{passSuccess}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="security-current-password"
                      type={showOld ? 'text' : 'password'}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter your current password"
                      required
                      className="w-full pl-3 pr-10 py-2 bg-black/70 border border-white/15 focus:border-[#D4AF37] text-xs text-[#F5F5F0] rounded-sm focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOld(!showOld)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white cursor-pointer"
                    >
                      {showOld ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                    New Password (Min 6 chars)
                  </label>
                  <div className="relative">
                    <input
                      id="security-new-password"
                      type={showNew ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      required
                      minLength={6}
                      className="w-full pl-3 pr-10 py-2 bg-black/70 border border-white/15 focus:border-[#D4AF37] text-xs text-[#F5F5F0] rounded-sm focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white cursor-pointer"
                    >
                      {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="security-confirm-password"
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password to confirm"
                      required
                      minLength={6}
                      className="w-full pl-3 pr-10 py-2 bg-black/70 border border-white/15 focus:border-[#D4AF37] text-xs text-[#F5F5F0] rounded-sm focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white cursor-pointer"
                    >
                      {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <button
                  id="security-update-password-btn"
                  type="submit"
                  disabled={isChangingPass}
                  className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isChangingPass ? (
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Key className="w-3.5 h-3.5" />
                  )}
                  <span>{isChangingPass ? 'Hashing & Updating...' : 'Update & Hash Password'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TEAM USER MANAGEMENT */}
      {activeSection === 'user_management' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0F0F0F] border border-white/15 p-4 rounded-sm">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, username, or email..."
                  className="w-full pl-9 pr-3 py-1.5 bg-black/60 border border-white/10 text-xs text-white rounded-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-1.5 bg-black/60 border border-white/10 text-xs text-white/80 rounded-sm focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">All Roles</option>
                <option value="super_admin">Super Admins</option>
                <option value="admin">Admins</option>
                <option value="editor">Editors</option>
              </select>
            </div>

            {isSuperAdmin && (
              <button
                id="create-admin-btn"
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-md"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add Admin User</span>
              </button>
            )}
          </div>

          {/* User Table / Cards */}
          <div className="bg-[#0F0F0F] border border-white/15 rounded-sm overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-black/60 border-b border-white/10 font-mono text-white/50 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Username & Email</th>
                    <th className="py-3 px-4">Assigned Role</th>
                    <th className="py-3 px-4">Account Status</th>
                    <th className="py-3 px-4">Created Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredUsers.map((user) => {
                    const isSelf = user.id === loggedUser.id;
                    const isActive = user.isActive !== false;

                    return (
                      <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                        {/* User Identity */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/40 flex items-center justify-center font-serif text-xs font-bold text-[#D4AF37] shrink-0">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-serif font-bold text-[#F5F5F0] flex items-center gap-1.5">
                                <span>{user.name}</span>
                                {isSelf && (
                                  <span className="text-[9px] font-mono px-1 py-0.2 rounded-xs bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-white/40">{user.title || 'Team Member'}</div>
                            </div>
                          </div>
                        </td>

                        {/* Username & Email */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="text-white/90 font-bold">@{user.username}</div>
                          <div className="text-[10px] text-white/40">{user.email}</div>
                        </td>

                        {/* Role Badge */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block text-[9px] px-2 py-0.5 rounded-xs border font-mono uppercase font-bold ${
                              user.role === 'super_admin'
                                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40'
                                : user.role === 'admin'
                                ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            }`}
                          >
                            {user.role.replace('_', ' ')}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-xs border ${
                              isActive
                                ? 'bg-emerald-950/40 border-emerald-700/40 text-emerald-300'
                                : 'bg-red-950/40 border-red-800/40 text-red-300'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                              }`}
                            />
                            <span>{isActive ? 'Active' : 'Disabled'}</span>
                          </span>
                        </td>

                        {/* Created Date */}
                        <td className="py-3.5 px-4 font-mono text-white/50 text-[11px]">
                          {user.createdAt || '2026-01-01'}
                        </td>

                        {/* Action Controls */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Reset Password */}
                            {isSuperAdmin && (
                              <button
                                onClick={() => {
                                  setResetPassUser(user);
                                  setNewResetPassword('');
                                }}
                                title="Reset User Password"
                                className="p-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#D4AF37] transition-colors cursor-pointer"
                              >
                                <Key className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Edit Profile */}
                            {isSuperAdmin && (
                              <button
                                onClick={() => openEditModal(user)}
                                title="Edit User Details"
                                className="p-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#D4AF37] transition-colors cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Toggle Enable/Disable */}
                            {isSuperAdmin && !isSelf && (
                              <button
                                onClick={() => toggleUserStatus(user.id)}
                                title={isActive ? 'Disable User Account' : 'Activate User Account'}
                                className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                                  isActive
                                    ? 'bg-amber-950/30 hover:bg-amber-900/50 text-amber-300'
                                    : 'bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-300'
                                }`}
                              >
                                <Power className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Delete User */}
                            {isSuperAdmin && !isSelf && (
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to permanently remove @${user.username}?`)) {
                                    deleteAdminUser(user.id);
                                  }
                                }}
                                title="Delete User Account"
                                className="p-1.5 rounded-sm bg-red-950/30 hover:bg-red-900/50 text-red-300 hover:text-white transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ROLE CAPABILITIES MATRIX */}
      {activeSection === 'role_matrix' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0F0F0F] border border-white/15 p-6 rounded-sm">
            <h3 className="font-serif text-lg font-bold text-[#F5F5F0]">
              Role-Based Access Control (RBAC) Architecture
            </h3>
            <p className="text-xs text-white/50 mt-1 font-light leading-relaxed">
              Every administrator and editor is assigned a specific tier to safeguard historical archives, protect branding integrity, and restrict system mutations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rolesMatrix.map((r) => {
              const isCurrent = loggedUser.role === r.role;
              return (
                <div
                  key={r.role}
                  className={`p-6 rounded-sm border transition-all flex flex-col justify-between space-y-4 ${
                    isCurrent
                      ? 'bg-[#111111] border-[#D4AF37] shadow-xl'
                      : 'bg-[#0E0E0E] border-white/10'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-[#F5F5F0]">
                        {r.title}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-xs text-[9px] bg-[#D4AF37] text-black font-bold uppercase tracking-wider font-mono">
                          Your Active Tier
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      {r.desc}
                    </p>

                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                        Privileges Granted:
                      </span>
                      <ul className="space-y-1.5 text-xs text-white/70">
                        {r.permissions.map((perm, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span className="text-[11px]">{perm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => switchUserRole(r.role)}
                    disabled={isCurrent}
                    className={`w-full py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-black/60 text-white/30 border border-white/10 cursor-default'
                        : 'bg-white/5 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37]'
                    }`}
                  >
                    {isCurrent ? 'Current Tier Active' : `Preview As ${r.title}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- CREATE USER MODAL --- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/20 p-6 rounded-sm w-full max-w-lg space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-serif text-lg font-bold text-[#F5F5F0]">
                  Create New Admin User
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-white/40 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {createError && (
              <div className="p-3 bg-red-950/50 border border-red-800/70 rounded-sm text-xs text-red-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{createError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={createForm.username}
                    onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
                    placeholder="e.g. tariq_historian"
                    required
                    className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    placeholder="e.g. Dr. Tariq Mansoor"
                    required
                    className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    placeholder="e.g. tariq@thekohistani.com"
                    required
                    className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                    Role Tier *
                  </label>
                  <select
                    value={createForm.role}
                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm"
                  >
                    <option value="editor">Editor (Content Writing & Media)</option>
                    <option value="admin">Admin (Website & Category Layouts)</option>
                    <option value="super_admin">Super Admin (Complete Access)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                  Title / Role Description
                </label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  placeholder="e.g. Managing Documentary Editor"
                  className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm"
                />
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                  Initial Password (min 6 chars) *
                </label>
                <input
                  type="password"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  placeholder="Create strong initial password"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm font-mono"
                />
                <p className="text-[10px] text-white/40 mt-1">
                  This password will be salted and stored as a SHA-256 hash.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-sm font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold uppercase tracking-wider rounded-sm cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isCreating ? 'Creating & Hashing...' : 'Create Admin Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT USER MODAL --- */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/20 p-6 rounded-sm w-full max-w-md space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-base font-bold text-[#F5F5F0]">
                Edit Account: @{editingUser.username}
              </h3>
              <button onClick={() => setEditingUser(null)} className="text-white/40 hover:text-white text-xs">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm font-mono"
                />
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm"
                />
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm"
                />
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm"
                />
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                  Role Tier
                </label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value as UserRole })}
                  className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-sm font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold uppercase tracking-wider rounded-sm cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- RESET PASSWORD MODAL --- */}
      {resetPassUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/20 p-6 rounded-sm w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-serif text-base font-bold text-[#F5F5F0]">
                  Reset Password for @{resetPassUser.username}
                </h3>
              </div>
              <button onClick={() => setResetPassUser(null)} className="text-white/40 hover:text-white text-xs">
                ✕
              </button>
            </div>

            <form onSubmit={handleResetUserPassword} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase tracking-wider text-white/70 mb-1">
                  New Password (min 6 chars)
                </label>
                <input
                  type="text"
                  value={newResetPassword}
                  onChange={(e) => setNewResetPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 bg-black border border-white/15 focus:border-[#D4AF37] text-white rounded-sm font-mono"
                />
                <p className="text-[10px] text-white/40 mt-1">
                  A fresh salt will be generated and the password securely hashed before saving.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setResetPassUser(null)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-sm font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#c49f27] text-black font-serif font-bold uppercase tracking-wider rounded-sm cursor-pointer shadow-md"
                >
                  Save New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
