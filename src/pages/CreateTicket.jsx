import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'Low',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/tickets', formData);
      toast.success('Ticket submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Raise Support Ticket</h1>
        <p className="text-slate-500">Describe your issue and our team will get back to you shortly.</p>
      </div>

      <div className="card shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-400" /> Subject
            </label>
            <input
              name="subject"
              type="text"
              required
              className="input-field"
              placeholder="e.g. Cannot access course materials"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="5"
              className="input-field resize-none"
              placeholder="Provide more details about the issue..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-slate-400" /> Priority Level
            </label>
            <select
              name="priority"
              className="input-field"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low - General inquiry</option>
              <option value="Medium">Medium - Feature issues</option>
              <option value="High">High - Critical blocker</option>
            </select>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary flex justify-center items-center gap-2 h-11"
            >
              {loading ? <Loader size="sm" /> : 'Submit Ticket'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateTicket;
