"use client";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
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
import { Class, Difficulty } from "@/types";
import { ClientResponseError } from "pocketbase";
import { useRouter } from "next/router";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { queryClient } from "@/pages/_app";
import { FC } from "react";
import { AlertDialogCancel } from "../ui/alert-dialog";
import { Switch } from "../ui/switch";
import { difficultyTranslator } from "@/translations";

const formSchema = z.object({
  name: z.string().min(1, { message: "Campo requerido" }),
  maxAttendees: z.coerce
    .number({ required_error: "Campo requerido" })
    .gt(0, { message: "Debe haber mínimo 1 asistente" }),
  date: z.date().min(new Date(), { message: "La clase debe ser a futuro" }),
  difficulty: z.nativeEnum(Difficulty, {
    required_error: "Debe ser una de:  high, medium, low",
  }),
  isActive: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  classData: Class;
}

export const UpdateClassForm: FC<Props> = ({ classData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: classData.name,
      date: new Date(classData.date),
      maxAttendees: classData.maxAttendees,
      difficulty: classData.difficulty,
      isActive: classData.isActive,
    },
  });
  const updateClass = useMutation({
    mutationFn: (newClassData: FormData) => {
      return pb.collection("classes").update<Class>(classData.id, newClassData);
    },
    onSuccess: (newClass) => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast({
        title: `Actualización exitosa`,
        description: `Se ha actualizado la clase ${newClass.name}`,
      });
      router.push("/dashboard/classes");
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
    updateClass.mutate(values, {
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
                  <Input placeholder="Yoga" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxAttendees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Máximos asistentes</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-4">Fecha*</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dificultad*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Difficulty.low}>
                    {difficultyTranslator[Difficulty.low]}
                  </SelectItem>
                  <SelectItem value={Difficulty.medium}>
                    {difficultyTranslator[Difficulty.medium]}
                  </SelectItem>
                  <SelectItem value={Difficulty.high}>
                    {difficultyTranslator[Difficulty.high]}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Habilitada</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {updateClass.isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Procesando
          </Button>
        ) : (
          <>
            <AlertDialogCancel asChild>
              <Button
                className="mb-4 bg-yellow-300 hover:bg-yellow-100"
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

export default UpdateClassForm;
