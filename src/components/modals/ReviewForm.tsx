import { Input} from 'antd';
const ReviewForm = ({reviewData}:{reviewData:any}) => {

 
    return (
        <div className="p-4 w-full">
            {/* User Name Field */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                <Input value={reviewData?.userName} readOnly className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            {/* Email Field */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                    value={reviewData?.email}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Date and Time Fields */}
            <div className=" mb-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <Input
                    value={reviewData?.date}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>

            </div>

            {/* Review Field */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <Input.TextArea
                    value={reviewData?.Comment}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                />
            </div>

           
        </div>
    );
};

export default ReviewForm;
