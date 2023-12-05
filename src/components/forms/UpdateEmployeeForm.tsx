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
import { Employee, EmployeeRol } from "@/types";
import { ClientResponseError } from "pocketbase";
import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { queryClient } from "@/pages/_app";
import { Switch } from "../ui/switch";
import { FC } from "react";
import { AlertDialogCancel } from "../ui/alert-dialog";
import { roleTranslator } from "@/translations";

const formSchema = z.object({
  name: z.string().min(1, { message: "Campo requerido" }),
  lastName: z.string().min(1, { message: "Campo requerido" }),
  isActive: z.boolean(),
  role: z.nativeEnum(EmployeeRol, {
    required_error: "Seleccione una",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  employeeData: Employee;
}

export const UpdateEmployeeForm: FC<Props> = ({ employeeData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: employeeData.name,
      lastName: employeeData.lastName,
      isActive: employeeData.isActive,
      role: employeeData.role,
    },
  });
  const updateEmployee = useMutation({
    mutationFn: (newEmployeeData: FormData) => {
      return pb
        .collection("employees")
        .update<Employee>(employeeData.id, newEmployeeData);
    },
    onSuccess: (newEmployee) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: `Registo exitoso`,
        description: `Se ha actualizado el empleado ${newEmployee.name}`,
      });
      router.push("/dashboard/employees");
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
    console.log(values);
    updateEmployee.mutate(values, {
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido *</FormLabel>
                <FormControl>
                  <Input placeholder="Perez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Habilitado</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={EmployeeRol.class_trainer}>
                    {roleTranslator[EmployeeRol.class_trainer]}
                  </SelectItem>
                  <SelectItem value={EmployeeRol.personal_trainer}>
                    {roleTranslator[EmployeeRol.personal_trainer]}
                  </SelectItem>
                  <SelectItem value={EmployeeRol.support}>
                    {roleTranslator[EmployeeRol.support]}
                  </SelectItem>
                  <SelectItem value={EmployeeRol.trainer}>
                    {roleTranslator[EmployeeRol.trainer]}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {updateEmployee.isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Procesando
          </Button>
        ) : (
          <>
            <AlertDialogCancel asChild>
              <Button
                className="mb-4 bg-green-300 hover:bg-green-100"
                type="submit"
              >
                Actualizar
              </Button>
            </AlertDialogCancel>
          </>
        )}
      </form>
    </Form>
  );
};

export default UpdateEmployeeForm;
