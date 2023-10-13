"use client";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
const formSchema = z
  .object({
    name: z.string().min(1, { message: "Campo requerido" }),
    secondName: z.string().optional(),
    lastName: z.string().min(1, { message: "Campo requerido" }),
    secondLastName: z.string().optional(),
    email: z.string().email({ message: "El email ingresado no es válido" }),
    password: z
      .string({ required_error: "Campo requerida" })
      .min(8, { message: "La contraseña debe tener al menos 8 carácteres." }),
    passwordConfirm: z.string({ required_error: "Campo requerido" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "La contraseñas no son iguales",
  });

const onSubmit = (values: z.infer<typeof formSchema>) => {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
};

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      secondName: "",
      lastName: "",
      secondLastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre*</FormLabel>
                <FormControl>
                  <Input placeholder="Juan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segundo Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido*</FormLabel>
                <FormControl>
                  <Input placeholder="Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segundo Apellido</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo*</FormLabel>
              <FormControl>
                <Input placeholder="juan.perez@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña*</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirma la contraseña*</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Registrarme</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
