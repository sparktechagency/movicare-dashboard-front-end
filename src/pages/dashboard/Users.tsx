import { Table, Input } from 'antd';
import { FiSearch } from 'react-icons/fi';
import { useGetAllUserQuery } from '../../redux/apiSlices/usersSlice';
import { useState } from 'react';
// Sample data

const Users = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState<number>(1); 
  const limit = 8
  const { data: users } = useGetAllUserQuery({ search, page , limit})
  console.log(users);

  const data = users?.data?.map((item: { _id: string, name: string, image: string, email: string, contact: string } , index :number) => ({
    key: index + 1,
    name: item?.name,
    image: item?.image,
    email: item?.email,
    contact: item?.contact,
  }));

  // Column definitions
  const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <img src={record.image} alt={record.name} className="w-10 h-10 rounded-full object-cover" />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
  ];
  return (
    <div className="">
      <div className="flex justify-between items-center mb-5 mt-3 ">
    
          <h1 className="text-2xl text-primary font-semibold">All Users</h1>
   
        <div className="flex items-center gap-5 justify-end ">
          <Input
            style={{
              width: 400,
              height: 42,
              borderRadius: 10
            }}
            placeholder="Search"
            prefix={<FiSearch color="#286a25" size={20} />}
            onChange={(e) => setSearch(e.target.value)}
          />


        </div>
      </div>
      <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" 
       pagination={{
                            current: page,
                            onChange: (page) => setPage(page) ,
                            total: users?.pagination?.total, 
                            pageSize: users?.pagination?.limit
                        }} />


    </div>
  );
};

export default Users;
