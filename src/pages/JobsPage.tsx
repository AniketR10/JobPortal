import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [salary, setSalary] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (location) params.append('location', location);
      if (type) params.append('type', type);
      if(salary) params.append('salary', salary);

      const { data } = await api.get(`/jobs?${params.toString()}`);
      
      setJobs(data.jobs || data); 
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []); 

  return (
    <div className="container mx-auto p-6 max-w-5xl min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Open Positions</h1>
      </div>

    
      <Card className="mb-8 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <select 
            className="border rounded-md px-3 py-2 bg-white"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
          </select>
          <select 
              className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            >
              <option value="">Any Salary</option>
              <option value="50k">$50k+</option>
              <option value="100k">$100k+</option>
              <option value="150k">$150k+</option>
               <option value="200k">$200k+</option>
              <option value="300k">$300k+</option>
              <option value="500k">$500k+</option>
            </select>
          <Button onClick={fetchJobs}>Filter</Button>
        </div>
      </Card>


      {loading ? <div className="text-center">Loading...</div> : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job._id} className="hover:shadow-md transition-all">
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
              <CardFooter>
                <Button asChild size="sm">
                  <Link to={`/jobs/${job._id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
          {jobs.length === 0 && <div className="text-center text-gray-500">No jobs found.</div>}
        </div>
      )}
    </div>
  );
}