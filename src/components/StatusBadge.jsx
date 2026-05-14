const StatusBadge = ({ status }) => {
  const styles = {
    'Open': 'bg-blue-100 text-blue-700 border-blue-200',
    'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
    'Resolved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
