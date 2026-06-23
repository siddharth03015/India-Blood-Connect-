'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from 'shared';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChatRoom({ params }: { params: { id: string } }) {
  const router = useRouter();
  const donorId = params.id;
  const [userId, setUserId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const [otherUser, setOtherUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);

      // Fetch other user profile
      const { data: profile } = await supabase
        .from('users')
        .select('id, name, blood_group, city, locality')
        .eq('id', donorId)
        .single();
      setOtherUser(profile);

      // Find existing chat
      const { data: existingChats } = await supabase
        .from('chats')
        .select('*')
        .or(`and(user_a_id.eq.${user.id},user_b_id.eq.${donorId}),and(user_a_id.eq.${donorId},user_b_id.eq.${user.id})`);

      let currentChatId: string;

      if (existingChats && existingChats.length > 0) {
        currentChatId = existingChats[0].id;
      } else {
        // Create new chat
        const { data: newChat, error } = await supabase
          .from('chats')
          .insert([{ user_a_id: user.id, user_b_id: donorId }])
          .select()
          .single();
        if (error || !newChat) {
          console.error('Failed to create chat:', error);
          setLoading(false);
          return;
        }
        currentChatId = newChat.id;
      }

      setChatId(currentChatId);

      // Load messages
      const { data: msgs } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', currentChatId)
        .order('sent_at', { ascending: true });

      setMessages(msgs || []);
      setLoading(false);

      // Subscribe to realtime
      const channel = supabase
        .channel(`chat-${currentChatId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${currentChatId}`
        }, (payload: any) => {
          setMessages(prev => [...prev, payload.new]);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };
    init();
  }, [donorId, router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !chatId || !userId) return;
    setSending(true);

    await supabase.from('messages').insert([{
      chat_id: chatId,
      sender_id: userId,
      text: newMsg.trim()
    }]);

    setNewMsg('');
    setSending(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-neutral-50 dark:bg-neutral-950">
      {/* Chat Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 px-4 py-4 flex items-center gap-4 shadow-sm">
        <Link href="/chat" className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all">
          <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
          {otherUser?.name?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-neutral-900 dark:text-white truncate">{otherUser?.name || 'Unknown'}</h2>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            {otherUser?.blood_group && <span className="font-bold text-red-600">{otherUser.blood_group}</span>}
            <span>·</span>
            <span>{otherUser?.locality}, {otherUser?.city}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-400 text-sm">No messages yet. Start the conversation!</p>
          </div>
        )}
        {messages.map((msg, idx) => {
          const isMine = msg.sender_id === userId;
          return (
            <div key={msg.id || idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                isMine
                  ? 'bg-gradient-to-br from-red-500 to-red-600 text-white rounded-br-md shadow-lg shadow-red-500/10'
                  : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-bl-md shadow-sm border border-neutral-100 dark:border-neutral-700'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${isMine ? 'text-red-200' : 'text-neutral-400'}`}>
                  {new Date(msg.sent_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  {isMine && msg.read_at && ' · Read'}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 p-4">
        <form onSubmit={handleSend} className="flex items-center gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-5 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white placeholder-neutral-400"
          />
          <button
            type="submit"
            disabled={sending || !newMsg.trim()}
            className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20 disabled:opacity-50 transition-all active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
