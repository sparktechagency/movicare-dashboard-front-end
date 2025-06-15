import { Button, Flex, Table } from 'antd';
import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';

import { AiOutlineEdit } from 'react-icons/ai';
import CreateClassModal from '../../components/modals/CreateClassModal';
import { useDeleteProviderMutation, useGetAllProviderQuery } from '../../redux/apiSlices/classSlice';
import Swal from 'sweetalert2';

type ClassData = {
    id: string;
    name: string;
    image: string;
    description: string;
    facilities: string[];
    price: number;
};
const CreateClasses = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState<ClassData | null>(null);  
    const {data :allClasses , refetch} = useGetAllProviderQuery(undefined)  
    const [deleteProvider] = useDeleteProviderMutation();

    const classData = allClasses?.data?.data?.map((item: any , index :number) => ({ 
        key:index+1 ,
        id: item._id,
        name: item.name,
        image: "/car.svg",
        description: item.description, 
        facilities: item.facilities,
        price: item.price,
    }));
 

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
                    await deleteProvider(id).then((res) => {
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


    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            width: "100px"
        },
        {
            title: 'Class Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Class Image',
            dataIndex: 'image',
            key: 'image',
            width: "250px",
            render: (image: string) => (
                <img src={image} alt="Class" style={{ height: 50, objectFit: 'cover', borderRadius: 4 }} />
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true, // Optional: truncate long text
        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
            key: 'price',
            width: "150px",
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: 'Action',
            key: 'action',
            width: "150px",
            render: (_: any, record: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                    <button onClick={() => { setIsOpen(true); setEditData(record) }}>
                        <AiOutlineEdit className="text-xl text-primary" />
                    </button>
                    <button onClick={() => handleDelete(record.id)}>
                        <IoTrashOutline className="text-xl text-red-500" />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <Flex className="my-2" vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-2xl text-primary font-semibold">Manage Classes</h1>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        onClick={() => setIsOpen(true)}
                        style={{
                            height: 40,
                        }}
                        type="primary"
                    >
                        Create new class
                    </Button>
                </div>
            </Flex>

            <div>
                <Table columns={columns} dataSource={classData} pagination={{ pageSize: 7 }} />
            </div>
            <CreateClassModal isOpen={isOpen} setIsOpen={setIsOpen} editData={editData} setEditData={setEditData} refetch={refetch} />
        </div>
    );
};

export default CreateClasses;
