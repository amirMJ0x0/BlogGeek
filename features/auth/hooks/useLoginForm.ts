import z from "zod";
import { IdentifierSchema } from "../schemas/authSchemas";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmail, isValidIranianMobile } from "@/lib/utils";

export type IdentifierForm = z.infer<typeof IdentifierSchema>;

const useLoginForm = () => {
  const [mode, setMode] = useState<"identifier" | "password">("identifier");
  const [identifierType, setIdentifierType] = useState<
    "email" | "phone" | "unkown"
  >("unkown");
  const [lastIdentifier, setLastIdentifier] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
    reset,
  } = useForm<IdentifierForm>({
    resolver: zodResolver(IdentifierSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    mode,
    identifierType,
  };
};

export default useLoginForm;
