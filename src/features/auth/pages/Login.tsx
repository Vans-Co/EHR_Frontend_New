import AuthLayout from "@/components/common/AuthLayout";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to access your Electronic Health Records platform."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;