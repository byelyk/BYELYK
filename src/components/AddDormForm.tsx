'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { BUILDING_OPTIONS } from '@/lib/data';

interface AddDormFormProps {
  onClose: () => void;
  onDormAdded: () => void;
}

export function AddDormForm({ onClose, onDormAdded }: AddDormFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    building: '',
    roomNumber: '',
    description: '',
    photos: [] as string[],
    amenities: [] as string[],
    tags: [] as string[],
    personInstagram: '',
    personGrade: ''
  });
  const [newPhoto, setNewPhoto] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/add-dorm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Dorm added successfully!');
        onDormAdded();
        onClose();
      } else {
        toast.error(data.message || 'Failed to add dorm');
      }
    } catch (error) {
      console.error('Error adding dorm:', error);
      toast.error('Failed to add dorm');
    } finally {
      setLoading(false);
    }
  };

  const addPhoto = () => {
    if (newPhoto.trim()) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, newPhoto.trim()]
      }));
      setNewPhoto('');
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Add New Dorm</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Student Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Chris's Dorm"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, roomNumber: e.target.value }))}
                  placeholder="e.g., Room 201"
                />
              </div>
            <div className="space-y-2">
              <Label htmlFor="personInstagram">Instagram</Label>
              <Input
                id="personInstagram"
                value={formData.personInstagram}
                onChange={(e) => setFormData(prev => ({ ...prev, personInstagram: e.target.value }))}
                placeholder="@username"
              />
            </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="personGrade">Grade/Class</Label>
              <Input
                id="personGrade"
                value={formData.personGrade}
                onChange={(e) => setFormData(prev => ({ ...prev, personGrade: e.target.value }))}
                placeholder="e.g., Freshman"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="building">Building</Label>
              <Select value={formData.building} onValueChange={(value) => setFormData(prev => ({ ...prev, building: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select building" />
                </SelectTrigger>
                <SelectContent>
                  {BUILDING_OPTIONS.map((building) => (
                    <SelectItem key={building} value={building}>
                      {building}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the dorm room..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Photos</Label>
              <div className="flex gap-2">
                <Input
                  value={newPhoto}
                  onChange={(e) => setNewPhoto(e.target.value)}
                  placeholder="Photo URL"
                />
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
              <Label>Amenities</Label>
              <div className="flex gap-2">
                <Input
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="e.g., LED Lights"
                />
                <Button type="button" onClick={addAmenity} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {amenity}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeAmenity(index)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="e.g., gaming"
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(index)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Dorm'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
