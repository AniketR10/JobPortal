import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  DollarSign, 
  Trash2, 
  Eye, 
  Plus, 
  Search, 
  Briefcase, 
  Clock
} from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  createdAt: string;
  status?: 'active' | 'closed';
}

export default function EmployerJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchEmployerJobs = async () => {
    try {
      const { data } = await api.get('/api/jobs/employer/jobs');
      const jobsData = data.jobs || data;
      
      const enhancedJobs = Array.isArray(jobsData) ? jobsData.map((job: any) => ({
        ...job,
        status: 'active'
      })) : [];

      setJobs(enhancedJobs);
    } catch (err) {
      console.error('Failed to fetch employer jobs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault(); 
    const confirmDelete = window.confirm("Are you sure you want to delete this job? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/jobs/${id}`);
      setJobs(prev => prev.filter(job => job._id !== id));
    } catch (err) {
      console.error("Failed to delete job", err);
      alert("Failed to delete job");
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(search.toLowerCase()) || 
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-20 pt-8">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">My Posted Jobs</h1>
                <p className="text-slate-500">Manage your {jobs.length} active job listings.</p>
            </div>
            <Button 
                onClick={() => navigate('/employer/jobs/new')}
                className="bg-black hover:bg-slate-800 text-white rounded-xl h-12 px-6 shadow-lg shadow-slate-200 flex items-center gap-2"
            >
                <Plus size={18} /> Post New Job
            </Button>
        </div>

        <div className="bg-white rounded-2xl p-2 border border-slate-200/60 shadow-sm mb-8 flex items-center max-w-md">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <Input 
                className="border-0 bg-transparent focus-visible:ring-0 placeholder:text-slate-400" 
                placeholder="Search by job title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        <div className="space-y-4">
            {loading ? (
                 <div className="text-center py-20 text-slate-400">Loading jobs...</div>
            ) : filteredJobs.length === 0 ? (
                <div className="bg-white rounded-4xl border-2 border-dashed border-slate-200 p-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Briefcase size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No jobs found</h3>
                    <p className="text-slate-500 mb-6">
                        {search ? "Try adjusting your search terms." : "You haven't posted any jobs yet."}
                    </p>
                    {!search && (
                        <Button onClick={() => navigate('/employer/jobs/new')} variant="outline">
                            Create your first listing
                        </Button>
                    )}
                </div>
            ) : (
                filteredJobs.map((job) => (
                    <div
                        key={job._id}
                        className="group bg-white rounded-2xl p-6 border border-slate-200/60 hover:shadow-lg hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            
                            <div className="flex gap-4 items-start">
                                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-xl font-bold text-slate-600 shrink-0">
                                    {job.company.charAt(0)}
                                </div>
                                
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                            {job.title}
                                        </h3>
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 font-medium">
                                        <span className="flex items-center gap-1">
                                            <Briefcase size={14} /> {job.type}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} /> {job.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign size={14} /> {job.salaryRange}
                                        </span>
                                         <span className="flex items-center gap-1">
                                            <Clock size={14} /> Posted {new Date(job.createdAt || Date.now()).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                                <div className="flex gap-2 w-full md:w-auto">
                                    <Button asChild variant="outline" size="sm" className="flex-1 h-10 rounded-lg border-slate-200 hover:bg-slate-50 hover:text-blue-600">
                                        <Link to={`/jobs/${job._id}`}>
                                            <Eye className="w-4 h-4 mr-2" /> View
                                        </Link>
                                    </Button>
                                    
                                    <Button 
                                        variant="destructive" 
                                        size="icon"
                                        className="h-10 w-10 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 transition-colors"
                                        onClick={(e) => handleDelete(e, job._id)}
                                        title="Delete Job"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
}