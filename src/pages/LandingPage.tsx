import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  UserCircle2, 
  Building2, 
  ArrowUpRight, 
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchQuery.trim()) {
        navigate(`/jobs?search=${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-blue-100 pb-16">
      
      <main className="container mx-auto px-4 pt-10 max-w-6xl">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
            <Sparkles size={12} /> The #1 Job Marketplace
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
            Find your next <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">dream job</span> today.
          </h1>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Connecting exceptional talent with world-class opportunities. No fluff, just jobs.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[minmax(140px,auto)]">

          <div className="lg:col-span-12 bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-md transition-all text-center">
            
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 opacity-50"></div>
            
            <h2 className="text-2xl font-bold mb-6 text-slate-800">What are you looking for?</h2>
            
            <form onSubmit={handleQuickSearch} className="relative max-w-2xl w-full mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                className="pl-12 h-14 text-base bg-slate-50 border-slate-200 rounded-full shadow-sm focus-visible:ring-blue-500 focus-visible:bg-white transition-all"
                placeholder="Job title, keywords, or company..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-2 top-2 bottom-2 rounded-full px-6 bg-blue-600 hover:bg-blue-700 h-auto font-semibold">
                Search
              </Button>
            </form>
            
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
                <span className="text-slate-400">Trending:</span>
                <Link to="/jobs?search=Remote" className="hover:text-blue-600 transition-colors">Remote</Link>
                <Link to="/jobs?search=Product" className="hover:text-blue-600 transition-colors">Product Manager</Link>
                <Link to="/jobs?search=Engineer" className="hover:text-blue-600 transition-colors">Frontend Engineer</Link>
                <Link to="/jobs?search=Design" className="hover:text-blue-600 transition-colors">UX Design</Link>
            </div>
          </div>


          <div className="lg:col-span-6 lg:row-span-2 bg-linear-to-br from-blue-50/50 to-white rounded-3xl border border-blue-100/50 shadow-sm p-6 md:p-8 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-4 right-4 bg-blue-100 p-2.5 rounded-2xl text-blue-600 rotate-12 group-hover:rotate-0 transition-transform">
                <UserCircle2 size={24} />
            </div>
            
            <span className="text-blue-600 font-bold tracking-wider uppercase text-[10px] mb-3 block">For Candidates</span>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 leading-tight">Find work that matters.</h3>
            <p className="text-sm text-slate-600 mb-8 max-w-sm leading-relaxed">
                Create a profile, upload your resume, and apply to top-tier companies with a single click.
            </p>

            <div className="mt-auto space-y-3 w-full">
                <Link to="/jobs">
                    <Button className="w-full rounded-xl h-11 mb-4 text-sm font-semibold bg-blue-600 hover:bg-blue-700 flex items-center justify-between group/btn shadow-blue-200 shadow-lg">
                        Browse Jobs
                        <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"/>
                    </Button>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                    <Link to="/login?role=candidate">
                        <Button variant="outline" className="w-full rounded-xl h-10 text-xs font-semibold bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
                            Log In
                        </Button>
                    </Link>
                     <Link to="/register?role=candidate">
                        <Button variant="secondary" className="w-full rounded-xl h-10 text-xs font-semibold bg-blue-100/50 text-blue-700 hover:bg-blue-100">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
          </div>


          <div className="lg:col-span-6 lg:row-span-2 bg-linear-to-br from-orange-50/50 to-white rounded-3xl border border-orange-100/50 shadow-sm p-6 md:p-8 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
             <div className="absolute top-4 right-4 bg-orange-100 p-2.5 rounded-2xl text-orange-600 -rotate-12 group-hover:rotate-0 transition-transform">
                <Building2 size={24} />
            </div>

            <span className="text-orange-600 font-bold tracking-wider uppercase text-[10px] mb-3 block">For Employers</span>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 leading-tight">Hire better, faster.</h3>
            <p className="text-sm text-slate-600 mb-8 max-w-sm leading-relaxed">
                Post opportunities to a community of vetted professionals and manage your pipeline easily.
            </p>

             <div className="mt-auto space-y-3 w-full">
                <Link to="/employer/jobs/new">
                    <Button className="w-full rounded-xl h-11 mb-4 text-sm font-semibold bg-slate-900 hover:bg-slate-800 flex items-center justify-between group/btn shadow-slate-200 shadow-lg">
                        Post a Job
                        <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"/>
                    </Button>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                    <Link to="/login?role=employer">
                        <Button variant="outline" className="w-full rounded-xl h-10 text-xs font-semibold bg-white hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200">
                            Log In
                        </Button>
                    </Link>
                     <Link to="/register?role=employer">
                        <Button variant="secondary" className="w-full rounded-xl h-10 text-xs font-semibold bg-orange-100/50 text-orange-700 hover:bg-orange-100">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}