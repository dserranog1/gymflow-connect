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
import { pb } from "@/services/pocketbase";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";
import { User } from "@/types";
import { ClientResponseError } from "pocketbase";
import { useRouter } from "next/router";

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

type FormData = z.infer<typeof formSchema>;

export const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormData>({
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
  const createNewUser = useMutation({
    mutationFn: (userData: FormData) => {
      return pb.collection("users").create<User>(userData);
    },
    onSuccess: (user) => {
      toast({
        title: `Registo exitoso`,
        description: `Se ha creado el usuario ${user.name}`,
      });
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof ClientResponseError) {
        // TODO parse response error and set more meaningful errors
        toast({
          title: "Ha ocurrido un error",
          description: `Si el error persiste póngase en contacto con soporte`,
          variant: "destructive",
        });
        console.log({ error });
      }
    },
  });
  const onSubmit = (values: FormData) => {
    createNewUser.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };
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
        {createNewUser.isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Procesando
          </Button>
        ) : (
          <Button className="bg-orange-600 hover:bg-orange-400" type="submit">
            Registrarme
          </Button>
        )}
      </form>
    </Form>
  );
};

export default SignUpForm;
