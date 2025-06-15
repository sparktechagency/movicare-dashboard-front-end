import { Button, Flex, Pagination, Table } from 'antd';
import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';
import CreateWhyChooseModal from '../../components/modals/CreateWhyChooseModal';
import { useDeleteWhyChooseMutation, useGetWhyChooseQuery } from '../../redux/apiSlices/whyChooseSlice';
import { imageUrl } from '../../redux/api/baseApi';
import Swal from 'sweetalert2';

type contentType = {
  id: string;
  title: string;
  image: string;
  description: string;
};


const WhyChoose = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<contentType | null>(null); 
  const [page  , setPage] = useState(1)
  const { data: allWhyChoose, refetch } = useGetWhyChooseQuery({});
  const [deleteWhyChoose] = useDeleteWhyChooseMutation();
  console.log(allWhyChoose);

  const contentData = allWhyChoose?.data?.map((item: { _id: string, title: string, image: string, description: string }, index: number) => ({
    key: index + 1,
    id: item?._id,
    title: item?.title,
    image: item?.image?.startsWith('http') ? item?.image : `${imageUrl}${item?.image}`,
    description: item?.description
  }));

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
        await deleteWhyChoose(id).then((res) => {
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


  const columns = [
    {
      title: 'S.No',
      dataIndex: 'key',
      key: 'key',
      width: "100px"
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: "370px"
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="class" style={{ height: 30, objectFit: "cover" }} />,
      width: "150px"
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      width: "150px",
      render: (_: any, record: any, index: number) => (
        <div key={index} className="flex items-center gap-3">
          <button onClick={() => { setIsOpen(true); setEditData(record) }}>
            <AiOutlineEdit className="text-xl text-primary" />
          </button>
          <button onClick={() => handleDelete(record?.id)}>
            <IoTrashOutline className="text-xl text-red-500" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Flex className="my-2" vertical={false} gap={10} align="center" justify="space-between">
        <div>
          <h1 className="text-2xl text-primary font-semibold">Manage Classes</h1>
        </div>

        <div
          style={{
            marginBottom: 10,
          }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            style={{
              height: 40,
            }}
            type="primary"
          >
            Create new Content
          </Button>
        </div>
      </Flex>

      <div>
        <Table columns={columns} dataSource={contentData} pagination={false} /> 
        {
          allWhyChoose?.data?.length >= 10 && <Pagination current={page} onChange={(page) => setPage(page)} total={allWhyChoose?.pagination?.total} />
        }
      </div>
      <CreateWhyChooseModal isOpen={isOpen} setIsOpen={setIsOpen} editData={editData} setEditData={setEditData} refetch={refetch} />
    </div>
  );
};

export default WhyChoose;
