import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '@/lib/axios';
import { 
  Plus, 
  Search, 
  FileText, 
  Filter, 
  Users, 
  Briefcase, 
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EmployerDashboard() {
  const navigate = useNavigate(); 
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const stats = {
    total: applications.length,
    review: applications.filter(a => a.status === 'screening' || a.status === 'applied').length,
    interview: applications.filter(a => a.status === 'interview').length,
    hired: applications.filter(a => a.status === 'offer').length,
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/api/jobs/employer/jobs');
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      } 
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchApps = async () => {
      setLoading(true);
      try {
        let url = '/api/applications/employer'; 
        
        if (selectedJob && selectedJob !== 'all') {
          url = `/api/jobs/${selectedJob}/applications`;
        }

        const { data } = await api.get(url);
        setApplications(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApps();
  }, [selectedJob]);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      setApplications(apps => 
        apps.map(app => app._id === appId ? { ...app, status: newStatus } : app)
      );
      await api.put(`/api/applications/${appId}/status`, { status: newStatus });
    } catch (error) {
      alert("Failed to update status");
      window.location.reload(); 
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'screening': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'interview': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'offer': return 'bg-green-50 text-green-700 border-green-100';
      case 'rejected': return 'bg-slate-50 text-slate-500 border-slate-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-20 pt-8">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">Employer Dashboard</h1>
                <p className="text-slate-500">Manage your postings and track candidate applications.</p>
            </div>
            <Button 
                onClick={() => navigate('/employer/jobs/new')}
                className="bg-black hover:bg-slate-800 text-white rounded-xl h-12 px-6 shadow-lg shadow-slate-200 flex items-center gap-2"
            >
                <Plus size={18} /> Post New Job
            </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
                { label: 'Total Candidates', val: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'In Review', val: stats.review, icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
                { label: 'Interviews', val: stats.interview, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Offers Sent', val: stats.hired, icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50' },
            ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                        <stat.icon size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-900 leading-none mb-1">{stat.val}</div>
                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-2">
                    <div className="p-3 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Filter size={12} /> Filter by Job
                    </div>
                    <div className="space-y-1">
                        <button
                            onClick={() => setSelectedJob('all')}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                selectedJob === 'all' 
                                ? 'bg-black text-white shadow-md' 
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            All Applications
                        </button>
                        {jobs.map(job => (
                            <button
                                key={job._id}
                                onClick={() => setSelectedJob(job._id)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all truncate ${
                                    selectedJob === job._id 
                                    ? 'bg-black text-white shadow-md' 
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {job.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-9">
                <div className="bg-white rounded-4xl border border-slate-200/60 shadow-sm p-6 min-h-[500px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Candidates</h2>
                        <div className="relative w-64">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                             <Input 
                                placeholder="Search candidates..." 
                                className="pl-9 bg-slate-50 border-slate-200 rounded-xl"
                             />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {loading ? (
                            <div className="text-center py-20 text-slate-400">Loading applications...</div>
                        ) : applications.length === 0 ? (
                            <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-2xl">
                                <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">No applications found.</p>
                            </div>
                        ) : (
                            applications.map((app) => (
                                <div key={app._id} className="group flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all bg-white">
                                    
                                    <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 text-blue-600 font-bold flex items-center justify-center text-lg">
                                            {app.candidateId?.name?.charAt(0) || "?"}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{app.candidateId?.name || "Unknown Candidate"}</div>
                                            <div className="text-sm text-slate-500">{app.candidateId?.email}</div>
                                        </div>
                                    </div>

                                    <div className="hidden md:block text-sm text-slate-600 font-medium px-4">
                                         {app.jobId?.title}
                                    </div>

                                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                                        
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-2 transition-all ${getStatusColor(app.status)}`}>
                                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                    <ChevronDown size={12} />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem onClick={() => handleStatusChange(app._id, 'screening')}>Screening</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(app._id, 'interview')}>Interview</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(app._id, 'offer')}>Offer</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(app._id, 'rejected')} className="text-red-600 focus:text-red-700">Reject</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <a 
                                            href={app.resumeUrl} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                            title="View Resume"
                                        >
                                            <FileText size={18} />
                                        </a>

                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}