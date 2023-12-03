import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import Auth from "@/components/layouts/Auth";
import { UpdateIcon } from "@radix-ui/react-icons";
import Admin from "@/components/layouts/Admin";
import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import CreateClassDialog from "@/components/CreateClassDialog";
import { useEmployees } from "@/hooks/use-employees";
import CreateEmployeeDialog from "@/components/CreateEmployeeDialog";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "isActive",
    header: "Is active",
  },
  {
    accessorKey: "role",
    header: "Current role",
  },
];

const Employees: NextPageWithLayout = () => {
  const { data: employees, isError, isLoading } = useEmployees();
  if (isLoading) {
    return (
      <UpdateIcon className="h-32 w-32 animate-spin self-center my-auto" />
    );
  }
  if (isError || !employees) {
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
          <CreateEmployeeDialog />
          <DataTable columns={columns} data={employees} />
        </div>
      </div>
    </>
  );
};

Employees.getLayout = function getLayout(page: ReactElement) {
  return (
    <ContentLayout>
      <Auth>
        <Admin>{page}</Admin>
      </Auth>
    </ContentLayout>
  );
};

export default Employees;
