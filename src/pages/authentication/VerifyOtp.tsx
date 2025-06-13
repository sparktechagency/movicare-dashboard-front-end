import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/local-stroage';
import { useForgetPasswordMutation, useOtpVerifyMutation } from '../../redux/apiSlices/authSlice';

const VerifyOtp = () => {
    const navigate = useNavigate();
  const email = getFromLocalStorage("email")
  const userEmail = JSON.parse(email ? email : "")
  const [forgetPassword] = useForgetPasswordMutation()
  const [otpVerify, { isLoading }] = useOtpVerifyMutation()



  const handleResendEmail = async () => {
    const value = {
      email: userEmail
    }
    await forgetPassword(value).then((res) => {
      if (res?.data?.success) {
        Swal.fire({
          text: res?.data?.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        })
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

  };

  const onFinish = async (values:{otp:string}) => {

    const data = {
      email: userEmail,
      oneTimeCode: parseInt(values?.otp)
    }

    await otpVerify(data).then((res) => {

      if (res?.data?.success) {
        Swal.fire({
          text: res?.data?.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => { 
          navigate("/new-password") 
          setToLocalStorage("resetToken", res?.data?.data);
          window.location.reload();
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
  };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        // lineHeight: 3,
                        controlHeight: 50,

                        borderRadius: 10,
                    },
                },
                token: {
                    colorPrimary: '#286a25',
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
                        <h1 className="text-3xl  font-medium text-center mt-2">Check your email</h1>
                        <p>
                            We sent a reset link to {userEmail} enter 4 digit code that mentioned in the email
                        </p>
                    </div>

                    <Form
                        name="normal_VerifyOtp"
                        className="my-5"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="flex items-center justify-center mx-auto"
                            name="otp"
                            rules={[{ required: true, message: 'Please input otp code here!' }]}
                        >
                            <Input.OTP
                                style={{
                                    width: 300,
                                }}
                                className=""
                                variant="filled"
                                length={4}
                            />
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
                                // onClick={() => navigate('/')}
                            >
                          {isLoading ? "Verifying..." : "Verify OTP Code"}      
                            </Button>
                        </Form.Item>
                        <div className="text-center text-lg flex items-center justify-center gap-2">
                            <p className="text-primaryText">Didn't receive the code?</p>
                            <p className="text-primary cursor-pointer" onClick={handleResendEmail}>Resend code</p>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
