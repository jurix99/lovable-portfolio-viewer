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
    <div className="p-6 rounded-2xl glass animate-fade-up hover:bg-[rgba(18,18,18,0.8)] transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1890ff] bg-opacity-20 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-gray-400 font-medium">{title}</h3>
        </div>
      </div>
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-white">{value}</span>
        <div className={`flex items-center gap-1 text-sm ${change.isPositive ? 'text-[#52c41a]' : 'text-[#ff4d4f]'}`}>
          <span>{change.value}</span>
          <span>({change.percentage})</span>
        </div>
      </div>
    </div>
  );
};