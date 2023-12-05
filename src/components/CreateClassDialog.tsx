import { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import CreateClassForm from "./forms/CreateClassForm";

const CreateClassDialog: FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-4 bg-orange-600 hover:bg-orange-400"
        >
          Crear clase
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <CreateClassForm />
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateClassDialog;
