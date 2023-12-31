import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import Auth from "@/components/layouts/Auth";
import { UpdateIcon } from "@radix-ui/react-icons";
import Admin from "@/components/layouts/Admin";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Employee } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { useEmployees } from "@/hooks/use-employees";
import CreateEmployeeDialog from "@/components/CreateEmployeeDialog";
import UpdateEmployeeDialog from "@/components/UpdateEmployeeDialog";
import { roleTranslator } from "@/translations";
import Image from "next/image";
import CheckIcon from "@/assets/svg/CheckIcon.svg";
import CrossIcon from "@/assets/svg/CrossIcon.svg";

const columnHelper = createColumnHelper<Employee>();

export const columns: ColumnDef<Employee, boolean & string>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "lastName",
    header: "Apellido",
  },
  columnHelper.accessor("isActive", {
    header: "Habilitado",
    cell: (props) => {
      const isActive = props.getValue();
      if (isActive) {
        return <Image src={CheckIcon} alt="Check icon" />;
      }
      return <Image src={CrossIcon} alt="Cross icon" />;
    },
  }),
  columnHelper.accessor("role", {
    header: "Rol actual",
    cell: (props) => roleTranslator[props.getValue()],
  }),
  columnHelper.accessor("id", {
    header: "",
    cell: (props) => {
      return <UpdateEmployeeDialog employeeData={props.row.original} />;
    },
  }),
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
