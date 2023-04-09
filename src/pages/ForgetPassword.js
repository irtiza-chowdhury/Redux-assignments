import React from 'react';
import logoImage from '../assets/image/learningportal.svg';
import FormForgetPassword from '../component/form/FormForgetPassword';

export default function ForgetPassword() {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logoImage} alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Forget password
          </h2>
        </div>
        <FormForgetPassword />
      </div>
    </section>
  );
}
