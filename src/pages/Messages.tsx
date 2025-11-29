import { AppLayout } from '@/components/layout/AppLayout';
import { useConversations } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

const Messages = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { data: conversations, isLoading } = useConversations();

  if (!user) {
    return (
      <AppLayout title="الرسائل">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <MessageCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">سجل دخولك</h3>
          <p className="text-muted-foreground text-sm text-center mb-4">
            يجب عليك تسجيل الدخول للوصول إلى رسائلك
          </p>
          <Button onClick={() => navigate('/auth')}>
            تسجيل الدخول
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="الرسائل">
      <div className="px-4 py-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card animate-pulse">
                <div className="w-12 h-12 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : conversations && conversations.length > 0 ? (
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => navigate(`/messages/${conversation.id}`)}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all"
              >
                <Avatar className="h-12 w-12 border-2 border-primary/30">
                  <AvatarImage src={conversation.other_participant?.avatar_url || ''} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {conversation.other_participant?.full_name?.[0] || '؟'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-right">
                  <h4 className="font-semibold text-foreground">
                    {conversation.other_participant?.full_name || 'مستخدم'}
                  </h4>
                  {conversation.last_message && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {conversation.last_message.content}
                    </p>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(conversation.last_message_at), {
                    addSuffix: true,
                    locale: ar,
                  })}
                </div>
                
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد رسائل</h3>
            <p className="text-muted-foreground text-sm text-center">
              ابدأ محادثة مع أي حرفي من صفحة تفاصيل الخدمة
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Messages;
