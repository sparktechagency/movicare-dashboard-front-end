import { Table, Input, Pagination } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { useGetAllTransactionQuery } from '../../redux/apiSlices/transactionSlice';
import { useState } from 'react';


const Transactions = () => {  
  const [search , setSearch] = useState(""); 
  const [page , setPage] = useState(1);
  const {data: transactions} = useGetAllTransactionQuery({search , page}); 


  const data = transactions?.data?.map((transaction:{ user: { name: string; email: string; }; transaction_id: string; service: { name: string; }; provider: { name: string; }; }, index:number) => ({
    key: index + 1,
    username: transaction?.user?.name,
    email: transaction?.user?.email,
    transactionId: transaction?.transaction_id,
    serviceName: transaction?.service?.name,
    className: transaction?.provider?.name,
    serial: index + 1,
  }));
 
  const columns = [
    {
      title: 'Serial',
      dataIndex: 'serial',
      key: 'serial',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Class Name',
      dataIndex: 'className',
      key: 'className',
    },
  ];
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl text-primary font-semibold">Transactions History</h1>
                </div>
                <div className="flex items-center gap-5 justify-end mb-5">
                    <Input
                        style={{
                            width: 400,
                            height: 42,
                        }}
                        placeholder="Search"
                        prefix={<SearchOutlined />} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
               
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" pagination={false} />  
            {
              transactions?.pagination?.total > 10 &&
              <Pagination current={page} onChange={(page) => setPage(page)} total={transactions?.pagination?.total} />
            }         
           
        </div>
    );
};

export default Transactions;
