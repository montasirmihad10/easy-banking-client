"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ReusableModalProps = {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: string; // Optional additional width classes
};

const TableModal = ({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  width = "",
  onOpenChange,
}: ReusableModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={`w-full max-h-[90vh] overflow-y-auto rounded-md 
          sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 
          ${width}`}
      >
        {(title || description) && (
          <DialogHeader className="sticky top-0 z-10 bg-white">
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className="py-2">{children}</div>

        {footer && (
          <DialogFooter className="sticky bottom-0 z-10 bg-white pt-3">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TableModal;
