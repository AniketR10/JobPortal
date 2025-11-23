import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      navigate('/login'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-slate-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}
            
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                type="email" 
                placeholder="name@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Password</Label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label>I want to...</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({...formData, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="candidate">Apply for Jobs (Candidate)</SelectItem>
                  <SelectItem value="employer">Hire Talent (Employer)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full mt-4">Register</Button>
            
            <p className="text-center text-sm text-slate-500 mt-2">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}