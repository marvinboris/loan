import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import { Button } from './buttons';
import { XMarkIcon } from '@heroicons/react/24/outline';

export type ModalProps = React.PropsWithChildren<{
  title: string;
  show: boolean;
  setShow: (show: boolean) => void;
}>;

export function Modal({ children, show, setShow, title }: ModalProps) {
  return (
    <Dialog
      as="div"
      open={show}
      className="fixed z-10"
      onClose={() => setShow(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/75">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md relative rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <Button
              color="black"
              icon={XMarkIcon}
              onClick={() => setShow(false)}
              className="absolute top-5 right-5 p-0.5 opacity-50"
            />

            <DialogTitle as="h3" className="font-medium">
              {title}
            </DialogTitle>

            <div className="mt-4">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
