'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Star, Calendar, Mail, Instagram, MessageSquare, Loader2, Edit, Settings } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userVotes, setUserVotes] = useState<any[]>([]);
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // Fetch user's votes and applications
    Promise.all([
      fetch('/api/votes/user').then(res => res.json()),
      fetch('/api/applications/user').then(res => res.json())
    ])
    .then(([votes, applications]) => {
      setUserVotes(votes);
      setUserApplications(applications);
      setLoading(false);
    })
    .catch(error => {
      console.error('Failed to fetch user data:', error);
      setLoading(false);
    });
  }, [session, status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRatingEmoji = (score: number) => {
    if (score >= 9) return '🔥';
    if (score >= 7) return '😍';
    if (score >= 5) return '😊';
    if (score >= 3) return '😐';
    return '😔';
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{session.user?.name}</h1>
                    <p className="text-muted-foreground">{session.user?.email}</p>
                    {(session.user as any)?.role === 'ADMIN' && (
                      <Badge variant="default" className="mt-1">
                        Admin
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{userVotes.length}</div>
                <div className="text-sm text-muted-foreground">Ratings Given</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{userApplications.length}</div>
                <div className="text-sm text-muted-foreground">Applications</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {userApplications.filter(app => app.status === 'APPROVED').length}
                </div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="votes" className="space-y-6">
            <TabsList>
              <TabsTrigger value="votes">My Ratings ({userVotes.length})</TabsTrigger>
              <TabsTrigger value="applications">My Applications ({userApplications.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="votes" className="space-y-4">
              {userVotes.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>You haven&apos;t rated anything yet.</p>
                    <p className="text-sm">Start exploring and rate dorms and fits!</p>
                  </CardContent>
                </Card>
              ) : (
                userVotes.map((vote) => (
                  <Card key={vote.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">
                            {vote.itemType === 'DORM' ? '🏠' : '👗'} {vote.itemId}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Rated on {formatDate(vote.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="font-medium">{vote.score}/10</span>
                            <span className="text-lg">{getRatingEmoji(vote.score)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              {userApplications.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <Edit className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>You haven&apos;t submitted any applications yet.</p>
                    <p className="text-sm">Apply to be featured in Dorm Wars or Fit Checks!</p>
                  </CardContent>
                </Card>
              ) : (
                userApplications.map((application) => (
                  <Card key={application.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{application.name}</h3>
                        <Badge 
                          variant={
                            application.status === 'APPROVED' ? 'default' :
                            application.status === 'REJECTED' ? 'destructive' : 'secondary'
                          }
                        >
                          {application.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {application.section === 'DORM_WARS' ? '🏠 Dorm Wars' : '👗 Fit Checks'}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {application.message}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          {application.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {application.email}
                            </div>
                          )}
                          {application.instagram && (
                            <div className="flex items-center gap-1">
                              <Instagram className="h-3 w-3" />
                              {application.instagram}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(application.createdAt)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
