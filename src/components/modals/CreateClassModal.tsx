import { Button, Form, Input, InputNumber, Modal, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useEffect } from "react";
import { useCreateProviderMutation, useUpdateProviderMutation } from "../../redux/apiSlices/classSlice";
import Swal from "sweetalert2";



type ClassData = {
    id: string;
    name: string;
    image: string;
    description: string;
    facilities: string[];
    price: number;
};

const CreateClassModal = ({
    isOpen,
    setIsOpen,
    editData,
    setEditData,
    refetch
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    editData: ClassData | null;
    setEditData: (data: ClassData | null) => void;
    refetch: () => void
}) => {
    const [form] = Form.useForm();
    const [createProvider] = useCreateProviderMutation();
    const [updateProvider] = useUpdateProviderMutation();
    // const [imgFile, setImgFile] = useState<File | null>(null);
    // const [imageUrl, setImageUrl] = useState<string | undefined>();

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setImgFile(file);
    //         setImageUrl(URL.createObjectURL(file));
    //     }
    // };

    const handleSubmit = async (values: any) => {
        console.log("Form Values:", {
            ...values,
        });
        setIsOpen(false);
        setEditData(null);
        form.resetFields();
        // setImgFile(null);
        // setImageUrl(undefined); 

        if (editData?.id) {
            await updateProvider({ id: editData?.id, value: values }).then(
                (res) => {
                    console.log("edit response", res);
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
            await createProvider(values).then((res) => {
                console.log("add response", res);
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
    };

    useEffect(() => {
        if (editData) {
            form.setFieldsValue(editData);
            // setImageUrl(editData.image); 
        }
    }, [editData, form]);

    return (
        <Modal
            title={<p className="text-xl text-primary font-semibold">{editData?.id ? "Edit Class" : "Create Class"}</p>}
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
                setEditData(null);
                form.resetFields();
                // setImgFile(null);
                // setImageUrl(undefined);
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
                <div className="grid grid-cols-1 gap-4 mt-5">
                    <div>
                        <Form.Item label="Class Name" name="name" rules={[{ required: true }]}>
                            <Input placeholder="Enter Class Name" style={{ height: 42 }} />
                        </Form.Item>

                        {/* <div className="py-[4px] w-full">
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

                        </div> */}

                        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                            <Input.TextArea rows={4} placeholder="Enter class description" />
                        </Form.Item>

                        <Form.Item label="Price ($)" name="price" rules={[{ required: true, type: "number", min: 0 }]}>
                            <InputNumber placeholder="Enter price" style={{ width: "100%", height: 42 }} />
                        </Form.Item>

                        <Form.List name="facilities">
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
                                                <Input placeholder="Enter feature" style={{ height: 45, width: "350px" }} />
                                            </Form.Item>
                                            <AiOutlineMinusCircle className="text-red-500 cursor-pointer" onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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
