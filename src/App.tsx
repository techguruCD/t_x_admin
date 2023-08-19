import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/GlobalStyles.scss";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
// import ResetPassword from "./pages/auth/reset-password";
// import ForgotPassword from "./pages/auth/forgot-password";
// import Layout from "./components/Layout";
// import Spinner from "./components/Spinner";
// import ErrorPage from "./pages/error";
// import EmailVerify from "./pages/auth/verify-email";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                {/* <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
        </QueryClientProvider>
    );
}

export default App;