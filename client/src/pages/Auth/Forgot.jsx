import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { validateEmail, forgotPassword } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

export const Forgot = (props) => {
  const { setIsLogin, setIsRegister, setIsForgot } = props;
  const [message, setMessage] = useState('');

  const { values, handleChange, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        email: '',
      },
      validate: (values) => {
        const errors = {};

        if (!values.email) {
          errors.email = 'Email address is required!';
        }

        return errors;
      },
      onSubmit: ({ email }) => {
        forgot(email);
      },
    });

  const [redirectHome, setRedirectHome] = useState(false);

  const dispatch = useDispatch();

  // async function LoginSubmit() {
  async function forgot(email) {
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      email,
    };

    try {
      const data = forgotPassword(userData);
      resetForm();
      if (data) {
        setMessage('Request sent');
        setTimeout(() => {
          setMessage('');
          setIsLogin(true);
          setIsRegister(false);
          setIsForgot(false);
        }, 10000); // 10 secs

        // window.location.reload(); // relaod to update changes m,ade by localStoarge
      }
    } catch (e) {
      alert('Password reset failed');
    }
  }

  if (redirectHome) {
    // return <Navigate to={'/landingPage'} />;
    return <Navigate to={'/'} />;
  }

  const login = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px] md:gap-[12px]">
            <div className="flex flex-row justify-between mt-[24px]">
              <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
                Forgot Password
              </div>

              <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#130D1A"
                  className="w-5 h-5"
                  onClick={() => setRedirectHome(true)}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col mb-4 h-[48px] bg-white rounded outline outline-lightslategray-300 outline-[1px]">
              <input
                id="email"
                name="email"
                type="email"
                className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block outline-none bg-white"
                placeholder="your@email.com"
                value={values.email}
                onChange={handleChange}
              />
              <div>
                {touched.email && errors.email ? (
                  <div className="mt-6 text-[#ef4444]">{errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-row justify-center items-center">
              <div
                className="cursor-pointer flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full"
                onClick={handleSubmit}
              >
                {message ? <>{message}</> : <>{'Get Reset Email'}</>}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 justify-end">
            <div className="text-smi leading-[22px] text-gray-300 inline-block">
              {'Remember your email and password?'}
            </div>
            <div
              className="cursor-pointer text-smi leading-[22px] text-bgPrimary hover:text-opacity-80 inline-block"
              onClick={() => {
                setIsLogin(true);
                setIsRegister(false);
                setIsForgot(false);
              }}
            >
              Login!
            </div>
          </div>

          <div className="flex flex-row w-full" />
        </div>
      </form>
    </div>
  );
  return <>{login}</>;
};
