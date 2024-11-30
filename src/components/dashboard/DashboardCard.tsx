interface DashboardCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
}

export const DashboardCard = ({ title, value, change, icon }: DashboardCardProps) => {
  return (
    <div className="p-6 rounded-2xl glass animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 font-medium">{title}</h3>
        {icon}
      </div>
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold">{value}</span>
        <div className={`flex items-center gap-1 text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <span>{change.value}</span>
          <span>({change.percentage})</span>
        </div>
      </div>
    </div>
  );
};