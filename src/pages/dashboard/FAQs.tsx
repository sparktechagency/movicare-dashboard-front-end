import { useState } from 'react';
import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';
import { Button, ConfigProvider, Flex, Pagination } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDeleteFaqMutation, useGetFaqQuery } from '../../redux/apiSlices/faqSlice';
import AddFaqForm from '../../components/modals/AddFaqForm';


const FAQ = () => {
    const [openAddModel, setOpenAddModel] = useState(false);
    const [modalData, setModalData] = useState<{ id: string; answer: string; question: string } | null>(null);
    const { data: faqs, refetch } = useGetFaqQuery(undefined)
    const [deleteFaq] = useDeleteFaqMutation()


    const faqInfo = faqs?.data?.map((value: { _id: string; description: string; title: string; }) => ({
        id: value?._id,
        answer: value?.description,
        question: value?.title

    }))

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteFaq(id).then((res) => {
                    if (res?.data?.success) {
                        Swal.fire({
                            text: res?.data?.message,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
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

                })
            }
        });
    };



    return (
        <div className="">
            <Flex vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-2xl text-primary font-semibold">FAQs</h1>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        icon={<AiOutlinePlus />}
                        onClick={() => setOpenAddModel(true)}
                        htmlType="submit"
                        style={{
                            height: 40,
                        }}
                        type="primary"
                    >
                        Add FAQ
                    </Button>
                </div>
            </Flex>

            <div className="mt-5 pb-6 px-4 rounded-md">
                {faqInfo?.map((item: { id: string, answer: string, question: string }, index: number) => (
                    <div key={index} className="flex justify-between items-start gap-4 py-4 px-4 rounded-lg bg-white mb-3">
                        <GoQuestion color="#286a25" size={25} className="mt-3" />
                        <div className="flex-1">
                            <p className="text-base font-medium rounded-xl py-2 px-4 flex items-center gap-8">
                                <span className="flex-1">{item?.question}</span>
                            </p>
                            <div className=" rounded-xl py-2 px-4 mt-4">
                                <p className="text-[#919191] leading-6">{item?.answer}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-4">
                            <CiEdit
                                onClick={() => {
                                    setOpenAddModel(true);
                                    setModalData(item);
                                }}
                                className="text-2xl cursor-pointer text-[#286a25]"
                            />
                            <RxCross2
                                onClick={() => handleDelete(item?.id)}
                                className="text-2xl cursor-pointer text-red-600"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <AddFaqForm
                setOpenAddModel={setOpenAddModel}
                openAddModel={openAddModel}
                modalData={modalData}
                setModalData={setModalData}
                refetch={refetch}

            />

            <div>
                <ConfigProvider
                    theme={{
                        components: {
                            Pagination: {
                                itemActiveBg: "#00809E"
                            },
                        },
                        token: {
                            borderRadius: 100,
                            colorText: "#fffff"

                        },
                    }}
                >

                </ConfigProvider>
            </div>
        </div>
    );
};

export default FAQ;