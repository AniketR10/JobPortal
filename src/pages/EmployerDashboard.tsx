import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '@/lib/axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; 

export default function EmployerDashboard() {
  const navigate = useNavigate(); 
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs/employer/jobs');
        setJobs(data);
        if (data.length > 0) setSelectedJob(data[0]._id);
      } catch (error) {
        console.error("Error fetching jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!selectedJob) return;
    const fetchApps = async () => {
      try {
        const { data } = await api.get(`/jobs/${selectedJob}/applications`);
        setApplications(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApps();
  }, [selectedJob]);

  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      await api.put(`/applications/${appId}/status`, { status: newStatus });
      setApplications(apps => 
        apps.map(app => app._id === appId ? { ...app, status: newStatus } : app)
      );
    } catch (error) {
      alert((error as any).response?.data?.message || "Failed to update status");
       window.location.reload(); 
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        
       
        <Button onClick={() => navigate('/employer/jobs/new')}>
          + Post New Job
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Position</CardTitle>
          </CardHeader>
          <CardContent>
            <select 
              className="w-full md:w-[300px] p-2 border rounded-md bg-white"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              {jobs.length > 0 ? (
                jobs.map(job => (
                  <option key={job._id} value={job._id}>{job.title}</option>
                ))
              ) : (
                <option disabled>No jobs posted yet</option>
              )}
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b bg-slate-50">
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">No applications yet</TableCell>
                  </TableRow>
                ) : (
                  applications.map((app) => (
                    <TableRow key={app._id}>
                      <TableCell>
                        <div className="font-medium">{app.candidateId?.name || "Unknown"}</div>
                        <div className="text-sm text-slate-500">{app.candidateId?.email || "No Email"}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{app.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <a href={app.resumeUrl} target="_blank" className="text-blue-600 hover:underline">View PDF</a>
                      </TableCell>
                      <TableCell className="text-right">
                        <Select defaultValue={app.status} onValueChange={(val) => handleStatusChange(app._id, val)}>
                          <SelectTrigger className="w-[130px] ml-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="screening">Screening</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="offer">Offer</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}