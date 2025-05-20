import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/dashboard/dashboard/Dashboard';
import MakeAdmin from '../pages/dashboard/MakeAdmin';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import Review from '../pages/dashboard/Review';
import TermsCondition from '../pages/dashboard/TermsCondition';
import FAQs from '../pages/dashboard/FAQs';
import Notification from '../pages/dashboard/Notification';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Profile from '../pages/dashboard/profile/Profile';
import Privacy from '../pages/dashboard/Privacy';
import Users from '../pages/dashboard/Users';
import CreateClasses from '../pages/dashboard/CreateClasses';
import Services from '../pages/dashboard/Services';
import BookingHistory from '../pages/dashboard/BookingHistory';
import Transactions from '../pages/dashboard/Transactions';
import Companies from '../pages/dashboard/Companies';
import WhyChoose from '../pages/dashboard/WhyChoose';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'users', element: <Users /> },
            { path: 'booking-history', element: <BookingHistory /> },
            { path: 'services', element: <Services /> },
            { path: 'create-class', element: <CreateClasses /> },
            { path: 'reviews', element: <Review /> }, 
            { path: 'companies', element: <Companies /> },
            { path: 'why-choose', element: <WhyChoose /> },
            { path: 'transactions', element: <Transactions /> },
            { path: 'make-admin', element: <MakeAdmin /> },
            { path: 'terms', element: <TermsCondition /> },
            { path: 'privacy', element: <Privacy /> },
            { path: 'faqs', element: <FAQs /> },
            { path: 'notification', element: <Notification /> },
            { path: 'profile', element: <Profile /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
