import { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import UpdateClassForm from "./forms/UpdateClassForm";
import { Class } from "@/types";

interface Props {
  classData: Class;
}

const UpdateClassDialog: FC<Props> = ({ classData }) => {
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
        <UpdateClassForm classData={classData} />
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateClassDialog;
