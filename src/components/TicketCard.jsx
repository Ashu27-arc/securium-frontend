import { Calendar, User, Tag } from 'lucide-react';
import StatusBadge from './StatusBadge';

const TicketCard = ({ ticket, isAdmin = false }) => {
  const priorityColors = {
    Low: 'bg-slate-100 text-slate-600',
    Medium: 'bg-orange-100 text-orange-600',
    High: 'bg-red-100 text-red-600',
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-slate-800 line-clamp-1">{ticket.subject}</h3>
        <StatusBadge status={ticket.status} />
      </div>
      
      <p className="text-slate-600 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
        {ticket.description}
      </p>

      <div className="space-y-2 border-t border-slate-50 pt-4">
        <div className="flex items-center text-xs text-slate-500">
          <Tag className="w-3.5 h-3.5 mr-2" />
          <span className={`px-2 py-0.5 rounded ${priorityColors[ticket.priority]}`}>
            {ticket.priority} Priority
          </span>
        </div>

        {isAdmin && ticket.user && (
          <div className="flex items-center text-xs text-slate-500">
            <User className="w-3.5 h-3.5 mr-2" />
            <span>Created by: {ticket.user.name}</span>
          </div>
        )}

        <div className="flex items-center text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5 mr-2" />
          <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
