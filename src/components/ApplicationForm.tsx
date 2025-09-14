'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, X, CheckCircle } from 'lucide-react';
import { submitApplication, HALL_OPTIONS } from '@/lib/data';
import { track, ANALYTICS_EVENTS } from '@/lib/analytics';

const applicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  dormOrHall: z.string().optional(),
  message: z.string().min(10, 'Please provide a brief pitch (at least 10 characters)'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  section: 'dorm-wars' | 'fit-checks';
}

export function ApplicationForm({ section }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Upload files to S3/Supabase storage
      const photoUrls = uploadedFiles.map(file => URL.createObjectURL(file));
      
      await submitApplication({
        section,
        name: data.name,
        email: data.email || undefined,
        instagram: data.instagram || undefined,
        tiktok: data.tiktok || undefined,
        dormOrHall: data.dormOrHall || undefined,
        message: data.message,
        photoUrls,
      });

      track(ANALYTICS_EVENTS.SUBMIT_APPLICATION, { section });
      setIsSubmitted(true);
      reset();
      setUploadedFiles([]);
    } catch (error) {
      console.error('Failed to submit application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your application. We&apos;ll review it and get back to you soon!
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          Apply to {section === 'dorm-wars' ? 'Dorm Wars' : 'Fit Checks'}
        </CardTitle>
        <p className="text-muted-foreground">
          {section === 'dorm-wars' 
            ? 'Tell us about your dorm and why it should be featured in our series!'
            : 'Share your style and get featured in our fashion content!'
          }
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                {...register('instagram')}
                placeholder="@yourusername"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok</Label>
            <Input
              id="tiktok"
              {...register('tiktok')}
              placeholder="@yourusername"
            />
          </div>

          {/* Dorm/Hall Selection (for dorm-wars) */}
          {section === 'dorm-wars' && (
            <div className="space-y-2">
              <Label htmlFor="dormOrHall">Dorm/Hall</Label>
              <Select {...register('dormOrHall')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your dorm or hall" />
                </SelectTrigger>
                <SelectContent>
                  {HALL_OPTIONS.map((hall) => (
                    <SelectItem key={hall} value={hall}>
                      {hall}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">
              {section === 'dorm-wars' 
                ? 'Why should your dorm be featured? *' 
                : 'Tell us about your style and why you should be featured! *'
              }
            </Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder={
                section === 'dorm-wars'
                  ? "What makes your dorm special? What are the best features, amenities, or experiences that other students should know about?"
                  : "What's your style philosophy? What makes your outfits unique? Any fashion tips or inspiration you'd like to share?"
              }
              rows={4}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Photos (Optional)</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload up to 5 photos to showcase your {section === 'dorm-wars' ? 'dorm' : 'style'}
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                Choose Photos
              </Button>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploaded Photos:</p>
                <div className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {file.name}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
