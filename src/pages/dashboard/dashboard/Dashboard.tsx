import { DatePicker } from 'antd';
import { useGetUserAnalyticsQuery } from '../../../redux/apiSlices/analyticsSlice';
import DashboardStats from './DashboardStats';
import EarningChart from './EarningChart';
import UserChart from './UserChart';
import { useState } from 'react';

const Dashboard = () => {
    const [year, setyear] = useState(new Date().getFullYear())
    const { data } = useGetUserAnalyticsQuery(year)
    return (
        <div className=" ">
            <DashboardStats summary={data} />

            <div className='flex justify-end mt-4'>
                <DatePicker
                    onChange={(value) => {
                        if (value) {
                            setyear(value.year());
                        }
                    }}
                    picker="year"
                    className="w-40 h-[40px]" />
            </div>

            <div className="grid grid-cols-12  gap-2 items-center mt-2">
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
