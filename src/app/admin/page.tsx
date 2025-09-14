'use client';

import { useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Mail, Instagram, MessageSquare, Calendar, User } from 'lucide-react';
import { getApplications, getApplicationsBySection } from '@/lib/data';
import { Application } from '@/lib/types';

export default function AdminPage() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const allApplications = getApplications();
  const dormWarsApplications = getApplicationsBySection('dorm-wars');
  const fitChecksApplications = getApplicationsBySection('fit-checks');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const ApplicationCard = ({ application }: { application: Application }) => (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedApplication(application)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{application.name}</h3>
          <Badge variant={application.section === 'dorm-wars' ? 'default' : 'secondary'}>
            {application.section === 'dorm-wars' ? 'Dorm Wars' : 'Fit Checks'}
          </Badge>
        </div>
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
  );

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Review and manage applications for Dorm Wars and Fit Checks.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Applications List */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All ({allApplications.length})</TabsTrigger>
                  <TabsTrigger value="dorm-wars">Dorm Wars ({dormWarsApplications.length})</TabsTrigger>
                  <TabsTrigger value="fit-checks">Fit Checks ({fitChecksApplications.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {allApplications.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No applications submitted yet.
                      </CardContent>
                    </Card>
                  ) : (
                    allApplications.map((application) => (
                      <ApplicationCard key={application.id} application={application} />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="dorm-wars" className="space-y-4">
                  {dormWarsApplications.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No Dorm Wars applications submitted yet.
                      </CardContent>
                    </Card>
                  ) : (
                    dormWarsApplications.map((application) => (
                      <ApplicationCard key={application.id} application={application} />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="fit-checks" className="space-y-4">
                  {fitChecksApplications.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No Fit Checks applications submitted yet.
                      </CardContent>
                    </Card>
                  ) : (
                    fitChecksApplications.map((application) => (
                      <ApplicationCard key={application.id} application={application} />
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Application Details */}
            <div className="lg:col-span-1">
              {selectedApplication ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {selectedApplication.name}
                    </CardTitle>
                    <Badge variant={selectedApplication.section === 'dorm-wars' ? 'default' : 'secondary'}>
                      {selectedApplication.section === 'dorm-wars' ? 'Dorm Wars' : 'Fit Checks'}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        {selectedApplication.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={`mailto:${selectedApplication.email}`}
                              className="text-primary hover:underline"
                            >
                              {selectedApplication.email}
                            </a>
                          </div>
                        )}
                        {selectedApplication.instagram && (
                          <div className="flex items-center gap-2">
                            <Instagram className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={`https://instagram.com/${selectedApplication.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {selectedApplication.instagram}
                            </a>
                          </div>
                        )}
                        {selectedApplication.tiktok && (
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={`https://tiktok.com/@${selectedApplication.tiktok.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {selectedApplication.tiktok}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedApplication.dormOrHall && (
                      <div>
                        <h4 className="font-medium mb-2">Dorm/Hall</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedApplication.dormOrHall}
                        </p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium mb-2">Message</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedApplication.message}
                      </p>
                    </div>

                    {selectedApplication.photoUrls.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Photos</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedApplication.photoUrls.map((url, index) => (
                            <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                              <Eye className="h-6 w-6 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Submitted {formatDate(selectedApplication.createdAt)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    Select an application to view details
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
