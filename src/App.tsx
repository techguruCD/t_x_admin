import { Routes, Route } from "react-router-dom";
import "./styles/GlobalStyles.scss";
import Signup from "./pages/auth/signup";
import VerifyEmail from "./pages/auth/verify-email";
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import Dashboard from "./pages/dashboard";

// import ResetPassword from "./pages/auth/reset-password";
// import ForgotPassword from "./pages/auth/forgot-password";
// import Layout from "./components/Layout";
// import Spinner from "./components/Spinner";
// import ErrorPage from "./pages/error";
// import EmailVerify from "./pages/auth/verify-email";
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthenticatedRoutes from "./components/AuthenticatedRoute";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthenticatedRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verifyemail" element={<VerifyEmail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/resetpassword" element={<ResetPassword />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;