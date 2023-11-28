import { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { UseFilteredUserList } from "@/hooks/use-user";
import { UpdateIcon } from "@radix-ui/react-icons";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/data-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

interface Props {
  usersIds: string[];
}

const AttendeesDialogTable: FC<Props> = ({ usersIds }) => {
  const filter = usersIds
    .map((userId) => {
      return `id = "${userId}"`;
    })
    .join("||");

  const { data: users, isError, isLoading } = UseFilteredUserList(filter);

  if (isLoading) {
    return (
      <UpdateIcon className="h-4 w-4 animate-spin self-center my-auto" />
    );
  }
  if (isError || !users) {
    return (
      <div className="flex flex-row items-center justify-center flex-1">
        Error al cargar la información intenta cerrar sesión y entrar de nuevo
      </div>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show full list</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <DataTable columns={columns} data={users} />
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AttendeesDialogTable;
