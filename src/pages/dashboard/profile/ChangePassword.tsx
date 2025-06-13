import { Form, Input } from 'antd';
import { useChangePasswordMutation } from '../../../redux/apiSlices/authSlice';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const ChangePassword = () => {
    const [form] = Form.useForm();
    const [changePassword , {data , isError , isLoading , isSuccess , error }] = useChangePasswordMutation() 
 
    useEffect(() => {
        if (isSuccess) { 
          if (data) {
            Swal.fire({
              text: data?.message ,
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            }).then(() => { 
              window.location.reload(); 
            });
          }
        }
        if (isError) {
          Swal.fire({ 
            //@ts-ignore
            text: error?.data?.message,  
            icon: "error",
          });
        }
      }, [isSuccess, isError, error, data])   


    const handleChangePassword = async(values:{currentPassword:string , newPassword:string}) => {
        await changePassword(values)
    };   
    return (
  <div className="px-6 lg:px-12 mt-8">
            <Form
                form={form}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={handleChangePassword}
                className="w-full lg:w-1/2"
            >
                  <Form.Item
                    label={
                        <label  className="block text-primaryText mb-1 text-lg">
                            Current Password
                        </label>
                    }
                    name="currentPassword"
                    rules={[{ required: true, message: 'Please input Current password!' }]}
                >
                    <Input.Password  className=" h-12 px-6" />
                </Form.Item>
                <Form.Item
                    label={
                        <label className="block text-primaryText mb-1 text-lg">
                            New Password
                        </label>
                    }
                    name="newPassword"
                    dependencies={['currentPassword']}
                    rules={[
                      {
                        required: true, 
                        message: "Please input your New password!",
                      }, 
                      {
                        min: 8,
                        message: "Password must be at least 8 characters long!",
                    },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('currentPassword') === value) {
                            return Promise.reject(new Error('The New password is similar to the current Password'));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                >
                    <Input.Password  className="h-12 px-6" />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="block text-primaryText mb-1 text-lg">
                            Confirm Password
                        </label>
                    }
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                      {
                        required: true, 
                        message: "Please input your Confirm password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                      }),
                    ]}
                >
                    <Input.Password  className="h-12 px-6" />
                </Form.Item>

                <Form.Item className="flex  justify-end">
                    <button
                        type="submit"
                        className="bg-primary text-white w-36 h-11 rounded-lg"
                    >
                     {isLoading ? "Loading..." : "Save"}   
                    </button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;
