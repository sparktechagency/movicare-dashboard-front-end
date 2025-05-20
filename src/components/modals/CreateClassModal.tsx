import { Button, Form, Input, InputNumber, Modal, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { PiImageThin } from "react-icons/pi";



type ClassData = {
    id: string;
    className: string;
    classImage: string;
    description: string;
    features: string[];
    price: number;
};

const CreateClassModal = ({
    isOpen,
    setIsOpen,
    editData,
    setEditData
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    editData: ClassData | null;
    setEditData: (data: ClassData | null) => void;
}) => {
    const [form] = Form.useForm();
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (values: any) => {
        console.log("Form Values:", {
            ...values,
            image: imgFile
        });
        setIsOpen(false);
        setEditData(null);
        form.resetFields();
        setImgFile(null);
        setImageUrl(undefined);
    };

    useEffect(() => {
        if (editData) {
            form.setFieldsValue(editData);
            setImageUrl(editData.classImage);
        }
    }, [editData , form , setImageUrl]);

    return (
        <Modal
            title={<p className="text-xl text-primary font-semibold">{editData?.id ? "Edit Class" : "Create Class"}</p>}
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
                        <Form.Item label="Class Name" name="className" rules={[{ required: true }]}>
                            <Input placeholder="Enter Class Name" style={{ height: 42 }} />
                        </Form.Item>

                        <div className="py-[4px] w-full">
                            <p className="text-[14px] font-semibold py-1">Class Image</p>
                            <label htmlFor="image" className="p-3 border border-[#BABABA] rounded-lg bg-white cursor-pointer block">
                                <div className="flex justify-center items-center w-full h-[250px] ">
                                    {imageUrl ? (
                                        <img src={imageUrl} style={{ height: "240px", width: "240px", borderRadius: 10, objectFit: "contain" }} alt="class" />
                                    ) : (
                                        <PiImageThin className="text-8xl text-[#666666]" />
                                    )}
                                </div>
                            </label> 
                            <div className="hidden">
     <input id="image" type="file" accept="image/*" onChange={handleChange} className=" hidden" />
                            </div>
                       
                        </div>
                    </div>

                    <div>
                        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                            <Input.TextArea rows={3} placeholder="Enter class description" />
                        </Form.Item>

                        <Form.Item label="Price ($)" name="price" rules={[{ required: true, type: "number", min: 0 }]}>
                            <InputNumber placeholder="Enter price" style={{ width: "100%", height: 42 }} />
                        </Form.Item>

                        <Form.List name="features">
                            {(fields, { add, remove }) => (
                                <>
                                    <label className="block text-sm font-medium mb-1">Features</label>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} align="baseline" style={{ display: 'flex', marginBottom: 8, width: '100%' }}>
                                            <Form.Item
                                                {...restField}
                                                name={name}
                                                rules={[{ required: true, message: 'Feature is required' }]}
                                                style={{ flex: 1 }}
                                            >
                                                <Input placeholder="Enter feature" style={{ height: 40, width: "350px" }} />
                                            </Form.Item>
                                            <AiOutlineMinusCircle className="text-red-500 cursor-pointer" onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed"  onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Feature
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>
                </div>

                <Form.Item>
                    <div className="flex justify-center w-full mt-5">
                        <Button type="primary" htmlType="submit" style={{ height: 40 }}>
                            {editData ? "Update Class" : "Create Class"}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateClassModal;
