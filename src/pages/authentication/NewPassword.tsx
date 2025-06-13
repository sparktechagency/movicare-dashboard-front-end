import { ConfigProvider, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useResetPasswordMutation } from '../../redux/apiSlices/authSlice';
import { errorType } from './Login';

const NewPassword = () => {
    const navigate = useNavigate(); 
    const [resetPassword, { isError, isLoading, isSuccess, error, data }] = useResetPasswordMutation()

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
                    navigate("/login")
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
                text: errorMessage,
                icon: "error",
            });
        }
    }, [isSuccess, isError, error, data, navigate]);


    const onFinish = async (values: { password: string, confirmPassword: string }) => {
        await resetPassword(values)
    }

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
                    <div className="text-primaryText max-w-md mx-auto space-y-3 text-center mb-5">
                        <h1 className="text-3xl  font-medium text-center mt-2">Set a new password</h1>
                        <p>Create a new password. Ensure it differs from previous ones for security</p>
                    </div>

                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                    >

                        <Form.Item
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your new Password!",
                                },
                            ]}
                            style={{ marginBottom: 0 }}
                        >
                            <Input.Password
                                type="password"
                                placeholder="Enter New password"
                                style={{
                                    border: "1px solid #E0E4EC",
                                    height: "52px",
                                    background: "white",
                                    borderRadius: "8px",
                                    outline: "none",
                                }}
                                className="mb-6"
                            />
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name="confirmPassword"
                            dependencies={["newPassword"]}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("newPassword") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("The new password that you entered do not match!")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                type="password"
                                placeholder="Enter Confirm password"
                                style={{
                                    border: "1px solid #E0E4EC",
                                    height: "52px",
                                    background: "white",
                                    borderRadius: "8px",
                                    outline: "none",
                                }}
                                className="mb-6"
                            />
                        </Form.Item>


                        <Form.Item>
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    height: 45,
                                    color: "white",
                                    fontWeight: "400px",
                                    fontSize: "18px",
                                    marginTop: 10
                                }}
                                className="flex items-center justify-center bg-primary rounded-full"
                            >
                                {isLoading ? "Updating..." : "Update Password"}
                            </button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
