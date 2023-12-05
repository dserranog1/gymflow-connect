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
          className="mb-4 bg-orange-600 hover:bg-orange-400 text-white"
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
