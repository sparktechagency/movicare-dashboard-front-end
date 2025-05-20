import { Button, Flex } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import AddServicesModal from "../../components/modals/AddServicesModal";


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

const serviceData: Service[] = [
    {
        id: 1,
        name: "Luxury Spa Treatment",
        description: "A premium spa experience with massages and facials.",
        image: "/car.svg",
        status: "active",
        adults_price: 120,
        kids_price: 60,
        service_price: 150,
        price_per_km: 2,
        price_per_hour: 25,
        taxs: 10,
        fixed_price: 100,
    },
    {
        id: 2,
        name: "City Tour Guide",
        description: "Guided city tours with historical insights.",
        image: "/car.svg",
        status: "active",
        adults_price: 70,
        kids_price: 30,
        service_price: 0,
        price_per_km: 0,
        price_per_hour: 20,
        taxs: 0,
        fixed_price: 50,
    },
    {
        id: 3,
        name: "Fitness Bootcamp",
        description: "Intense outdoor training for all fitness levels.",
        image: "/car.svg",
        status: "deleted",
        adults_price: 80,
        kids_price: 50,
        service_price: 90,
        price_per_km: 0,
        price_per_hour: 0,
        taxs: 5,
        fixed_price: 0,
    },
    {
        id: 4,
        name: "Luxury Spa Treatment",
        description: "A premium spa experience with massages and facials.",
        image: "/car.svg",
        status: "active",
        adults_price: 120,
        kids_price: 60,
        service_price: 150,
        price_per_km: 2,
        price_per_hour: 25,
        taxs: 10,
        fixed_price: 100,
    },
    {
        id: 5,
        name: "City Tour Guide",
        description: "Guided city tours with historical insights.",
        image: "/car.svg",
        status: "active",
        adults_price: 70,
        kids_price: 30,
        service_price: 0,
        price_per_km: 0,
        price_per_hour: 20,
        taxs: 0,
        fixed_price: 50,
    },
    {
        id: 6,
        name: "Fitness Bootcamp",
        description: "Intense outdoor training for all fitness levels.",
        image: "/car.svg",
        status: "deleted",
        adults_price: 80,
        kids_price: 50,
        service_price: 90,
        price_per_km: 0,
        price_per_hour: 0,
        taxs: 5,
        fixed_price: 0,
    },
    {
        id: 7,
        name: "Luxury Spa Treatment",
        description: "A premium spa experience with massages and facials.",
        image: "/car.svg",
        status: "active",
        adults_price: 120,
        kids_price: 60,
        service_price: 150,
        price_per_km: 2,
        price_per_hour: 25,
        taxs: 10,
        fixed_price: 100,
    },
    {
        id: 8,
        name: "City Tour Guide",
        description: "Guided city tours with historical insights.",
        image: "/car.svg",
        status: "active",
        adults_price: 70,
        kids_price: 30,
        service_price: 0,
        price_per_km: 0,
        price_per_hour: 20,
        taxs: 0,
        fixed_price: 50,
    },
    {
        id: 9,
        name: "Fitness Bootcamp",
        description: "Intense outdoor training for all fitness levels.",
        image: "/car.svg",
        status: "deleted",
        adults_price: 80,
        kids_price: 50,
        service_price: 90,
        price_per_km: 0,
        price_per_hour: 0,
        taxs: 5,
        fixed_price: 0,
    },
    {
        id: 10,
        name: "Luxury Spa Treatment",
        description: "A premium spa experience with massages and facials.",
        image: "/car.svg",
        status: "active",
        adults_price: 120,
        kids_price: 60,
        service_price: 150,
        price_per_km: 2,
        price_per_hour: 25,
        taxs: 10,
        fixed_price: 100,
    },
    {
        id: 11,
        name: "City Tour Guide",
        description: "Guided city tours with historical insights.",
        image: "/car.svg",
        status: "active",
        adults_price: 70,
        kids_price: 30,
        service_price: 0,
        price_per_km: 0,
        price_per_hour: 20,
        taxs: 0,
        fixed_price: 50,
    },
    {
        id: 12,
        name: "Fitness Bootcamp",
        description: "Intense outdoor training for all fitness levels.",
        image: "/car.svg",
        status: "deleted",
        adults_price: 80,
        kids_price: 50,
        service_price: 90,
        price_per_km: 0,
        price_per_hour: 0,
        taxs: 5,
        fixed_price: 0,
    },
    {
        id: 13,
        name: "Luxury Spa Treatment",
        description: "A premium spa experience with massages and facials.",
        image: "/car.svg",
        status: "active",
        adults_price: 120,
        kids_price: 60,
        service_price: 150,
        price_per_km: 2,
        price_per_hour: 25,
        taxs: 10,
        fixed_price: 100,
    },
    {
        id: 14,
        name: "City Tour Guide",
        description: "Guided city tours with historical insights.",
        image: "/car.svg",
        status: "active",
        adults_price: 70,
        kids_price: 30,
        service_price: 0,
        price_per_km: 0,
        price_per_hour: 20,
        taxs: 0,
        fixed_price: 50,
    },
    {
        id: 15,
        name: "Fitness Bootcamp",
        description: "Intense outdoor training for all fitness levels.",
        image: "/car.svg",
        status: "deleted",
        adults_price: 80,
        kids_price: 50,
        service_price: 90,
        price_per_km: 0,
        price_per_hour: 0,
        taxs: 5,
        fixed_price: 0,
    },
];

const Services = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState<Service | null>(null);

    const serviceColumns: ColumnsType<Service> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text) => <img src={text} alt="Service" style={{  height: 45, borderRadius: 8, objectFit: "cover" }} />,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            width: "150px",

        },
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
        //   {
        //     title: "Price/km ($)",
        //     dataIndex: "price_per_km",
        //     key: "price_per_km",
        //   },
        //   {
        //     title: "Price/hour ($)",
        //     dataIndex: "price_per_hour",
        //     key: "price_per_hour",
        //   },
        //   {
        //     title: "Tax (%)",
        //     dataIndex: "taxs",
        //     key: "taxs",
        //   },
        {
            title: "Fixed Price ($)",
            dataIndex: "fixed_price",
            key: "fixed_price",
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
                    <button>
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
                    pagination={{ pageSize: 8}}
                />
            </div> 
            <AddServicesModal isOpen={isOpen} setIsOpen={setIsOpen} editData={editData} setEditData={setEditData} />
        </div>
    );
};

export default Services;