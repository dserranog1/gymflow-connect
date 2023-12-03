import { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import CreateEmployeeForm from "./forms/CreateEmployeeForm";

const CreateEmployeeDialog: FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-4 bg-green-200 hover:bg-green-100"
        >
          Crear empleado
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <CreateEmployeeForm />
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateEmployeeDialog;
