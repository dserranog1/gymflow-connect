import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import Auth from "@/components/layouts/Auth";
import { CheckIcon, Cross1Icon, UpdateIcon } from "@radix-ui/react-icons";
import Admin from "@/components/layouts/Admin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Class } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { useClasses } from "@/hooks/use-classes";
import AttendeesDialogTable from "@/components/AttendeesDialogTable";
import CreateClassDialog from "@/components/CreateClassDialog";
import UpdateClassDialog from "@/components/UpdateClassDialog";
import { difficultyTranslator } from "@/translations";

const columnHelper = createColumnHelper<Class>();

export const columns: ColumnDef<Class, string[] & string & boolean>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  columnHelper.accessor("attendees", {
    header: "Asistentes",
    cell: (props) => {
      return <AttendeesDialogTable usersIds={props.getValue()} />;
    },
  }),
  {
    accessorKey: "date",
    header: "Fecha",
  },
  columnHelper.accessor("difficulty", {
    header: "Dificultad",
    cell: (props) => difficultyTranslator[props.getValue()],
  }),
  {
    accessorKey: "maxAttendees",
    header: "Maximos asistentes",
  },
  columnHelper.accessor("isActive", {
    header: "Habilitada",
    cell: (props) => {
      const isActive = props.getValue();
      if (isActive) {
        return <CheckIcon />;
      }
      return <Cross1Icon />;
    },
  }),
  columnHelper.accessor("id", {
    header: "",
    cell: (props) => {
      return <UpdateClassDialog classData={props.row.original} />;
    },
  }),
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
        <div>
          <CreateClassDialog />
          <DataTable columns={columns} data={classes} />
        </div>
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
