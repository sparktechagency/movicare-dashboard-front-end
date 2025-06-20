import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import { PiImageThin } from "react-icons/pi";
import { useCreateServiceMutation, useUpdateServiceMutation } from "../../redux/apiSlices/servicesSlice";
import Swal from "sweetalert2";

type Service = {
    id: number;
    name: string;
    description: string;
    image: string;
    status: "active" | "deleted";
    adults_price: number;
    kids_price: number;
    service_price?: number;
    price_per_km?: number;
    price_per_hour?: number;
    taxs?: number;
    fixed_price?: number;
};

const AddServicesModal = ({
    isOpen,
    setIsOpen,
    editData,
    setEditData , 
    refetch
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    editData: Service | null;
    setEditData: (data: Service | null) => void; 
    refetch: () => void
}) => {
    const [form] = Form.useForm();
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>();
    const [createService] = useCreateServiceMutation();
    const [updateService] = useUpdateServiceMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (values: any) => {
        const formData = new FormData();

        if (imgFile) {
            formData.append("image", imgFile);
        }

        Object.entries(values).forEach(([key, value]: [string, any]) => {
            formData.append(key, value as any);
        });

        if (editData?.id) {
            await updateService({ id: editData?.id, value: formData }).then(
                (res) => { 
                    if (res?.data?.success) {
                        Swal.fire({
                            text: res?.data?.message,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            setIsOpen(false);
                            setEditData(null);
                            form.resetFields();
                            setImageUrl(null);
                            refetch();

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
                }
            );
        } else {
            await createService(formData).then((res) => {
                if (res?.data?.success) {
                    Swal.fire({
                        text: res?.data?.message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        refetch();
                        setIsOpen(false);
                        setEditData(null);
                        form.resetFields();
                        setImgFile(null);
                        setImageUrl(undefined);
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
            });

        };
    }

    useEffect(() => {
        if (editData) {
            form.setFieldsValue(editData);
            setImageUrl(editData.image);
        }
    }, [editData, form, setImageUrl]);

    return (
        <Modal
            title={<p className="text-xl text-primary font-semibold">{editData?.id ? "Edit Service" : "Create Service"}</p>}
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
                setEditData(null);
                form.resetFields();
                setImgFile(null);
                setImageUrl(undefined);
            }}
            footer={null}
            width="800px"
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ color: "#767676" }}
            >
                <div className="grid grid-cols-2 gap-4 mt-5">
                    <div>
                        <Form.Item label="Service Name" name="name" rules={[{ required: true }]}>
                            <Input placeholder="Select Service Name" style={{ height: 42 }} />
                        </Form.Item>


                        <div className="mb-4 w-full">
                            <p className="text-[14px] font-semibold py-1">Service Image</p>
                            <label htmlFor="image" className="p-1 border border-[#BABABA] rounded-lg bg-white cursor-pointer block">
                                <div className="flex justify-center items-center w-full h-[210px] ">
                                    {imageUrl ? (
                                        <img src={imageUrl} style={{ height: "200px", width: "230px", borderRadius: 10, objectFit: "contain" }} alt="class" />
                                    ) : (
                                        <PiImageThin className="text-8xl text-[#666666]" />
                                    )}
                                </div>
                            </label>
                            <div className="hidden">
                                <input id="image" type="file" accept="image/*" onChange={handleChange} className=" hidden" />
                            </div>
                        </div>

                        <Form.Item label="Adult Price ($)" name="adults_price" rules={[{ required: true }]}>
                            <InputNumber placeholder="Enter adult price" style={{ width: "100%", height: 42 }} />
                        </Form.Item>
                        <Form.Item label="Fixed Price ($)" name="fixed_price" rules={[{ required: true }]}>
                            <InputNumber placeholder="Enter fixed price" style={{ width: "100%", height: 42 }} />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item label="Kids Price ($)" name="kids_price" rules={[{ required: true }]}>
                            <InputNumber placeholder="Enter kids price" style={{ width: "100%", height: 42 }} />
                        </Form.Item>
                        <Form.Item label="Service Price ($)" name="service_price" rules={[{ required: true }]}>
                            <InputNumber placeholder="Enter service price" style={{ width: "100%", height: 42 }} />
                        </Form.Item>

                        <Form.Item label="Price per KM ($)" name="price_per_km" rules={[{ required: true }]}>
                            <InputNumber placeholder="Enter price per km" style={{ width: "100%", height: 42 }} />
                        </Form.Item>

                        <Form.Item label="Price per Hour ($)" name="price_per_hour" rules={[{ required: true }]}>
                            <InputNumber placeholder="Enter price per hour" style={{ width: "100%", height: 43 }} />
                        </Form.Item>

                        <Form.Item label="Tax (%)" name="taxs" rules={[{ required: true }]}>
                            <InputNumber placeholder="Enter tax percentage" style={{ width: "100%", height: 43 }} />
                        </Form.Item>

                        <Form.Item label="Button Text" name="button_text" rules={[{ required: true }]}>
                            <Input placeholder="Enter Button Text" style={{ width: "100%", height: 43 }} />
                        </Form.Item>

                    </div>
                </div>

                <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} placeholder="Enter class description" />
                </Form.Item>

                <Form.Item>
                    <div className="flex justify-center w-full mt-4">
                        <Button type="primary" htmlType="submit" style={{ height: 40 }}>
                            {editData ? "Update Service" : "Create Service"}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddServicesModal;
