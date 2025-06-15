import { Pagination } from 'antd';
import { useGetAllNotificationQuery } from '../../redux/apiSlices/notificationSlice';
import moment from 'moment';
import { useState } from 'react';
const Notification = () => {  
    const [page , setPage] = useState(1) 
    const limit = 7
    const {data:allNotifications} = useGetAllNotificationQuery({page , limit}) 
    return (
        <div className="mt-5">
            <div className="bg-white p-5 rounded-xl">
                <div className="flex items-center justify-between my-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-primary">Notification</h1>
                    </div>
                    {/* <div className="flex items-center gap-4">
                        <Button
                            style={{
                                height: '40px',

                                borderRadius: '8px',
                                border: '2px solid #2461CB',

                                background: 'white',

                                color: '#2461CB',
                                fontWeight: '400',
                                fontSize: 14,
                            }}
                        >
                            <span>Read all</span>
                        </Button>
                    </div> */}
                </div>
                <div>
                    {allNotifications?.data?.map((item: any, index: number) => {
                        return (
                            <div key={index} className="w-full mx-auto p-4 my-4   min-h-20  shadow-md">
                                <div className=" text-sm">
                                    <div className="flex items-center gap-5">
                                        <p className="font-semibold text-[#555555]">{item?.title}</p>
                                        <div className="flex justify-between items-center gap-5 text-[#A7A7A7]">
                                            <span className="text-xs ">{moment(item?.createdAt).format('DD-MM-YYYY')}</span>
                                            <span className="text-xs ">{moment(item?.createdAt).format('hh:mm A')}</span>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-sm text-[#818181]">{item?.text}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })} 

                    {
                        allNotifications?.pagination?.total >= 7 && (
                          <Pagination
                            current={page}
                            total={allNotifications?.pagination?.total} 
                            pageSize={allNotifications?.pagination?.limit}
                            onChange={(page) => setPage(page)}
                          />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Notification;
