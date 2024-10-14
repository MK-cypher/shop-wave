"use client";

import {Check, ChevronsUpDown} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";
import {categories} from "@/lib/consts";

export function CategorySelect({
  defaultValue,
  setCategory,
  setSubCategory,
  category,
}: {
  defaultValue?: string;
  setCategory?: any;
  setSubCategory?: any;
  category?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full max-w-[200px]">
          <span className="max-w-[180px] text-ellipsis overflow-hidden">
            {value
              ? category
                ? categories.find((cat) => cat.label == category)?.sub.find((sub) => sub.label == value)?.title
                : categories.find((cat) => cat.label === value)?.title
              : "Select a Category..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder="Search Category..."
            className="outline-none border-none focus-visible:outline-none focus:outline-none"
          />
          <CommandEmpty>No categories found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {category
                ? categories
                    .find((item) => item.label == category)
                    ?.sub.map((sub) => (
                      <CommandItem
                        key={sub.label}
                        value={sub.label}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setSubCategory(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                        className="data-[disabled]:pointer-events-auto data-[disabled]:opacity-100"
                      >
                        <Check className={cn("mr-2 h-4 w-4", value === sub.label ? "opacity-100" : "opacity-0")} />
                        {sub.title}
                      </CommandItem>
                    ))
                : categories.map((category, i) => (
                    <CommandItem
                      key={category.label}
                      value={category.label}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setCategory(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                      className="data-[disabled]:pointer-events-auto data-[disabled]:opacity-100"
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === category.label ? "opacity-100" : "opacity-0")} />
                      {category.title}
                    </CommandItem>
                  ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
