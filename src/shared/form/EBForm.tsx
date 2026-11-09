"use client";
import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface EBFormType {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: SubmitHandler<any>;
}

const EBForm = ({ children, onSubmit }: EBFormType) => {
  // const formConfig = {};
  const methods = useForm();
  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default EBForm;
