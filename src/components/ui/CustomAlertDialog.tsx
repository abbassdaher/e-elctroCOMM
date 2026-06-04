"use client";

import type { ISettingsState } from "@/interface";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

export const CustomAlertDialog = ({
  title,
  description,
  isOpen,
  onOpen,
  onClose,
  cancleTXT,
  okTXT,
  deleteAction,
}: ISettingsState) => {
  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      onOpenChange={() => (!isOpen ? onOpen() : onClose())}
    >
      <Dialog.Trigger asChild>
        {/* <Button variant="outline">Open</Button> */}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{description}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">{cancleTXT}</Button>
              </Dialog.ActionTrigger>
              <Button
                bg={"red.300"}
                _hover={{ bg: "red.400" }}
                onClick={() => deleteAction()}
                
              >
                {okTXT}
              </Button>
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
