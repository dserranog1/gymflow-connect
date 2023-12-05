import { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Employee } from "@/types";
import UpdateEmployeeForm from "./forms/UpdateEmployeeForm";

interface Props {
  employeeData: Employee;
}

const UpdateEmployeeDialog: FC<Props> = ({ employeeData }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-4 bg-blue-300 hover:bg-blue-100"
        >
          Actualizar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <UpdateEmployeeForm employeeData={employeeData} />
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateEmployeeDialog;
