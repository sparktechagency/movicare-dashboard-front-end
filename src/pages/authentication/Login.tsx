import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setToLocalStorage } from '../../utils/local-stroage';
import { useEffect } from 'react';
import { useLoginMutation } from '../../redux/apiSlices/authSlice';

export type errorType = {
    data: {
        errorMessages: { message: string }[];
        message: string;
    };
};

const Login = () => {
    const [login, { isSuccess, isError, data, error, isLoading }] = useLoginMutation()

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                Swal.fire({
                    title: "Login Successful",
                    text: "Welcome to Admin Dashboard",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {                
                    setToLocalStorage("accessToken", data?.data?.createToken);
                    navigate("/");
                    window.location.reload();
                });
            }

        }
        if (isError) {
            const errorMessage =
                (error as errorType)?.data?.errorMessages
                    ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
                    : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
            Swal.fire({
                title: "Failed to Login",
                text: errorMessage,
                icon: "error",
            });
        }
    }, [isSuccess, isError, error, data, navigate]);


    const onFinish = async (values: { email: string, password: string }) => {
        await login(values)
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#286a25',

                    colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 10,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div className="flex items-center justify-center h-screen" style={{
                backgroundImage: `url('/auth.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                objectFit: 'cover',
            }}>
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10 ">
                    <div className="text-primaryText space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Login to Account</h1>
                        <p className="text-lg">Please enter your email and password to continue</p>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder="Enter your email address" type="email" className=" h-12  px-6 " />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Password
                                </label>
                            }
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" className=" h-12  px-6" />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-4">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="text-primaryText text-lg">Remember me</Checkbox>
                            </Form.Item>
                            <Link to="/forget-password" className="text-primary text-md hover:text-primary">
                                Forget password
                            </Link>
                        </div>

                        <Form.Item>
                            <Button
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                }}
                            // onClick={() => navigate('/')}
                            >
                                {isLoading ? "Loading..." : "Sign In"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;
