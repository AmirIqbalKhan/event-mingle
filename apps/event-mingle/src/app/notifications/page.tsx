"use client";
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const notifications = [
  { id: 1, type: 'invite', text: 'You were invited to Rooftop Party', unread: true },
  { id: 2, type: 'message', text: 'Alex sent you a message', unread: false },
  // ...
];

export default function NotificationsPage() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto py-8 px-2">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="space-y-4 mt-4">
            {notifications.map(n => (
              <Card key={n.id} className={`p-4 ${n.unread ? 'bg-blue-50' : ''}`}>
                <CardContent>{n.text}</CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="unread">
          <div className="space-y-4 mt-4">
            {notifications.filter(n => n.unread).map(n => (
              <Card key={n.id} className="p-4 bg-blue-50">
                <CardContent>{n.text}</CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="mentions">
          <div className="space-y-4 mt-4">
            {/* Filter for mentions */}
            <p>No mentions yet.</p>
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-8">
        <h2 className="font-bold mb-2">Notification Settings</h2>
        <div className="flex items-center justify-between mb-2">
          <span>Push Notifications</span>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between mb-2">
          <span>Email Updates</span>
          <Switch />
        </div>
      </div>
    </main>
  );
} 