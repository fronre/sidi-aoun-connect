import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Send } from 'lucide-react';
import { useMessages, useSendMessage } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

const Chat = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [otherParticipant, setOtherParticipant] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading } = useMessages(conversationId || '');
  const sendMessage = useSendMessage();

  useEffect(() => {
    const fetchConversation = async () => {
      if (!conversationId || !profile?.id) return;

      const { data } = await supabase
        .from('conversations')
        .select(`
          participant_one,
          participant_two,
          participant_one_profile:profiles!conversations_participant_one_fkey (id, full_name, avatar_url),
          participant_two_profile:profiles!conversations_participant_two_fkey (id, full_name, avatar_url)
        `)
        .eq('id', conversationId)
        .single();

      if (data) {
        const other = data.participant_one === profile.id 
          ? (data as any).participant_two_profile 
          : (data as any).participant_one_profile;
        setOtherParticipant(other);
      }
    };

    fetchConversation();
  }, [conversationId, profile?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !conversationId || !profile?.id) return;

    await sendMessage.mutateAsync({
      conversationId,
      content: newMessage.trim(),
      senderId: profile.id,
    });

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/messages')}>
            <ArrowRight className="h-5 w-5" />
          </Button>
          
          <Avatar className="h-10 w-10 border-2 border-primary/30">
            <AvatarImage src={otherParticipant?.avatar_url || ''} />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {otherParticipant?.full_name?.[0] || '؟'}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="font-semibold text-foreground">
              {otherParticipant?.full_name || 'محادثة'}
            </h1>
            <p className="text-xs text-muted-foreground">متصل</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages && messages.length > 0 ? (
          messages.map((message) => {
            const isOwn = message.sender_id === profile?.id;
            return (
              <div
                key={message.id}
                className={cn(
                  'flex gap-2 animate-fade-in',
                  isOwn ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                {!isOwn && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender?.avatar_url || ''} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      {message.sender?.full_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={cn(
                  'max-w-[75%] rounded-2xl px-4 py-2',
                  isOwn 
                    ? 'gradient-primary text-primary-foreground rounded-tr-sm' 
                    : 'bg-card border border-border/50 rounded-tl-sm'
                )}>
                  <p className="text-sm">{message.content}</p>
                  <p className={cn(
                    'text-[10px] mt-1',
                    isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  )}>
                    {formatDistanceToNow(new Date(message.created_at), {
                      addSuffix: true,
                      locale: ar,
                    })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            ابدأ المحادثة بإرسال رسالة
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 glass-effect border-t border-border/50 p-4">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب رسالتك..."
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={handleSend}
            disabled={!newMessage.trim() || sendMessage.isPending}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
