import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/login.schema";
import { FiMail, FiLock } from "react-icons/fi";
import { useEffect, useState } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Form Data:", data);
  };

  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-[url('/assets/login-bg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center`}>
      <div
        className={`
        bg-white rounded-xl w-full max-w-5xl min-h-150 m-4 shadow-xl flex overflow-hidden
        transition-all duration-1500 ease-in-out
        ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-95"}
      `}
      >
        <div className="flex-1 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <img src="/assets/logo.png" width={60} height={60} alt="" />
            <span className="text-4xl font-bold">
              {import.meta.env.VITE_APP_NAME}
            </span>
          </div>
          <div className="mt-6">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-black">Welcome Back</h3>
              <h5 className="text-lg font-semibold text-gray-500 mb-4">
                Login to your account
              </h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                      errors.email
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-400"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                      errors.password
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-400"
                    }`}
                  />
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#27B6C0] text-white py-2 rounded-lg font-semibold hover:bg-[#9ad9e4] transition duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <img
            src="/assets/login-fg.png"
            alt="Login Illustration"
            className="max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
