'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { PhotoUpload } from '@/components/PhotoUpload';

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  type: 'dorm' | 'fit';
  onSave: (data: any) => void;
}

export function AdminEditModal({ isOpen, onClose, item, type, onSave }: AdminEditModalProps) {
  const [formData, setFormData] = useState(item || {});
  const [newTag, setNewTag] = useState('');
  const [photos, setPhotos] = useState<string[]>(item?.photos?.map((p: any) => p.url) || []);

  const handleSave = () => {
    const updatedData = {
      ...formData,
      photos: photos.map(url => ({ url, alt: '' }))
    };
    onSave(updatedData);
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((tag: string) => tag !== tagToRemove) || []
    });
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Edit {type === 'dorm' ? 'Dorm' : 'Fit'} - {item.name || item.creator}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {type === 'dorm' ? 'Dorm Name' : 'Creator'}
              </Label>
              <Input
                id="name"
                value={formData.name || formData.creator || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  [type === 'dorm' ? 'name' : 'creator']: e.target.value
                })}
              />
            </div>
            {type === 'dorm' && (
              <div className="space-y-2">
                <Label htmlFor="address">Address/Area</Label>
                <Input
                  id="address"
                  value={formData.addressOrArea || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    addressOrArea: e.target.value
                  })}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({
                ...formData,
                description: e.target.value
              })}
              rows={3}
            />
          </div>

          {/* Dorm-specific fields */}
          {type === 'dorm' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type || ''}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    type: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residence-hall">Residence Hall</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="loft">Loft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="eligibility">Class Eligibility</Label>
                <Select
                  value={formData.classEligibility || ''}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    classEligibility: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select eligibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-year-only">First Year Only</SelectItem>
                    <SelectItem value="sophomore-plus">Sophomore Plus</SelectItem>
                    <SelectItem value="upper-class">Upper Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags?.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add new tag"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Photos */}
          <PhotoUpload
            photos={photos}
            onPhotosChange={setPhotos}
            maxPhotos={5}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
