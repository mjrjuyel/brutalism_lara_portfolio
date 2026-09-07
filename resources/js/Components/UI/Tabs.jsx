import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/Utils/cn';

export default function Tabs({ tabs = [], defaultValue, onChange, className }) {
  const [activeTab, setActiveTab] = useState(defaultValue || (tabs[0] ? tabs[0].value : null));

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (onChange) onChange(value);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex space-x-1 rounded-xl bg-muted p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={cn(
                "relative flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 rounded-lg bg-background shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 focus-visible:outline-none focus-visible:ring-0">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={cn(
              "outline-none focus-visible:ring-0",
              activeTab === tab.value ? "block" : "hidden"
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
