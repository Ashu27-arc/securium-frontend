import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-hot-toast';
import TicketCard from '../components/TicketCard';
import Loader from '../components/Loader';
import { PlusCircle, Search, Inbox, Ticket, Clock, CheckCircle } from 'lucide-react';

const UserDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket => 
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My Support Tickets</h1>
          <p className="text-slate-400">Manage and track your support requests</p>
        </div>
        <Link to="/create-ticket" className="btn-primary flex items-center justify-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Raise New Ticket
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card !p-4 border-l-4 border-l-primary-500">
          <div className="flex items-center gap-4">
            <div className="bg-primary-500/10 p-3 rounded-lg">
              <Ticket className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Raised</p>
              <p className="text-xl font-bold text-white">{tickets.length}</p>
            </div>
          </div>
        </div>
        <div className="card !p-4 border-l-4 border-l-yellow-500">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">In Progress</p>
              <p className="text-xl font-bold text-white">
                {tickets.filter(t => t.status !== 'Resolved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card !p-4 border-l-4 border-l-green-500">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Resolved</p>
              <p className="text-xl font-bold text-white">
                {tickets.filter(t => t.status === 'Resolved').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
          <input
            type="text"
            className="input-field pl-10"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : filteredTickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
          <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="h-8 w-8 text-slate-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No tickets found</h2>
          <p className="text-slate-400 mb-6">You haven't raised any support tickets yet.</p>
          <Link to="/create-ticket" className="text-primary-500 hover:text-primary-400 font-medium">
            Create your first ticket →
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
