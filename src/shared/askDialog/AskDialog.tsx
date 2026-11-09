import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type AskDialogProps = {
  description: string;
  title?: string;
  okText?: string;
  buttonText: React.ReactNode;
  handleSubmit: () => void;
  className?: string;
};

const AskDialog = ({
  description,
  buttonText,
  title,
  okText,
  handleSubmit,
  className,
}: AskDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className} variant="outline">
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-[#104042]"
            onClick={handleSubmit}
          >
            {okText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AskDialog;
