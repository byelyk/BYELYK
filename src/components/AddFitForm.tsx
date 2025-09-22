'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddFitFormProps {
  onClose: () => void;
  onFitAdded: () => void;
}

export function AddFitForm({ onClose, onFitAdded }: AddFitFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    creator: '',
    creatorInstagram: '',
    description: '',
    dorm: '',
    photos: [] as string[],
    styleTags: [] as string[],
  });
  const [newPhoto, setNewPhoto] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/add-fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Fit added successfully!');
        onFitAdded();
        onClose();
      } else {
        toast.error(data.message || 'Failed to add fit');
      }
    } catch (error) {
      console.error('Error adding fit:', error);
      toast.error('Failed to add fit');
    } finally {
      setLoading(false);
    }
  };

  const addPhoto = () => {
    if (newPhoto.trim()) {
      setFormData(prev => ({ ...prev, photos: [...prev.photos, newPhoto.trim()] }));
      setNewPhoto('');
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({ ...prev, styleTags: [...prev.styleTags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({ ...prev, styleTags: prev.styleTags.filter((_, i) => i !== index) }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Add New Fit</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="creator">Creator Name</Label>
                <Input id="creator" value={formData.creator} onChange={(e) => setFormData(prev => ({ ...prev, creator: e.target.value }))} placeholder="@handle or name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creatorInstagram">Instagram</Label>
                <Input id="creatorInstagram" value={formData.creatorInstagram} onChange={(e) => setFormData(prev => ({ ...prev, creatorInstagram: e.target.value }))} placeholder="@username" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dorm">Dorm (optional)</Label>
              <Input id="dorm" value={formData.dorm} onChange={(e) => setFormData(prev => ({ ...prev, dorm: e.target.value }))} placeholder="e.g., The Quad" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Describe the fit..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Photos</Label>
              <div className="flex gap-2">
                <Input value={newPhoto} onChange={(e) => setNewPhoto(e.target.value)} placeholder="Photo URL" />
                <Button type="button" onClick={addPhoto} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.photos.map((photo, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    Photo {index + 1}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removePhoto(index)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Style Tags</Label>
              <div className="flex gap-2">
                <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="e.g., streetwear" />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.styleTags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(index)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Fit'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


