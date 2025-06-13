import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAddFaqMutation, useUpdateFaqMutation } from "../../redux/apiSlices/faqSlice";



const AddFaqForm = ({ setModalData, modalData, openAddModel, setOpenAddModel, refetch }: { setModalData: any, modalData: any, openAddModel: any, setOpenAddModel: any, refetch: any }) => {
    const [form] = Form.useForm()
    const [addFaq] = useAddFaqMutation()
    const [updateFaq] = useUpdateFaqMutation()

    useEffect(() => {
        if (modalData) {
            form.setFieldsValue({ title: modalData?.question, description: modalData?.answer })
        }
    }, [modalData])

    const onFinish = async (values: { title: string, description: string }) => {
        const data = {
            id: modalData?.id,
          ...values
        }


        if (modalData?.id) {
            await updateFaq(data).then((res) => { 
                  console.log(res);
                if (res?.data?.success) {
                    Swal.fire({
                        text: res?.data?.message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        refetch();
                        setModalData(null)
                        form.resetFields()
                        setOpenAddModel(false);
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
        } else {
            await addFaq(values).then((res) => { 
              
                if (res?.data?.success) {
                    Swal.fire({
                        text: res?.data?.message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        refetch();
                        setOpenAddModel(false);
                        setModalData(null)
                        form.resetFields()
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
        }
    }

    return (
        <Modal
            centered
            open={openAddModel}
            onCancel={() => {
                setOpenAddModel(false)
                setModalData(null)
                form.resetFields()
            }}
            width={500}
            footer={false}
        >
            <div className="">
                <h1
                    className=" text-[20px] font-medium"
                    style={{ marginBottom: "12px" }}
                >
                    {modalData ? "Update FAQ" : "Add FAQ"}
                </h1>
                <Form onFinish={onFinish} form={form} layout="vertical">
                    <Form.Item name="title" style={{ marginBottom: "16px" }} label={<p style={{ display: "block" }}>
                        Question
                    </p>}>

                        <Input
                            type="Text"
                            placeholder="Enter Question"
                            style={{
                                border: "1px solid #E0E4EC",
                                padding: "10px",
                                height: "52px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                                width: "100%",
                            }}

                        />
                    </Form.Item>
                    <Form.Item name="description" style={{ marginBottom: "16px" }} label={<p style={{ display: "block" }}>
                        Answer
                    </p>}>

                        <Input.TextArea
                            placeholder="Enter answer"
                            style={{
                                border: "1px solid #E0E4EC",
                                padding: "10px",
                                height: "152px",
                                background: "white",
                                borderRadius: "8px",
                                outline: "none",
                                width: "100%",
                                resize: "none",
                            }}
                        />
                    </Form.Item>
                    <Form.Item className=" text-end">
                        <button type="submit" className="bg-primary text-white w-[120px] h-[42px] rounded-lg">
                            Submit
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default AddFaqForm;