import { Button, ConfigProvider, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useForgetPasswordMutation } from '../../redux/apiSlices/authSlice';
import { errorType } from './Login';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | undefined>()
    const [forgetPassword, { isLoading, isError, error, data, isSuccess }] = useForgetPasswordMutation()


    useEffect(() => {
        if (isSuccess) {

            if (data) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: data?.message,
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    localStorage.setItem("email", JSON.stringify(email))
                    navigate('/verify-otp')
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
                //@ts-ignore
                text: errorMessage,
                icon: "error",
            });
        }
    }, [isSuccess, isError, error, data, navigate]);


    const onFinish = async (values: { email: string }) => {

        setEmail(values?.email)
        await forgetPassword(values)
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
            <div className="flex  items-center justify-center h-screen" style={{
                backgroundImage: `url('/auth.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                objectFit: 'cover',
            }}>
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10 ">
                    <div className="text-primaryText space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Forget Password</h1>
                    </div>

                    <Form
                        name="normal_ForgetPassword"
                        className="ForgetPassword-form"
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
                            <Input placeholder="Enter your email address" type="email" className="h-12" />
                        </Form.Item>

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
                            >
                            {isLoading ? 'Loading...' : 'Send Code'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
