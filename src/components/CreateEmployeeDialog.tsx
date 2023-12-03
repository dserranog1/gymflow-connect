import { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import CreateEmployeeForm from "./forms/CreateEmployee";

const CreateEmployeeDialog: FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-4 bg-green-200 hover:bg-green-100"
        >
          Create employee
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <CreateEmployeeForm />
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateEmployeeDialog;
