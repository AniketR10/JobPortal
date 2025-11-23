import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await api.get(`/jobs/${id}`);
        setJob(data);
      } catch (error) {
        console.error("Error fetching job", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return alert("Please upload a resume");
    
    setUploading(true);
    const formData = new FormData();
    formData.append('jobId', id as string);
    formData.append('resume', resume); 

    try {
      await api.post('/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Application Sent Successfully!");
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.message || "Application Failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-10">Loading...</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl text-slate-800">{job.title}</CardTitle>
              <div className="text-blue-600 font-semibold text-lg mt-1">{job.company}</div>
            </div>
            <Badge className="text-sm px-3 py-1">{job.type}</Badge>
          </div>
          <div className="flex gap-6 text-sm text-gray-500 mt-4 border-b pb-6">
            <span>📍 {job.location}</span>
            <span>💰 {job.salaryRange}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 mt-6">
          <div>
            <h3 className="font-bold text-lg mb-3">About the Role</h3>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
            {!user ? (
              <div className="text-center">
                <p className="mb-4 text-gray-600">Please login to apply for this position.</p>
                <Button onClick={() => navigate('/login')}>Login to Apply</Button>
              </div>
            ) : user.role === 'employer' ? (
              <div className="text-center text-yellow-700 font-medium">
                Employers cannot apply to jobs.
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <h3 className="font-bold text-lg">Apply Now</h3>
                <div className="grid w-full max-w-sm items-center gap-2">
                  <Label htmlFor="resume">Upload Resume (PDF)</Label>
                  <Input 
                    id="resume" 
                    type="file" 
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files?.[0] || null)} 
                    required
                  />
                </div>
                <Button type="submit" disabled={uploading} className="w-full sm:w-auto">
                  {uploading ? "Uploading..." : "Submit Application"}
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}