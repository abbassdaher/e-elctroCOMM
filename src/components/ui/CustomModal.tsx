"use client";

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
// import { useState } from "react";

interface ICustomModal {
  title: string;
  description?: string;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  cancleTXT?: string;
  okTXT?: string;
  action?: () => void;
  children?: React.ReactNode;
  open?: boolean;
//   onOpenChange?: (e: { open: boolean }) => void;
  setOnOpenCustomModal: (open: boolean) => void;
}
export const CustomModal = ({
  title,
  description,
  okTXT,
  action,
  children,
  open,
//   onOpenChange,
  setOnOpenCustomModal,
}: ICustomModal) => {
  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e)=>setOnOpenCustomModal(e.open)}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p className=" mb-3 bg-red-500"> {description}</p>
              {children}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button type="button" variant="outline" onClick={()=>open=false}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button onClick={action}>{okTXT}</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
