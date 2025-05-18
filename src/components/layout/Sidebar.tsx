import { ConfigProvider, Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const Sidebar = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    // colorPrimary: '#286a25',
                    // colorBgContainer: '#286a25',
                    colorText: '#414446',
                },
                components: {
                    Menu: {
                        // itemBg: '#286a25',
                        itemActiveBg: '#286a25',
                        itemSelectedColor: '#fff',
                        itemBorderRadius: '10px 10px 10px 10px' as any,
                        itemHeight: 45,

                        itemSelectedBg: '#286a25',
                        // colorItemBgActive: '#286a25',
                        // colorPrimaryActive: '#286a25',
                        // colorBgBase: '#286a25',
                    },
                },
            }}
        >
            <Sider
                width={250}
                theme="light"
                breakpoint="lg"
                collapsedWidth="0"

                // onBreakpoint={(broken) => {
                //   // console.log(broken);
                // }}
                // onCollapse={(collapsed, type) => {
                //   console.log(collapsed, type);
                // }}
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
                    style={
                        {
                            // color: '#286a25',
                            // width: 250,
                        }
                    }
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['analytics']}
                    items={sidebarItemsGenerator(sidebarItems)}
                />
            </Sider>
        </ConfigProvider>
    );
};

export default Sidebar;
