import { Button, Pagination, Table } from 'antd';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import AddCompaniesModal from '../../components/modals/AddCompaniesModal';
import { useDeleteCompanyMutation, useGetCompaniesQuery } from '../../redux/apiSlices/companiesSlice';
import { imageUrl } from '../../redux/api/baseApi';
import Swal from 'sweetalert2';

const Companies = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const [page , setPage] = useState(1);
    const { data: allCompanies, refetch } = useGetCompaniesQuery(page)
    const [deleteCompany] = useDeleteCompanyMutation()


     const handleDelete = async (id: string) => {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteCompany(id).then((res) => {
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
    
            })
          }
        });
      }; 

    const data = allCompanies?.data?.map((company: any, index: number) => ({
        key: index + 1, 
        id: company?._id,
        logo: company?.image?.startsWith('http') ? company?.image : `${imageUrl}${company?.image}`,
    }));

    const columns = [
        {
            title: 'S/No',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Company Logo',
            dataIndex: 'logo',
            key: 'logo',
            render: (logo: string) => <img src={logo} alt="logo" style={{ width: 50, height: 43, objectFit: 'contain' }} />,
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_:any,record:any) => (
                <div className="flex items-center gap-3">

                    <button className="text-red-500" onClick={() => handleDelete(record?.id)}>
                        <AiOutlineDelete size={24} />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div className="">
            <div className="my-3 flex items-center justify-between mb-5">
                <h1 className="text-2xl text-primary font-semibold">Companies</h1>
                <Button
                    onClick={() => setIsOpen(true)}
                    style={{
                        height: 40,
                    }}
                    type="primary"
                >
                    Create Companies
                </Button>
            </div>
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" pagination={false} /> 
            {
                allCompanies?.length >= 10 && <Pagination
                current={page}
                onChange={(page) => setPage(page)}
                total={allCompanies?.pagination?.total} 
                />
                   
            }
            <AddCompaniesModal isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch}/>
        </div>
    );
};

export default Companies;