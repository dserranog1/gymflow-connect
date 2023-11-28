import { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import CreateClassForm from "./forms/CreateClass";

const CreateClassDialog: FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-4 bg-green-200 hover:bg-green-100"
        >
          Create class
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <CreateClassForm/>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateClassDialog;
