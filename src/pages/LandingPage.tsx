import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Briefcase } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
}

export default function LandingPage() {
  const [search, setSearch] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/jobs?search=${search}`);
  };

  useEffect(() => {
  const loadJobs = async () => {
    try {
      const { data } = await api.get("/api/jobs?page=1&limit=6"); 
      setFeaturedJobs(data.jobs);
    } catch (err) {
      console.error(err);
    }
  };

  loadJobs();
}, []);


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
    
      <div className="bg-white border-b py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl text-slate-500 mb-10">
            Browse thousands of jobs from top companies and startups.
          </p>

       
          <Card className="shadow-lg border-0">
            <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input 
                  className="pl-10 h-12 text-lg bg-slate-50 border-slate-200"
                  placeholder="Job title, keywords, or company" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                size="lg" 
                className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700"
                onClick={handleSearch}
              >
                Search Jobs
              </Button>
            </CardContent>
          </Card>

        
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            <span>Popular:</span>
            <span className="px-3 py-1 bg-slate-100 rounded-full">Remote</span>
            <span className="px-3 py-1 bg-slate-100 rounded-full">Full-time</span>
            <span className="px-3 py-1 bg-slate-100 rounded-full">Developer</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-5xl mt-10">
        <h2 className="text-2xl font-bold mb-6">Latest Openings</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <Card
              key={job._id}
              className="hover:shadow-lg hover:-translate-y-1 hover:bg-blue-50 transition-all cursor-pointer bg-white"
              onClick={() => navigate(`/jobs/${job._id}`)}
            >
              <CardContent className="p-6">
                <div className="font-bold text-lg text-slate-800 mb-1">{job.title}</div>
                <div className="text-blue-600 font-medium mb-4">{job.company}</div>

                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={16}/> {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16}/> {job.salaryRange}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {featuredJobs.length === 0 && (
            <p className="text-slate-500">No jobs available right now.</p>
          )}
        </div>
      </div>
    </div>
  );
}
