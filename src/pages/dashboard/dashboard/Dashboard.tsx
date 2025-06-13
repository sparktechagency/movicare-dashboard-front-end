import { useGetUserAnalyticsQuery } from '../../../redux/apiSlices/analyticsSlice';
import DashboardStats from './DashboardStats';
import EarningChart from './EarningChart';
import UserChart from './UserChart';

const Dashboard = () => {  
    const {data} = useGetUserAnalyticsQuery(undefined) 
    console.log(data);
    return (
        <div className=" ">
            <DashboardStats summary={data} />

            <div className="grid grid-cols-12  gap-2 items-center mt-5">
                <div className="col-span-12 bg-white drop-shadow-md  p-4 mx-2 rounded-2xl mb-3">
                    {/* total services */}

                    <EarningChart earningData={data?.yearlyBookingData} />
                </div>
                <div className="col-span-12 bg-white drop-shadow-md p-4 pb-0 mx-2 rounded-2xl">
                    <UserChart userData={data?.yearlyUsersData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
