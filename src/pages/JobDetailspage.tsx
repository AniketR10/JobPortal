import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '@/lib/axios';
import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui/button';
import { 
  MapPin,
  DollarSign, 
  Building2, 
  ArrowLeft, 
  UploadCloud, 
  CheckCircle2, 
  Clock,
  Share2,
  FileText
} from 'lucide-react';

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
        const { data } = await api.get(`/api/jobs/${id}`);
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
      await api.post('/api/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/dashboard'); 
    } catch (error: any) {
      alert(error.response?.data?.message || "Application Failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
    </div>
  );

  if (!job) return <div className="p-10 text-center">Job not found</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-20 pt-8">
      
      <div className="container mx-auto px-4 max-w-6xl mb-6">
        <Link to="/jobs">
            <Button variant="ghost" className="hover:bg-white hover:text-blue-600 -ml-4 text-slate-500">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
            </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-4xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-slate-100 to-white border border-slate-200 flex items-center justify-center text-3xl font-bold text-slate-700 shadow-sm">
                            {job.company.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{job.title}</h1>
                            <div className="flex items-center gap-2 text-lg text-slate-500 font-medium">
                                <Building2 className="w-5 h-5 text-blue-500" />
                                {job.company}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl text-sm border border-slate-200">
                            {job.type}
                        </span>
                        <span className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-xl text-sm border border-blue-100 flex items-center gap-2">
                             <MapPin className="w-4 h-4" /> {job.location}
                        </span>
                        <span className="px-4 py-2 bg-green-50 text-green-700 font-semibold rounded-xl text-sm border border-green-100 flex items-center gap-2">
                             <DollarSign className="w-4 h-4" /> {job.salaryRange}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-4xl p-8 md:p-10 border border-slate-200/60 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-400"/> Job Description
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                </div>
                
                <div className="mt-10 pt-10 border-t border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Requirements</h3>
                    <ul className="space-y-3">
                        {['3+ years of experience in relevant field', 'Strong communication skills', 'Ability to work in a fast-paced environment'].map((req, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                                {req}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

          </div>

          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-4xl border border-slate-200/60 shadow-lg p-6 md:p-8 sticky top-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Apply Now</h3>
                    <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>

                {!user ? (
                    <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500 mb-4 text-sm">Log in to start your application.</p>
                        <Button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 w-full rounded-xl">
                            Login to Apply
                        </Button>
                    </div>
                ) : user.role === 'employer' ? (
                     <div className="p-4 bg-orange-50 text-orange-800 rounded-2xl text-sm font-medium border border-orange-100 flex items-start gap-3">
                        <Building2 className="w-5 h-5 shrink-0" />
                        You are viewing this as an Employer. Switch to a Candidate account to apply.
                    </div>
                ) : (
                    <form onSubmit={handleApply} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Upload Resume / CV</label>
                            <div className="relative group">
                                <input 
                                    type="file" 
                                    id="resume-upload"
                                    accept=".pdf"
                                    className="hidden" 
                                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                                />
                                <label 
                                    htmlFor="resume-upload" 
                                    className={`
                                        flex flex-col items-center justify-center w-full h-32 
                                        border-2 border-dashed rounded-2xl cursor-pointer transition-all
                                        ${resume 
                                            ? 'border-green-500 bg-green-50' 
                                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-blue-400'
                                        }
                                    `}
                                >
                                    {resume ? (
                                        <>
                                            <CheckCircle2 className="w-8 h-8 text-green-600 mb-2" />
                                            <span className="text-sm font-medium text-green-700 px-4 text-center truncate w-full">
                                                {resume.name}
                                            </span>
                                            <span className="text-xs text-green-600 mt-1">Click to change</span>
                                        </>
                                    ) : (
                                        <>
                                            <UploadCloud className="w-8 h-8 text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
                                            <span className="text-sm font-medium text-slate-600">Click to upload PDF</span>
                                            <span className="text-xs text-slate-400 mt-1">Max file size 5MB</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={uploading || !resume} 
                            className="w-full h-12 bg-black hover:bg-slate-800 text-white rounded-xl text-base font-medium shadow-lg shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Sending...
                                </span>
                            ) : "Submit Application"}
                        </Button>
                        <p className="text-xs text-center text-slate-400">
                            By applying, you agree to our Terms of Service.
                        </p>
                    </form>
                )}
            </div>

            <div className="bg-white rounded-4xl border border-slate-200/60 p-6 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">Overview</h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 flex items-center gap-2"><Clock size={16}/> Posted</span>
                        <span className="font-medium text-slate-900">2 days ago</span>
                    </div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 flex items-center gap-2"><Building2 size={16}/> Type</span>
                        <span className="font-medium text-slate-900">{job.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 flex items-center gap-2"><DollarSign size={16}/> Salary</span>
                        <span className="font-medium text-slate-900">{job.salaryRange}</span>
                    </div>
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}