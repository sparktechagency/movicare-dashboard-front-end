import { Table, Input, Select, Pagination } from 'antd';
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CustomModal from '../../components/shared/CustomModal';
import { ImInfo } from 'react-icons/im';
import BookingDetailsModal from '../../components/modals/BookingDetailsModal';
import { useGetBookingHistoryQuery, useUpdateBookingStatusMutation } from '../../redux/apiSlices/bookingHistorySlice';
import moment from 'moment';
import { imageUrl } from '../../redux/api/baseApi';
import Swal from 'sweetalert2';

const { Option } = Select;

type BookingHistory = {
  key: number;
  date: string;
  pickupCity: string;
  dropOffCity: string;
  distance: number;
  className: string;
  classImage: string;
  serviceName: string;
  price: number;
  totalAdults: number;
  totalKids: number;
  status: 'Completed' | 'Canceled' | 'Active' | string;
};



const BookingHistory = () => {
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showDetails, setShowDetails] = useState<BookingHistory | null>(null)
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const limit = 7
  const { data: allBookings, refetch } = useGetBookingHistoryQuery({ search, page, limit, status });
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  console.log("allBookings", allBookings);

  const handleStatusChange = (id: any, value: string) => { 
    const data = { 
      id,
      status: value
    }
    updateBookingStatus(data).then((res) => { 
      console.log("edit response", res);
      if (res?.data?.success) {
        Swal.fire({
          text: res?.data?.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          refetch();
        });
      } else {
        Swal.fire({
          title: "Oops",
          //@ts-ignore
          text: res?.error?.data?.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }

  const bookingsData = allBookings?.data?.data?.map((item: any, index: number) => ({
    key: index + 1,
    date: moment(item?.date).format("YYYY-MM-DD"),
    pickupCity: item?.pickup_location,
    dropOffCity: item?.dropoff_location,
    distance: item?.distance,
    className: item?.provider?.name,
    classImage: "/car.svg",
    serviceName: item?.service?.name,
    serviceImage: item?.service?.image?.startsWith('http') ? item?.service?.image : `${imageUrl}${item?.service?.image}`,
    price: item?.total_price,
    totalAdults: item?.adults,
    totalKids: item?.kids,
    status: item?.status,
    id: item?._id,
    userName: item?.user?.name,
    email: item?.user?.email
  }));

  const columns: ColumnsType<any> = [
    {
      title: "S/N",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "User",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Distance (km)",
      dataIndex: "distance",
      key: "distance",
    },

    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "default";
        if (status === "confirmed") color = "green";
        else if (status === "pending") color = "orange";
        else if (status === "cancelled") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className='flex items-center gap-4'>
          <p onClick={() => { setShowDetails(record); setShowBookingDetails(true) }} className='cursor-pointer'> <ImInfo className='text-primary' size={20} /> </p>

          <Select defaultValue={record.status} className="w-32 h-[42px]" onChange={(value) => handleStatusChange(record?.id, value)}>
            <Option value="confirmed">Completed</Option>
            <Option value="pending">Pending</Option>
            <Option value="cancelled">Canceled</Option>
          </Select>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-primary font-semibold">Booking History</h1>
        </div>
        <div className="flex items-center gap-5 justify-end mb-5">
          <Input
            style={{
              maxWidth: 300,
              height: 42,
            }}
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Dropdown Filter */}
          <Select defaultValue="All" className="w-52 h-[42px]" onChange={(value) => setStatus(value)} >
            <Option value="All">All</Option>
            <Option value="confirmed">Completed</Option>
            <Option value="pending">Pending</Option>
            <Option value="cancelled">Canceled</Option>
          </Select>
        </div>
      </div>
      <Table columns={columns} dataSource={bookingsData} rowClassName="hover:bg-gray-100" pagination={false} />
      {
        allBookings?.data?.getPaginationInfo?.total >= 7 &&
        <div className="flex justify-end mt-5">
          <Pagination
            current={page}
            total={allBookings?.data?.getPaginationInfo?.total}
            pageSize={allBookings?.data?.getPaginationInfo?.limit}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      <CustomModal
        open={showBookingDetails}
        setOpen={setShowBookingDetails}
        body={<BookingDetailsModal showDetails={showDetails} />}
        key={'influencer-details'}
        width={550}
      />
    </div>
  );
};

export default BookingHistory;
