import React from "react";
import { Toaster } from "sonner";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Toaster position="top-right" />
      <RegisterForm />
    </div>
  );
};

export default Register;
