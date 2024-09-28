import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { LoginData } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const loginRef = useRef<HTMLDivElement>(null);
  const { handleLogin } = useAuth();
  const navigate = useNavigate({ from: "/authentication/login" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate({ to: "/" });
    }
    document.title = "Login - E-commerce";
    if (loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [navigate]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const { mutate, status } = useMutation({
    mutationFn: ({ email, password }: LoginData) =>
      handleLogin(email, password),
    onSuccess: () => {
      alert("Login successful");
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("Error:", error);
      alert(error.message);
    },
  });

  // Toggle visibility of password
  const handlePasswordToggle = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    let hasError = false;
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Trigger mutation (login request)
    mutate({ email, password });
  };

  return (
    <div
      className="flex w-full h-full justify-center items-center"
      ref={loginRef}
    >
      <div className="w-[100%] h-[80%] bg-white lg:w-[60%] md:w-[80%] sm:w-[50%] flex flex-col rounded-lg shadow-md">
        <div className="flex w-full h-full">
          <div
            className="flex-1 w-[50%] h-full max-lg:hidden"
            style={{
              backgroundImage: "url('/LoginImage.jpg')",
              backgroundSize: "100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="flex-1 w-[50%] bg-transparent h-full">
            <form className="w-[80%] mx-auto mt-8" onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-center mb-8 underline w-full">
                Login
              </h1>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={handlePasswordToggle}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {passwordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12m0 3a3 3 0 100-6 3 3 0 000 6zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.36 1.29-.979 2.492-1.832 3.465m-3.83 2.316A9.964 9.964 0 0112 19c-4.477 0-8.267-2.943-9.542-7a9.964 9.964 0 011.91-3.965"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.45 10.45 0 0112 19c-7 0-10-7-10-7a10.455 10.455 0 012.283-3.825m1.507-1.866A9.975 9.975 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.966 9.966 0 01-1.573 3.281m-2.258 2.634A3.06 3.06 0 0015 12a3 3 0 00-3-3m0 6a3 3 0 01-3-3m3 3l7-7m0 0l-7-7"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "pending"}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {status === "pending" ? "Loading..." : "Login"}
              </button>

              <div className="mt-4 flex justify-between text-sm text-gray-600">
                <a href="/forgot-password" className="hover:underline">
                  Forgot Password?
                </a>
                <a href="/authentication/register" className="hover:underline">
                  New User?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/authentication/login")({
  component: Login,
});

export default Login;
