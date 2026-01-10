import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  Briefcase,
} from 'lucide-react';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: searchParams.get('role') || 'candidate'
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/api/auth/register', formData);
      navigate('/login'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[100px] opacity-50 -z-10 pointer-events-none"></div>

      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900 mb-2">
            <span className="text-blue-600">•••</span> JobOrbit
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-500 text-sm mt-2">Join the community to start your journey.</p>
        </div>

        <div className="bg-white rounded-4xl border border-slate-200/60 shadow-xl shadow-slate-200/20 p-8 relative">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold text-center flex items-center justify-center gap-2">
                {error}
              </div>
            )}
            
            {/* Name Field */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                  className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                  className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                  className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
               <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">I want to...</Label>
               <div className="relative">
                 <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                 <Select 
                    value={formData.role} 
                    onValueChange={(value) => setFormData({...formData, role: value})}
                  >
                    <SelectTrigger className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candidate">
                        <div className="flex items-center gap-2">
                            <span>Apply for Jobs</span>
                            <span className="text-xs text-slate-400">(Candidate)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="employer">
                        <div className="flex items-center gap-2">
                            <span>Hire Talent</span>
                            <span className="text-xs text-slate-400">(Employer)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
               </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-black hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5 mt-4"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <span className="flex items-center gap-2">Get Started <ArrowRight size={16} /></span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <p className="text-sm text-slate-500">
              Already have an account? 
              <Link to="/login" className="text-blue-600 font-bold hover:underline ml-1">
                Log in
              </Link>
            </p>
          </div>

        </div>
        
        <p className="text-center text-xs text-slate-400 mt-6 max-w-xs mx-auto leading-relaxed">
            By registering, you agree to our Terms of Service and Privacy Policy.
        </p>

      </div>
    </div>
  );
}