import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Mail,
  Trash2,
  CheckCircle,
  Search,
  Send,
  Reply,
  Calendar,
  User,
  Inbox
} from 'lucide-react';
import { ContactMessage } from '../../types';

export const AdminMessages: React.FC = () => {
  const { db, markMessageRead, deleteMessage, showToast } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredMessages = db.messages.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markMessageRead(msg.id);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;
    showToast(`Reply simulated and queued for delivery to ${selectedMessage.email}`, 'success');
    setReplyText('');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f5eedc]">
          Inquiries & Collaborations Inbox
        </h2>
        <p className="text-xs text-[#8c8a99]">
          Manage and review incoming messages, research suggestions, and licensing requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List Column */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c8a99]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 bg-[#100f17] border border-[#222130] rounded-xl text-xs text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center bg-[#100f17] border border-[#222130] rounded-2xl">
                <Inbox className="w-8 h-8 text-[#737180] mx-auto mb-2" />
                <p className="text-xs text-[#8c8a99]">No messages found</p>
              </div>
            ) : (
              filteredMessages.map(msg => (
                <div
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedMessage?.id === msg.id
                      ? 'bg-[#181724] border-[#d4af37]/60 shadow-lg'
                      : msg.isRead
                      ? 'bg-[#100f17] border-[#222130] hover:border-[#2d2c3e]'
                      : 'bg-[#151422] border-[#d4af37]/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#ede9df] flex items-center gap-1.5">
                      {!msg.isRead && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-[#737180] font-mono">{msg.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#d4af37] truncate">{msg.subject}</h4>
                  <p className="text-[11px] text-[#8e8c9b] line-clamp-1 mt-1">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Message View & Reply Pane */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="p-6 rounded-2xl bg-[#100f17] border border-[#222130] space-y-6 shadow-xl">
              <div className="flex items-start justify-between border-b border-[#1f1e2c] pb-4">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-[#f5eedc]">
                    {selectedMessage.subject}
                  </h3>
                  <div className="text-xs text-[#8c8a99] mt-1 flex flex-wrap gap-2">
                    <span>From: <strong className="text-[#ede9df]">{selectedMessage.name}</strong> ({selectedMessage.email})</span>
                    <span>• {selectedMessage.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('Delete this message?')) {
                      deleteMessage(selectedMessage.id);
                      setSelectedMessage(null);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Message Content */}
              <div className="p-4 rounded-xl bg-[#15141e] border border-[#242335] text-sm text-[#cfcbd9] leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              {/* Reply Section */}
              <form onSubmit={handleSendReply} className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-[#f5eedc] flex items-center gap-1.5">
                  <Reply className="w-4 h-4 text-[#d4af37]" />
                  <span>Send Response to {selectedMessage.email}</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Draft official reply from The Kohistani editorial team..."
                  className="w-full px-4 py-2.5 bg-[#171622] border border-[#2c2b3d] rounded-xl text-xs text-[#f5eedc] focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c05b] text-black font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="h-96 rounded-2xl bg-[#100f17] border border-[#222130] flex flex-col items-center justify-center text-center p-8 text-[#737180]">
              <Mail className="w-12 h-12 mb-3 stroke-[1.5]" />
              <p className="text-sm font-semibold text-[#8c8a99]">Select a message from the list</p>
              <p className="text-xs">You can review collaborator proposals and reply directly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
