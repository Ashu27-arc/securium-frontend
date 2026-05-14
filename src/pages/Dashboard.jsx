import { useState, useEffect } from 'react';
import { Ticket, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import TicketCard from '../components/TicketCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await api.get('/tickets/my');
      setTickets(data);
    } catch (error) {
      toast.error('Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(t => 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Support Overview</h1>
          <p className="text-slate-500">Track and manage your support requests.</p>
        </div>
        <Link to="/create-ticket" className="btn-primary flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> New Ticket
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card border-l-4 border-l-blue-500">
          <p className="text-sm font-medium text-slate-500 uppercase">Total Tickets</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{tickets.length}</p>
        </div>
        <div className="card border-l-4 border-l-amber-500">
          <p className="text-sm font-medium text-slate-500 uppercase">Pending</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            {tickets.filter(t => t.status !== 'Resolved').length}
          </p>
        </div>
        <div className="card border-l-4 border-l-emerald-500">
          <p className="text-sm font-medium text-slate-500 uppercase">Resolved</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            {tickets.filter(t => t.status === 'Resolved').length}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-primary-600" /> Recent Tickets
          </h2>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="input-field pl-9 py-1.5 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20"><Loader size="lg" /></div>
        ) : filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="card flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <Ticket className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No tickets found</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-1">
              You haven't created any support tickets yet or none match your search.
            </p>
            <Link to="/create-ticket" className="mt-6 text-primary-600 font-semibold hover:text-primary-500">
              Create your first ticket →
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
