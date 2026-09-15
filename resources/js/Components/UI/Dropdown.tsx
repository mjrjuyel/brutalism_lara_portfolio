import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'motion/react';
import { cn } from '@/Utils/cn';

export default function Dropdown({ trigger, items = [], align = 'right', className }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as={Fragment}>
        {trigger}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as={motion.div}
          className={cn(
            "absolute z-50 mt-2 w-56 origin-top-right rounded-md border border-border bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={cn(
                      active ? 'bg-muted text-foreground' : 'text-muted-foreground',
                      item.destructive ? 'text-destructive hover:bg-destructive/10 hover:text-destructive' : '',
                      'group flex w-full items-center px-4 py-2 text-sm transition-colors'
                    )}
                  >
                    {item.icon && (
                      <span className="mr-3 h-4 w-4">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
