import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/authApiSlice";
import { DynamicForm } from "../../component/dynamicForm/DynamicForm";
import { Branding } from "../../component/branding/Branding";
import classes from "./loginPage.module.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const onSubmit = async (data) => {
    try {
      const response = await login({
        email_id: data.email,
        password: data.password,
      }).unwrap();
      toast.success(response.message.displayMessage);
      navigate("/");
    } catch (err) {
      toast.error(err.data.message.displayMessage);
    }
  };

  const formConfig = [
    {
      id: "email", // Unique identifier for this input
      type: "email", // Input type (email for email validation)
      label: "Email", // Label text
      placeholder: "Enter your email", // Placeholder text
      validation: {
        required: { value: true, message: "Email is required" }, // Validation rule for required input
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Enter a valid email address", // Error message for invalid format
        },
      },
    },
    {
      id: "password", // Unique identifier for this input
      type: "password", // Input type
      label: "Password", // Label text
      placeholder: "Enter your password", // Placeholder text
      validation: {
        required: { value: true, message: "Password is required" }, // Validation rule for required input (consistent format)
        // pattern: {
        //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, // Regex for password strength
        //   message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character", // Error message for pattern mismatch
        // },
        minLength: {
          value: 5,
          message: "Password must be at least 5 characters long",
        },
      },
    },
  ];

  return (
    <div className={classes.box}>
      <Branding />
      <DynamicForm config={formConfig} onSubmit={onSubmit} primaryButtonLabel="Sign In"/>
    </div>
  );
};
