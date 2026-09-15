import React from 'react';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({
  open = false,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  confirmVariant = "destructive"
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="sm">
      <div className="mt-2">
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <div className="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button variant="outline" className="mt-3 sm:mt-0 w-full sm:w-auto" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={confirmVariant} className="w-full sm:w-auto" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
