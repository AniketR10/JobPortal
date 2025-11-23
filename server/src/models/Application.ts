import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: { type: String, required: true },
  resumePublicId: {type: String, required: true},
  status: { 
    type: String, 
    enum: ['applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn'], 
    default: 'applied' 
  },
}, { timestamps: true });

export default mongoose.model('Application', ApplicationSchema);