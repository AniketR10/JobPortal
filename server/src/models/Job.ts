import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], required: true },
  description: { type: String, required: true },
  salaryRange: { type: String, required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
}, { timestamps: true });

// Index for search functionality
JobSchema.index({ title: 'text', description: 'text', location: 'text' });

export default mongoose.model('Job', JobSchema);