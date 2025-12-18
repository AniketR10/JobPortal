import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Application {
  _id: string;
  status: string;
  jobId: {
    _id: string;
    title: string;
    company: string;
  };
  createdAt: string;
}

const COLUMNS = [
  { id: 'applied', title: 'Applied', color: 'bg-blue-100 text-blue-800' },
  { id: 'screening', title: 'Screening', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'interview', title: 'Interview', color: 'bg-purple-100 text-purple-800' },
  { id: 'offer', title: 'Offer', color: 'bg-green-100 text-green-800' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-100 text-red-800' },
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
      alert("Application withdrawn successfully.");
    } catch (error) {
      alert("Failed to withdraw application.");
    }
  };

  const getAppsByStatus = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <div key={col.id} className="min-w-[280px] w-full bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className={`mb-4 px-3 py-1 rounded-full text-xs font-bold w-fit uppercase ${col.color}`}>
              {col.title} ({getAppsByStatus(col.id).length})
            </div>
            
            <div className="space-y-3">
              {getAppsByStatus(col.id)
                  .filter(app => app.jobId) // skip deleted jobs
                  .map((app) => {
                    const job = app.jobId;

                    return (
                           <div key={app._id} className="relative group"> {/* Wrapped in a div */}
                        <Link to={`/jobs/${job._id}`} className="block"> {/* Link wraps the card content */}
                          <Card
                            className="shadow-sm bg-white cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-slate-100 border-l-4 border-l-blue-500"
                          >
                            <CardHeader className="p-4 pb-2">
                              <CardTitle className="text-base font-bold text-slate-800">
                                {job.title}
                              </CardTitle>
                              <div className="text-sm text-slate-500 font-medium">
                                {job.company}
                              </div>
                            </CardHeader>

                            <CardContent className="p-4 pt-0">
                              <div className="text-xs text-slate-400 mt-2 mb-3">
                                Applied: {new Date(app.createdAt).toLocaleDateString()}
                              </div>
                              
                              {/* Button is rendered here but event propagation is stopped */}
                              {(app.status === 'applied' || app.status === 'screening') && (
                                <div className="mt-2">
                                   <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-full h-7 text-xs text-white bg-red-500 hover:bg-red-700 transition-opacity opacity-0 group-hover:opacity-100"
                                    onClick={(e) => handleWithdraw(e, app._id)}
                                  >
                                    Withdraw Application
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    );
                  })
                }
              {getAppsByStatus(col.id).length === 0 && (
                <div className="text-center text-slate-400 text-xs italic py-4">Empty</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}