import React from 'react';
import logoImg from '../../assets/image/learningportal.svg';
import RegistrationForm from '../../component/form/RegistrationForm';

export default function Registration() {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logoImg} alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <RegistrationForm />
      </div>
    </section>
  );
}
