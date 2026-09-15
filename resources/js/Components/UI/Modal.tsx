import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/Utils/cn';

const maxWidthClass = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
};

export default function Modal({ open = false, onClose, title, description, children, maxWidth = 'md' }) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog as={motion.div} static open={open} onClose={onClose} className="relative z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className={cn(
                  "relative transform overflow-hidden rounded-lg bg-card text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full border border-border",
                  maxWidthClass[maxWidth]
                )}
              >
                <div className="bg-card px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      {title && (
                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-card-foreground">
                          {title}
                        </Dialog.Title>
                      )}
                      {description && (
                        <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                          {description}
                        </Dialog.Description>
                      )}
                      <div className="mt-4">{children}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
