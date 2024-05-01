import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "../../../components/authentication/LogInForm";
import useLogInMutation from "../../../tanstack-query/auth/useLogIn";
import { useDispatch } from "react-redux";
import { showToastWithTimeout } from "../../../store/toaster/toasterActions";

export const LoginPage = () => {
  const { mutateAsync, isLoading, isSuccess, isPending } = useLogInMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const email_id = data.email;
      const password = data.password;
      const response = await mutateAsync({ email_id, password });

      dispatch(
        showToastWithTimeout(response.message.displayMessage, "#00A167")
      );
      navigate("/home");

      console.log(response);
    } catch (error) {
      dispatch(
        showToastWithTimeout(
          error.response.data.message.displayMessage,
          "#D32F2F"
        )
      );
    }
  };

  return <LoginForm onSubmit={onSubmit} />;
};
