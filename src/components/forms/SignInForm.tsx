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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "@/services/pocketbase";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";
import { ClientResponseError } from "pocketbase";
import Link from "next/link";
import { useRouter } from "next/router";
import { User } from "@/types";
const formSchema = z.object({
  email: z.string().email({ message: "El email ingresado no es válido" }),
  password: z
    .string({ required_error: "Campo requerida" })
    .min(8, { message: "La contraseña debe tener al menos 8 carácteres." }),
});

type FormData = z.infer<typeof formSchema>;

export const SignInForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginUser = useMutation({
    mutationFn: (userData: FormData) => {
      return pb
        .collection("users")
        .authWithPassword<User>(userData.email, userData.password);
    },
    onSuccess: (user) => {
      toast({
        title: `Bievenido de nuevo ${user.record.name}`,
      });
      queryClient.setQueryData(["user"], user.record);
      router.push("/dashboard");
    },
    onError: (error) => {
      if (error instanceof ClientResponseError) {
        // TODO parse response error and set more meaningful errors
        toast({
          title: "Ha ocurrido un error",
          description: `Si el error persiste póngase en contacto con soporte`,
          variant: "destructive",
        });
      }
    },
  });
  const onSubmit = (values: FormData) => {
    loginUser.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        {loginUser.isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Procesando
          </Button>
        ) : (
          <>
            <Button type="submit">Iniciar sesión</Button>
            <Button asChild variant="link">
              <Link href="/sign-up">Registrarme</Link>
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};

export default SignInForm;
