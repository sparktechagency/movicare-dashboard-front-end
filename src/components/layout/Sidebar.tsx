import { ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import { TSidebarItem } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const { Sider } = Layout;

const Sidebar = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    }

    const sidebarItemsGenerator = (items: TSidebarItem[]): MenuProps['items'] => {
        return items.map((item) => {
            if (item.children) {
                return {
                    key: item.key,
                    icon: item.icon,
                    label: item.label,
                    children: item.children.map((child) => {
                        if (child.key === 'logout') {
                            return {
                                key: 'logout',
                                icon: child.icon,
                                label: (
                                    <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                        {child.label}
                                    </div>
                                ),
                            };
                        }

                        return {
                            key: `/${child.path}`,
                            icon: child.icon,
                            label: <Link to={`/${child.path}`}>{child.label}</Link>,
                        };
                    }),
                };
            }

            if (item.key === 'logout') {
                return {
                    key: 'logout',
                    icon: item.icon,
                    label: (
                        <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            {item.label}
                        </div>
                    ),
                };
            }

            return {
                key: `/${item.path}`,
                icon: item.icon,
                label: <Link to={`/${item.path}`}>{item.label}</Link>,
            };
        });
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: '#414446',
                },
                components: {
                    Menu: {
                        itemActiveBg: '#286a25',
                        itemSelectedColor: '#fff',
                        itemBorderRadius: '10px 10px 10px 10px' as any,
                        itemHeight: 45,
                        itemMarginBlock: 12,
                        itemSelectedBg: '#286a25',
                    },
                },
            }}
        >
            <Sider
                width={250}
                theme="light"
                breakpoint="lg"
                collapsedWidth="0"
            >
                {/* logo of the website */}
                <Link to="/">
                    <div
                        style={{
                            margin: '0 20px',
                            padding: '20px 0',
                        }}
                        className=' flex items-center justify-center'
                    >
                        <img src="/logo.png" alt="" className=' w-[100px] h-[100px] ' />
                    </div>
                </Link>

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    openKeys={openKeys}
                    onOpenChange={handleOpenChange}
                    items={sidebarItemsGenerator(sidebarItems)}
                />
            </Sider>
        </ConfigProvider>
    );
};

export default Sidebar;
