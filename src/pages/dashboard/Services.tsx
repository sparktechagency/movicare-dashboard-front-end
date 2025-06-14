import { Button, Flex } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import AddServicesModal from "../../components/modals/AddServicesModal";
import { useDeleteServiceMutation, useGetAllServicesQuery } from "../../redux/apiSlices/servicesSlice";
import { imageUrl } from "../../redux/api/baseApi";
import Swal from "sweetalert2";


type Service = {
    id: number;
    name: string;
    description: string;
    image: string;
    status: "active" | "deleted";
    adults_price: number;
    kids_price: number;
    service_price?: number;
    price_per_km?: number;
    price_per_hour?: number;
    taxs?: number;
    fixed_price?: number;
};

const Services = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState<Service | null>(null);
    const { data: allServices, refetch } = useGetAllServicesQuery(undefined);
    const [deleteService] = useDeleteServiceMutation(); 
    console.log(allServices);

    const serviceData = allServices?.data.map((service: any, index: number) => ({
        key: index + 1,
        id: service._id,
        name: service.name,
        description: service.description,
        image: service?.image?.startsWith("http") ? service?.image : `${imageUrl}${service?.image}`,
        adults_price: service.adults_price,
        kids_price: service.kids_price,
        service_price: service.service_price,
        price_per_km: service.price_per_km,
        price_per_hour: service.price_per_hour,
        taxs: service.taxs, 
        fixed_price: service.fixed_price , 
        button_text :service.button_text
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
                await deleteService(id).then((res) => {
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


    const serviceColumns: ColumnsType<Service> = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text) => <img src={text} alt="Service" style={{ height: 45, borderRadius: 8, objectFit: "cover" }} />,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        // {
        //     title: "Description",
        //     dataIndex: "description",
        //     key: "description",
        //     ellipsis: true,
        //     width: "150px",

        // },
        {
            title: "Adults Price ($)",
            dataIndex: "adults_price",
            key: "adults_price",
        },
        {
            title: "Kids Price ($)",
            dataIndex: "kids_price",
            key: "kids_price",
        },
        {
            title: "Service Price ($)",
            dataIndex: "service_price",
            key: "service_price",
        },
        {
            title: "Price/km ($)",
            dataIndex: "price_per_km",
            key: "price_per_km",
        },
        {
            title: "Price/hour ($)",
            dataIndex: "price_per_hour",
            key: "price_per_hour",
        },
        {
            title: "Tax (%)",
            dataIndex: "taxs",
            key: "taxs",
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
            <div>
                <Flex className="my-2" vertical={false} gap={10} align="center" justify="space-between">
                    <div>
                        <h1 className="text-2xl text-primary font-semibold">Manage Services</h1>
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
                            Add Services
                        </Button>
                    </div>
                </Flex>
                <Table
                    columns={serviceColumns}
                    dataSource={serviceData}
                    pagination={false}
                />
            </div>
            <AddServicesModal isOpen={isOpen} setIsOpen={setIsOpen} editData={editData} setEditData={setEditData} refetch={refetch} />
        </div>
    );
};

export default Services;