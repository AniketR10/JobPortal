import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Briefcase, 
  Search, 
  DollarSign, 
  Filter, 
  ArrowRight
} from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  isVerified?: boolean;
  postedAt?: string;
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
      if (salary) params.append('salary', salary);

      const { data } = await api.get(`/api/jobs?${params.toString()}`);
      
      const jobsData = data.jobs || data;
      
      const enhancedData = Array.isArray(jobsData) ? jobsData.map((job: any) => ({
        ...job,
        isVerified: true,
        postedAt: '2d ago'
      })) : [];

      setJobs(enhancedData); 
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
    <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-blue-100 pb-20 pt-8">
      
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-3">
             <div className="sticky top-24 bg-white rounded-4xl border border-slate-200/60 shadow-sm p-6 lg:p-8 h-fit">
                
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
                        <Filter className="w-5 h-5 text-blue-600" /> Filters
                    </div>
                    <button 
                        onClick={() => { setSearch(''); setLocation(''); setType(''); setSalary(''); }}
                        className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full hover:bg-slate-200 transition-colors"
                    >
                        Reset
                    </button>
                </div>

                <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <MapPin size={14} /> Location
                        </label>
                        <Input 
                            className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-blue-500" 
                            placeholder="e.g. New York, Remote" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Briefcase size={14} /> Job Type
                        </label>
                        <div className="relative">
                            <select 
                                className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 appearance-none"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">All Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Remote">Remote</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <DollarSign size={14} /> Min Salary
                        </label>
                         <div className="relative">
                            <select 
                                className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 appearance-none"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            >
                                <option value="">Any Range</option>
                                <option value="50k">$50k+</option>
                                <option value="100k">$100k+</option>
                                <option value="150k">$150k+</option>
                                <option value="200k">$200k+</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>

                    <Button 
                        onClick={fetchJobs} 
                        className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-lg shadow-slate-200"
                    >
                        Apply Filters
                    </Button>
                </div>
             </div>
          </div>


          <div className="lg:col-span-9 space-y-6">
            
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-4xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Explore Opportunities</h1>
                        <p className="text-blue-100">Find the perfect role from {jobs.length > 0 ? jobs.length : '...'} curated jobs.</p>
                    </div>
                    
                    <div className="w-full md:w-96 relative">
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-200" />
                         <input 
                            className="w-full h-14 pl-12 pr-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-blue-200 focus:outline-none focus:bg-white/20 transition-all backdrop-blur-sm"
                            placeholder="Search by title, keyword..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                         />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                 {loading ? (
                    <div className="bg-white rounded-4xl p-12 text-center border border-slate-100">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-4 w-48 bg-slate-200 rounded mb-4"></div>
                            <div className="h-3 w-32 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="bg-white rounded-4xl p-16 text-center border border-slate-100 flex flex-col items-center justify-center">
                        <div className="bg-slate-50 p-4 rounded-full mb-4">
                            <Search className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No jobs found</h3>
                        <p className="text-slate-500">Try adjusting your search filters.</p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div
                            key={job._id}
                            className="group bg-white rounded-4xl p-6 border border-slate-200/60 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-6 items-start md:items-center relative"
                        >
                            <div className="flex-1 flex gap-4 items-start">
                                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-slate-50 to-slate-100 border border-slate-100 flex items-center justify-center text-slate-700 font-bold text-2xl shrink-0 group-hover:scale-105 transition-transform">
                                    {job.company.charAt(0)}
                                </div>
                                
                                <div>
                                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                                        <Link to={`/jobs/${job._id}`}>
                                            {job.title}
                                        </Link>
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500 font-medium">
                                        <span className="text-slate-900">{job.company}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-md text-xs">
                                            <DollarSign size={10}/> {job.salaryRange}
                                        </span>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-4">
                                        <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg border border-slate-100">
                                            {job.type}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                <Button asChild className="rounded-xl px-6 bg-slate-900 hover:bg-blue-600 text-white w-full transition-colors group-hover:shadow-lg group-hover:shadow-blue-500/20">
                                    <Link to={`/jobs/${job._id}`} className="flex items-center justify-center gap-2">
                                        Details <ArrowRight size={16} />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}