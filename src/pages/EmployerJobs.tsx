import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
}

export default function EmployerJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployerJobs = async () => {
    try {
      const { data } = await api.get('/jobs/employer/jobs');
      setJobs(data.jobs || data);
    } catch (err) {
      console.error('Failed to fetch employer jobs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${id}`);
      setJobs(prev => prev.filter(job => job._id !== id));
    } catch (err) {
      console.error("Failed to delete job", err);
      alert("Failed to delete job");
    }
  };

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-5xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Posted Jobs</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card
              key={job._id}
              className="hover:shadow-xl hover:-translate-y-1 hover:bg-blue-50 transition-all duration-200"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-xl text-blue-600">{job.title}</CardTitle>
                    <p className="text-sm font-bold text-slate-700">{job.company}</p>
                  </div>
                  <Badge>{job.type}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex gap-4 text-sm text-slate-500">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salaryRange}</span>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button asChild size="sm" variant="default">
                  <Link to={`/jobs/${job._id}`}>View Details</Link>
                </Button>
                 <Button className='cursor-pointer' size="sm" variant="destructive"
                  onClick={() => handleDelete(job._id)}
                >Delete</Button>
              </CardFooter>
            </Card>
          ))}

          {jobs.length === 0 && (
            <div className="text-center text-gray-500">You have not posted any jobs yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
