"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "./form-input"; // Assuming this is the correct import
import { FormSubmit } from "./form-submit";
import { X } from "lucide-react";
import React, { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "../ui/button";

interface FormPopoverProps {
  children: React.ReactNode; // Corrected from `childern` to `children`
  side?: "left"|"right"|"top"|"bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "right",
  align,
  sideOffset = 0
}: FormPopoverProps) => {

  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Board Created")
      closeRef.current?.click();
      
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
    }
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image});
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} className="w-80 pt-3" sideOffset={sideOffset}>
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
          className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          variant="ghost"
          >
            <X className="h-4 w-4"/>
          </Button>
        </PopoverClose>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-4">
            <FormPicker
            id="images"
            errors={fieldErrors}
            ></FormPicker>
            <FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
