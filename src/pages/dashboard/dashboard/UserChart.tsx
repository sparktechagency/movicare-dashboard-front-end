
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';
const UserChart = ({ userData }: { userData: any }) => {
    const data = userData?.map((item: any) => ({ name: item?.month, totalUsers: item?.totalUsers }))

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
            }}
        >
            <div className="px-2 flex items-center justify-between mb-1">
                <h1 className="text-xl font-medium">Total Users Statistics</h1>
         
            </div>
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalUsers" fill="#286a25" />
                    {/* <Bar dataKey="newUsers" fill="#5C450D" />  */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserChart;
