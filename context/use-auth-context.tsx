import React, { createContext, useState } from "react";

type initialValueProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const initialValues: initialValueProps = {
  currentStep: 1,
  setCurrentStep: () => undefined,
};

const authContext = createContext(initialValues);

const { Provider } = authContext;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(
    initialValues.currentStep
  );

  const values = { currentStep, setCurrentStep };

  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = React.useContext(authContext);
  return state;
};
