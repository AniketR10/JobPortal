import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Briefcase, 
  Building2, 
  MapPin, 
  DollarSign, 
  FileText,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salaryRange: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/jobs', formData);
      navigate('/employer/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-16 pt-6">
      
      <div className="container mx-auto px-4 max-w-2xl">
        
        <div className="mb-6">
            <Link to="/employer/dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-white hover:text-slate-900 -ml-3 text-slate-500 mb-2 h-8 text-xs">
                    <ArrowLeft className="w-3 h-3 mr-2" /> Back to Dashboard
                </Button>
            </Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        Post Opportunity <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Create a detailed job listing to find your next team member.
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 size={14} /> Job Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-700 font-semibold text-xs">Job Title</Label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input 
                                    id="title" 
                                    placeholder="e.g. Senior Product Designer" 
                                    value={formData.title} 
                                    onChange={handleChange} 
                                    required 
                                    className="pl-9 h-10 text-sm rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company" className="text-slate-700 font-semibold text-xs">Company Name</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input 
                                    id="company" 
                                    placeholder="e.g. Acme Corp" 
                                    value={formData.company} 
                                    onChange={handleChange} 
                                    required 
                                    className="pl-9 h-10 text-sm rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-4">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 size={14} /> Logistics
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-slate-700 font-semibold text-xs">Location</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input 
                                    id="location" 
                                    placeholder="e.g. Remote, NY" 
                                    value={formData.location} 
                                    onChange={handleChange} 
                                    required 
                                    className="pl-9 h-10 text-sm rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="salaryRange" className="text-slate-700 font-semibold text-xs">Salary Range</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input 
                                    id="salaryRange" 
                                    placeholder="e.g. $120k - $150k" 
                                    value={formData.salaryRange} 
                                    onChange={handleChange} 
                                    required 
                                    className="pl-9 h-10 text-sm rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                         <div className="space-y-2 md:col-span-2">
                            <Label className="text-slate-700 font-semibold text-xs">Employment Type</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                                <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val})}>
                                    <SelectTrigger className="pl-9 h-10 text-sm rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                        <SelectItem value="Freelance">Freelance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-2">
                    <Label htmlFor="description" className="text-slate-700 font-semibold text-xs flex items-center justify-between">
                        Job Description
                        <span className="text-[10px] font-normal text-slate-400">Markdown supported</span>
                    </Label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <textarea 
                            id="description" 
                            className="flex min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 pl-9 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-950/10 transition-all resize-y" 
                            placeholder="Describe the role, responsibilities..." 
                            value={formData.description} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <Button 
                        type="submit" 
                        className="w-full h-11 bg-black hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-md shadow-slate-200 transition-all hover:-translate-y-0.5" 
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish Job Listing"}
                    </Button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
}