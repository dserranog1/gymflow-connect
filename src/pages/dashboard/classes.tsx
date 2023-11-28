import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import Auth from "@/components/layouts/Auth";
import { UpdateIcon } from "@radix-ui/react-icons";
import Admin from "@/components/layouts/Admin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Class } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { useClasses } from "@/hooks/use-classes";
import AttendeesDialogTable from "@/components/AttendeesDialogTable";

const columnHelper = createColumnHelper<Class>();

export const columns: ColumnDef<Class, string[]>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  columnHelper.accessor("attendees", {
    header: "attendees",
    cell: (props) => {
      return <AttendeesDialogTable usersIds={props.getValue()} />;
    },
  }),
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "maxAttendees",
    header: "Maximum attendees",
  },
];

const Classes: NextPageWithLayout = () => {
  const { data: classes, isError, isLoading } = useClasses();
  if (isLoading) {
    return (
      <UpdateIcon className="h-32 w-32 animate-spin self-center my-auto" />
    );
  }
  if (isError || !classes) {
    return (
      <div className="flex flex-row items-center justify-center flex-1">
        Error al cargar la información intenta cerrar sesión y entrar de nuevo
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center flex-1 gap-24 justify-center">
        <h1 className="text-3xl">
          <DataTable columns={columns} data={classes} />
        </h1>
      </div>
    </>
  );
};

Classes.getLayout = function getLayout(page: ReactElement) {
  return (
    <ContentLayout>
      <Auth>
        <Admin>{page}</Admin>
      </Auth>
    </ContentLayout>
  );
};

export default Classes;
