import { Button, Flex, Table } from 'antd';
import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';

import { AiOutlineEdit } from 'react-icons/ai';
import CreateClassModal from '../../components/modals/CreateClassModal';

type ClassData = {
    id: string;
    className: string;
    classImage: string;
    description: string;
    features: string[];
    price: number;
};
const CreateClasses = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState<ClassData | null>(null);

    const classData: ClassData[] = [
        {
            id: '01',
            className: 'Beauty & Fashion Masterclass',
            classImage: '/car.svg',
            description: 'Learn the latest trends in beauty and fashion from industry professionals.',
            features: [
                'Makeup tutorials by experts',
                'Fashion styling guides',
                'Wardrobe essentials',
                'Skincare routines',
            ],
            price: 49.99,
        },
        {
            id: '02',
            className: 'Health & Fitness Bootcamp',
            classImage: '/car.svg',
            description: 'Transform your lifestyle with this all-in-one health and fitness program.',
            features: [
                'Daily workout plans',
                'Personal diet tracking',
                'Live fitness coaching',
                'Mental wellness sessions',
            ],
            price: 59.99,
        },
        {
            id: '03',
            className: 'Travel & Adventure Guide',
            classImage: '/car.svg',
            description: 'Explore the world with practical travel advice and thrilling adventures.',
            features: [
                'Travel hacks & packing tips',
                'Top destinations uncovered',
                'Solo & group travel planning',
                'Adventure vlogging tips',
            ],
            price: 39.99,
        },
        {
            id: '04',
            className: 'Food & Beverage Academy',
            classImage: '/car.svg',
            description: 'Cook, taste, and explore cuisines from around the world.',
            features: [
                'Live cooking sessions',
                'Global cuisine recipes',
                'Beverage pairing tips',
                'Nutrition fundamentals',
            ],
            price: 44.99,
        },
        {
            id: '05',
            className: 'Tech & Gadgets Workshop',
            classImage: '/car.svg',
            description: 'Stay ahead with the latest in tech trends and gadgets.',
            features: [
                'Gadget reviews & unboxings',
                'Hands-on tech tutorials',
                'Smart home integration',
                'Coding for beginners',
            ],
            price: 64.99,
        },
        {
            id: '06',
            className: 'Lifestyle & Vlogging 101',
            classImage: '/car.svg',
            description: 'Build your personal brand through lifestyle vlogging.',
            features: [
                'Content planning',
                'Editing for engagement',
                'Camera setup & lighting',
                'Audience growth tactics',
            ],
            price: 42.99,
        },
        {
            id: '07',
            className: 'Parenting & Family Life Course',
            classImage: '/car.svg',
            description: 'Practical advice for raising children and nurturing family relationships.',
            features: [
                'Parenting tips by age group',
                'Family communication techniques',
                'Child safety & development',
                'Work-life balance advice',
            ],
            price: 35.00,
        },
        {
            id: '08',
            className: 'Entertainment & Gaming Zone',
            classImage: '/car.svg',
            description: 'Dive into the world of entertainment content creation and gaming.',
            features: [
                'Streaming setup & software',
                'Game reviews & walkthroughs',
                'Voiceover & commentary tips',
                'Monetization strategies',
            ],
            price: 55.00,
        },
        {
            id: '09',
            className: 'Business & Finance Blueprint',
            classImage: '/car.svg',
            description: 'Master your finances and build successful business strategies.',
            features: [
                'Investment fundamentals',
                'Budgeting & saving plans',
                'Business startup guides',
                'Marketing & branding tips',
            ],
            price: 69.99,
        },
        {
            id: '10',
            className: 'Business & Finance Blueprint',
            classImage: '/car.svg',
            description: 'Master your finances and build successful business strategies.',
            features: [
                'Investment fundamentals',
                'Budgeting & saving plans',
                'Business startup guides',
                'Marketing & branding tips',
            ],
            price: 69.99,
        },
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: "100px"
        },
        {
            title: 'Class Name',
            dataIndex: 'className',
            key: 'className',
        },
        {
            title: 'Class Image',
            dataIndex: 'classImage',
            key: 'classImage',
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
                    <button>
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
            <CreateClassModal isOpen={isOpen} setIsOpen={setIsOpen} editData={editData} setEditData={setEditData} />
        </div>
    );
};

export default CreateClasses;
