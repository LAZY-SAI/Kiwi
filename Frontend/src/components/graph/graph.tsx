import { 
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const SampleData = [
  { name: 'Mon', orders: 12 },
  { name: 'Tue', orders: 19 },
  { name: 'Wed', orders: 15 },
  { name: 'Thu', orders: 22 },
  { name: 'Fri', orders: 30 },
  { name: 'Sat', orders: 25 },
  { name: 'Sun', orders: 18 },
];

export const Graph = () => {
  return (
    // ResponsiveContainer ensures the chart fills its parent Card/Div
    <div className="h-[300px] w-full"> 
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={SampleData}>
          <CartesianGrid strokeDasharray="3 3" stroke='#334155' vertical={false}/>
          <XAxis 
            dataKey="name"
            stroke='#94a3b8'
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke='#94a3b8'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          {/* Recharts Tooltip now accepts your props correctly */}
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
            itemStyle={{ color: '#6366f1' }}
          />

          <Line
            type='monotone'
            dataKey='orders'
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 4, fill: "#6366f1" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
