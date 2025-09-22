'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Mail, Instagram, MessageSquare, Calendar, User, Loader2, Edit, Trash2, Star, Heart, Image as ImageIcon, LogOut, Plus } from 'lucide-react';
import { AdminEditModal } from '@/components/AdminEditModal';
import { AddDormForm } from '@/components/AddDormForm';
import { AddFitForm } from '@/components/AddFitForm';
import { toast } from 'sonner';

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [dorms, setDorms] = useState<any[]>([]);
  const [fits, setFits] = useState<any[]>([]);
  const [votes, setVotes] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [dataLoading, setDataLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<'dorm' | 'fit'>('dorm');
  const [addDormModalOpen, setAddDormModalOpen] = useState(false);
  const [addFitModalOpen, setAddFitModalOpen] = useState(false);

  useEffect(() => {
    // Check admin status
    fetch('/api/admin/check')
      .then(res => res.json())
      .then(data => {
        if (data.isAdmin) {
          setIsAdmin(true);
          // Fetch all admin data
          return Promise.all([
            fetch('/api/applications').then(res => res.json()),
            fetch('/api/admin/users').then(res => res.json()),
            fetch('/api/admin/stats').then(res => res.json()),
            fetch('/api/admin/dorms').then(res => res.json()),
            fetch('/api/admin/fits').then(res => res.json()),
            fetch('/api/admin/votes').then(res => res.json())
          ]);
        } else {
          router.push('/admin/login');
          return null;
        }
      })
      .then(data => {
        if (data) {
          const [applicationsData, usersData, statsData, dormsData, fitsData, votesData] = data;
          setApplications(applicationsData);
          setUsers(usersData);
          setStats(statsData);
          setDorms(dormsData);
          setFits(fitsData);
          setVotes(votesData);
          setDataLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch admin data:', error);
        setLoading(false);
        router.push('/admin/login');
      });
  }, [router]);

  const allApplications = Array.isArray(applications) ? applications : [];
  const dormWarsApplications = allApplications.filter(app => app.section === 'DORM_WARS');
  const fitChecksApplications = allApplications.filter(app => app.section === 'FIT_CHECKS');

  const handleEdit = (item: any, type: 'dorm' | 'fit') => {
    setEditingItem(item);
    setEditingType(type);
    setEditModalOpen(true);
  };

  const handleSave = async (data: any) => {
    try {
      const response = await fetch('/api/admin/update-content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: editingType,
          id: editingItem?.id,
          data: data,
        }),
      });

      if (response.ok) {
        // Update local state
        if (editingType === 'dorm') {
          setDorms(prev => prev.map(dorm => 
            dorm.id === editingItem.id ? { ...dorm, ...data } : dorm
          ));
        } else if (editingType === 'fit') {
          setFits(prev => prev.map(fit => 
            fit.id === editingItem.id ? { ...fit, ...data } : fit
          ));
        }
        
        toast.success(`${editingType === 'dorm' ? 'Dorm' : 'Fit'} updated successfully!`);
      } else {
        toast.error('Failed to update content');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to update content');
    }
  };

  const handleDelete = async (item: any, type: 'dorm' | 'fit') => {
    if (!confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
      return;
    }

    try {
      // Update local state
      if (type === 'dorm') {
        setDorms(prev => prev.filter(dorm => dorm.id !== item.id));
      } else if (type === 'fit') {
        setFits(prev => prev.filter(fit => fit.id !== item.id));
      }
      
      toast.success(`${type === 'dorm' ? 'Dorm' : 'Fit'} deleted successfully!`);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete content');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDormAdded = () => {
    // Refresh dorms data
    fetch('/api/admin/dorms')
      .then(res => res.json())
      .then(data => setDorms(data))
      .catch(error => console.error('Failed to refresh dorms:', error));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
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

  const ApplicationCard = ({ application }: { application: any }) => (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedApplication(application)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{application.name}</h3>
          <Badge variant={application.section === 'DORM_WARS' ? 'default' : 'secondary'}>
            {application.section === 'DORM_WARS' ? 'Dorm Wars' : 'Fit Checks'}
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
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Review and manage applications, users, and platform statistics.
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalUsers || 0}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalApplications || 0}</div>
                <div className="text-sm text-muted-foreground">Applications</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{stats.totalVotes || 0}</div>
                <div className="text-sm text-muted-foreground">Total Votes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{stats.pendingApplications || 0}</div>
                <div className="text-sm text-muted-foreground">Pending Reviews</div>
              </CardContent>
            </Card>
          </div>

            <div className="grid lg:grid-cols-3 gap-8">
            {/* Applications List */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="applications" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="applications">Applications ({allApplications.length})</TabsTrigger>
                  <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
                  <TabsTrigger value="dorms">Dorms ({dorms.length})</TabsTrigger>
                  <TabsTrigger value="fits">Fits ({fits.length})</TabsTrigger>
                  <TabsTrigger value="votes">Votes ({votes.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="applications" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">All ({allApplications.length})</Button>
                      <Button variant="outline" size="sm">Dorm Wars ({dormWarsApplications.length})</Button>
                      <Button variant="outline" size="sm">Fit Checks ({fitChecksApplications.length})</Button>
                    </div>
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
                  </div>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                  {users.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No users found.
                      </CardContent>
                    </Card>
                  ) : (
                    users.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                {user.username && (
                                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                                {user.role}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                Joined {formatDate(user.createdAt)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="dorms" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Individual Dorm Rooms</h3>
                    <Button onClick={() => setAddDormModalOpen(true)} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Dorm
                    </Button>
                  </div>
                  {(!Array.isArray(dorms) || dorms.length === 0) ? (
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No dorms found. Add the first dorm room!
                      </CardContent>
                    </Card>
                  ) : (
                    (dorms as any[]).map((dorm) => (
                      <Card key={dorm.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="font-medium">{dorm.name}</h3>
                                <p className="text-sm text-muted-foreground">{dorm.addressOrArea}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                    <span className="text-sm font-medium">{dorm.rating?.average?.toFixed(1) || '0.0'}</span>
                                    <span className="text-xs text-muted-foreground">({dorm.rating?.count || 0})</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {dorm.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEdit(dorm, 'dorm')}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDelete(dorm, 'dorm')}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="fits" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Fit Checks</h3>
                    <Button onClick={() => setAddFitModalOpen(true)} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Fit
                    </Button>
                  </div>
                  {(!Array.isArray(fits) || fits.length === 0) ? (
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No fits found.
                      </CardContent>
                    </Card>
                  ) : (
                    (fits as any[]).map((fit) => (
                      <Card key={fit.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="font-medium">@{fit.creator}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-1">{fit.description}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <Heart className="h-4 w-4 fill-primary text-primary" />
                                    <span className="text-sm font-medium">{fit.rating?.average?.toFixed(1) || '0.0'}</span>
                                    <span className="text-xs text-muted-foreground">({fit.rating?.count || 0})</span>
                                  </div>
                                  {fit.dorm && (
                                    <Badge variant="outline" className="text-xs">
                                      {fit.dorm}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEdit(fit, 'fit')}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDelete(fit, 'fit')}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="votes" className="space-y-4">
                  {votes.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No votes found.
                      </CardContent>
                    </Card>
                  ) : (
                    votes.map((vote) => (
                      <Card key={vote.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{vote.user?.name || 'Unknown User'}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Rated {vote.itemType === 'DORM' ? 'Dorm' : 'Fit'} {vote.itemId}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                    <span className="text-sm font-medium">{vote.score}/10</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(vote.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={vote.itemType === 'DORM' ? 'default' : 'secondary'}>
                                {vote.itemType}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
                    <Badge variant={selectedApplication.section === 'DORM_WARS' ? 'default' : 'secondary'}>
                      {selectedApplication.section === 'DORM_WARS' ? 'Dorm Wars' : 'Fit Checks'}
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

                    {selectedApplication.photoUrls && selectedApplication.photoUrls !== '[]' && (
                      <div>
                        <h4 className="font-medium mb-2">Photos</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {JSON.parse(selectedApplication.photoUrls).map((url: string, index: number) => (
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

      {/* Edit Modal */}
      <AdminEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={editingItem}
        type={editingType}
        onSave={handleSave}
      />

      {/* Add Dorm Modal */}
      {addDormModalOpen && (
        <AddDormForm
          onClose={() => setAddDormModalOpen(false)}
          onDormAdded={handleDormAdded}
        />
      )}
      {addFitModalOpen && (
        <AddFitForm
          onClose={() => setAddFitModalOpen(false)}
          onFitAdded={() => {
            fetch('/api/admin/fits').then(res => res.json()).then(data => setFits(data)).catch(() => {});
          }}
        />
      )}
    </div>
  );
}
