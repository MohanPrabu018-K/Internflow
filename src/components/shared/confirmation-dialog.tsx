"use client";

import { Modal } from "./modal";
import { Button } from "./button";

export function ConfirmationDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal open={open}>
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <h3 className="text-base font-semibold text-slate-950">{title}</h3>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p> : null}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
}
