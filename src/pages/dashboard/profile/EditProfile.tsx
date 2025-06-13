import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UserContext } from '../../../provider/User';
import { imageUrl } from '../../../redux/api/baseApi';
import { errorType } from '../../authentication/Login';
import { useUpdateProfileMutation } from '../../../redux/apiSlices/authSlice';
import { AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';


const EditProfile: React.FC = () => {
    const user = useContext(UserContext);
    const [profileForm] = Form.useForm();
    const [imgURL, setImgURL] = useState("");
    const [imgFile, setImageFile] = useState<File | null>(null);
    const [updateProfile, { isLoading, isSuccess, isError, error, data }] = useUpdateProfileMutation();


    useEffect(() => {
        if (user) {
            profileForm.setFieldsValue({
                name: user?.name,
                email: user?.email,
            });
            setImgURL(user?.image?.startsWith("http") ? user?.image : `${imageUrl}${user?.image}`)
        }
    }, [profileForm, user]);

    useEffect(() => {
        if (isSuccess) {
            if (data) {
                Swal.fire({
                    text: data?.message,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload();
                })
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
    }, [isSuccess, isError, error, data]);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setImgURL(imgUrl);
            setImageFile(file)
        }
    };

    const onProfileFinish = async (values: { name: string, email: string, contact: string }) => {
        const formData = new FormData();

        if (imgFile) {
            formData.append("image", imgFile);
        }
        formData.append("name", values?.name);
        formData.append("email", values?.email);
        formData.append("contact", values?.contact);

        await updateProfile(formData).unwrap()
    }



    return (
        <div className="max-w-lg mx-auto">
            <Form name="update_profile" layout="vertical" initialValues={{ remember: true }} onFinish={onProfileFinish} form={profileForm}>
                {/* Banner Image */}
                <div className="flex justify-center">
                    <div className="flex  py-3"> 
                        <div className='hidden'> 
                        <input
                            onChange={onChange}
                            type="file"
                            id="img"
                            className="hidden "
                        />
                        </div>
                        <label
                            htmlFor="img"
                            className="relative w-[120px] h-[120px] cursor-pointer rounded-full  bg-white bg-cover bg-center"
                            style={{ backgroundImage: `url(${imgURL})` }}
                        >
                            <div
                                className="absolute bottom-1 -right-1 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                            >
                                <AiOutlineEdit size={20} className="text-primary" />
                            </div>
                        </label>
                    </div>
                </div>

                <Form.Item
                    label={
                        <label htmlFor="name" className="block text-primaryText mb-1 text-lg">
                            Full Name
                        </label>
                    }
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input className="h-12" placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                            Email
                        </label>
                    }
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input className="h-12" placeholder="Enter your email" readOnly />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button
                        style={{
                            height: 42,
                        }}
                        type="primary"
                        htmlType="submit"
                    >
                        {isLoading ? "Updating..." : "Update Profile"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProfile;
