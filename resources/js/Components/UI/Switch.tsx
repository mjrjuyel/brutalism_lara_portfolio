import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { cn } from '@/Utils/cn';

export default function Switch({ label, description, checked, onChange, className }) {
  return (
    <HeadlessSwitch.Group as="div" className="flex items-center justify-between">
      <span className="flex flex-grow flex-col">
        {label && (
          <HeadlessSwitch.Label as="span" className="text-sm font-medium text-foreground" passive>
            {label}
          </HeadlessSwitch.Label>
        )}
        {description && (
          <HeadlessSwitch.Description as="span" className="text-sm text-muted-foreground">
            {description}
          </HeadlessSwitch.Description>
        )}
      </span>
      <HeadlessSwitch
        checked={Boolean(checked)}
        onChange={onChange}
        className={cn(
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-zinc-950',
          checked 
            ? 'bg-primary border-primary' 
            : 'bg-zinc-800 border-zinc-700 hover:bg-zinc-750 hover:border-zinc-600',
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            checked ? 'translate-x-5 bg-zinc-950' : 'translate-x-0 bg-zinc-300',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-md transition duration-200 ease-in-out ring-0'
          )}
        />
      </HeadlessSwitch>
    </HeadlessSwitch.Group>
  );
}
