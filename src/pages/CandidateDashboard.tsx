import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Building2, 
  MoreHorizontal, 
  XCircle, 
  ArrowRight,
  Clock
} from 'lucide-react';

interface Application {
  _id: string;
  status: string;
  jobId: {
    _id: string;
    title: string;
    company: string;
    location?: string;
  };
  createdAt: string;
}

const COLUMNS = [
  { id: 'applied', title: 'Applied', color: 'bg-blue-50 text-blue-700 border-blue-100', dot: 'bg-blue-500' },
  { id: 'screening', title: 'Screening', color: 'bg-orange-50 text-orange-700 border-orange-100', dot: 'bg-orange-500' },
  { id: 'interview', title: 'Interview', color: 'bg-purple-50 text-purple-700 border-purple-100', dot: 'bg-purple-500' },
  { id: 'offer', title: 'Offer', color: 'bg-green-50 text-green-700 border-green-100', dot: 'bg-green-500' },
  { id: 'rejected', title: 'Rejected', color: 'bg-slate-50 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
];

export default function CandidateDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get('/api/applications/my');
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleWithdraw = async (e: React.MouseEvent, appId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to withdraw this application?")) return;
    
    try {
      await api.put(`/api/applications/${appId}/withdraw`);
      setApplications(prev => prev.filter(app => app._id !== appId));
    } catch (error) {
      alert("Failed to withdraw application.");
    }
  };

  const getAppsByStatus = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
         <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-48 bg-slate-200 rounded mb-4"></div>
            <div className="flex gap-4">
                <div className="h-64 w-64 bg-slate-200 rounded-3xl"></div>
                <div className="h-64 w-64 bg-slate-200 rounded-3xl"></div>
                <div className="h-64 w-64 bg-slate-200 rounded-3xl"></div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-20 pt-8">
      
      <div className="container mx-auto px-6 max-w-[1400px] mb-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">My Applications</h1>
                <p className="text-slate-500">Track and manage your {applications.length} active job applications.</p>
            </div>
            <Link to="/jobs">
                <Button className="rounded-xl bg-slate-900 text-white hover:bg-blue-600 flex items-center gap-2 px-6 h-12 shadow-lg shadow-slate-200">
                    Browse More Jobs <ArrowRight size={16} />
                </Button>
            </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-[1400px] overflow-x-auto">
        <div className="flex gap-6 min-w-max pb-8">
            
            {COLUMNS.map((col) => {
                const columnApps = getAppsByStatus(col.id).filter(app => app.jobId);
                
                return (
                    <div key={col.id} className="w-[320px] flex flex-col shrink-0">
                        
                        <div className={`mb-4 p-4 rounded-2xl border ${col.color} flex justify-between items-center shadow-sm`}>
                            <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide">
                                <span className={`w-2 h-2 rounded-full ${col.dot}`}></span>
                                {col.title}
                            </div>
                            <span className="bg-white/50 px-2 py-0.5 rounded-md text-xs font-bold shadow-sm">
                                {columnApps.length}
                            </span>
                        </div>
                        
                        <div className="space-y-4">
                            {columnApps.length === 0 ? (
                                <div className="h-32 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                                    No applications
                                </div>
                            ) : (
                                columnApps.map((app) => (
                                    <div key={app._id} className="relative group perspective">
                                        <Link to={`/jobs/${app.jobId._id}`} className="block">
                                            <div className="bg-white rounded-3xl p-5 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 relative z-10">
                                                
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-slate-50 to-slate-100 border border-slate-100 flex items-center justify-center text-slate-700 font-bold shrink-0">
                                                        {app.jobId.company.charAt(0)}
                                                    </div>
                                                    
                                                    <div className="text-slate-300">
                                                        <MoreHorizontal size={18} />
                                                    </div>
                                                </div>

                                                <h3 className="font-bold text-slate-900 leading-tight mb-1 line-clamp-2">
                                                    {app.jobId.title}
                                                </h3>
                                                <div className="flex items-center gap-1 text-sm text-slate-500 mb-4">
                                                    <Building2 size={12} /> {app.jobId.company}
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-xs font-medium text-slate-400">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={12} /> {new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} /> 2d ago
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>

                                        {(app.status === 'applied' || app.status === 'screening') && (
                                            <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon"
                                                    className="h-8 w-8 bg-white shadow-md rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50"
                                                    title="Withdraw Application"
                                                    onClick={(e) => handleWithdraw(e, app._id)}
                                                >
                                                    <XCircle size={18} />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            })}
            
            <div className="w-4 shrink-0"></div>
        </div>
      </div>
    </div>
  );
}