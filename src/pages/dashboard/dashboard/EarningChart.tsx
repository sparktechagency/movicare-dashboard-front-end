
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const EarningChart = ({ earningData }: { earningData: any }) => {
    const data = earningData?.map((item: any) => ({ name: item?.month, earnings: item?.totalEarnings }))
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}
        >
            <div className="px-2 mb-1 flex items-center justify-between">
                <h1 className="text-xl font-medium">Monthly Earning</h1>
            </div>
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[5000, 25000]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="#6C4A00"
                        strokeWidth={2}
                        dot={{ fill: '#6C4A00', stroke: '#6C4A00', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EarningChart;
