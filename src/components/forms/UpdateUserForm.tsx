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
import { User } from "@/types";
import { ClientResponseError } from "pocketbase";
import { useRouter } from "next/router";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, { message: "Campo requerido" }),
  secondName: z.string().optional(),
  lastName: z.string().min(1, { message: "Campo requerido" }),
  secondLastName: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const UpdateUserForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      secondName: user.secondName,
      lastName: user.lastName,
      secondLastName: user.secondLastName,
    },
  });
  const updateUser = useMutation({
    mutationFn: (userData: FormData) => {
      return pb.collection("users").update<User>(user.id, userData);
    },
    onSuccess: (user) => {
      toast({
        title: `Actualización exitosa`,
        description: `Se ha actualizado la información del usuario ${user.name}`,
      });
      queryClient.setQueryData(["user"], user);
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
    updateUser.mutate(values, {
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
        {updateUser.isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Procesando
          </Button>
        ) : (
          <>
            <Button className="bg-orange-600 hover:bg-orange-400" type="submit">
              Actualizar
            </Button>
            <Button asChild variant="link">
              <Link href="/dashboard">Cancelar</Link>
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};

export default UpdateUserForm;
