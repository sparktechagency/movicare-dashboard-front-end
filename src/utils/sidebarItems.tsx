import { BiCategory } from 'react-icons/bi';
import { TSidebarItem } from './generateSidebarItems';
import {  AiOutlineQuestionCircle, AiOutlineStar } from 'react-icons/ai';
import { IoBarChartOutline } from 'react-icons/io5';
import { RiUserStarLine } from 'react-icons/ri';
import { BsMegaphone } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { HiOutlineUserGroup } from 'react-icons/hi2';
const sidebarItems: TSidebarItem[] = [
    {
        key: 'analytics',
        label: 'Analytics',
        path: '',
        icon: <IoBarChartOutline size={24} />,
    },
    {
        key: 'users',
        label: 'User Management',
        path: 'users',
        icon: <HiOutlineUserGroup size={24} />,
    },
    {
        key: 'influencer',
        label: 'Influencer',
        path: 'influencer',
        icon: <RiUserStarLine size={24} />,
    },
    {
        key: 'create-class',
        label: 'Create Class',
        path: 'create-class',
        icon: <BiCategory size={24} />,
    },
    {
        key: 'reviews',
        label: 'Reviews',
        path: 'reviews',
        icon: <AiOutlineStar size={24} />,
    },
    {
        key: 'campaign',
        label: 'Campaign',
        path: 'campaign',
        icon: <BsMegaphone size={24} />,
    },
    // {
    //     key: 'add-admin',
    //     label: 'Add Admin',
    //     path: 'make-admin',
    //     icon: <BsPersonGear size={24} />,
    // },
    // {
    //     key: 'terms',
    //     label: 'Terms & Conditions',
    //     path: 'terms',
    //     icon: <AiOutlineFileText size={24} />,
    // },
    // {
    //     key: 'privacy',
    //     label: 'privacy policy',
    //     path: 'privacy',
    //     icon: <AiOutlineFileText size={24} />,
    // },
    {
        key: 'faqs',
        label: 'FAQs',
        path: 'faqs',
        icon: <AiOutlineQuestionCircle size={24} />,
    },
    {
        key: 'logout',
        label: 'Log Out',
        path: 'login',
        icon: <TbLogout size={24} />,
    },
];

export default sidebarItems;
