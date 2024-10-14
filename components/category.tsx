import {ArrowUpRight, ChevronDown} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {categories} from "@/lib/consts";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Category() {
  return (
    <div>
      <div className="max-md:hidden">
        <div className=" rounded-l-lg bg-foreground/5 h-[36px] flex items-center gap-1 cursor-pointer py-1.5 border border-border">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 py-1.5 px-2">
              Categories
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border-none relative z-[100]"
              onCloseAutoFocus={(e) => {
                e.preventDefault();
              }}
            >
              {categories.map((item, i) => (
                <DropdownMenuSub key={i}>
                  <DropdownMenuSubTrigger className="gap-2">
                    <Link href={item.link} className="w-full cursor-pointer">
                      {item.title}
                    </Link>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent
                      alignOffset={0}
                      className="border-none relative z-[100] overflow-auto"
                    >
                      {item.sub.map((item, i) => (
                        <DropdownMenuItem
                          key={i}
                          className="cursor-pointer p-0 "
                        >
                          <Link href={item.link} className="w-full px-2 py-1.5">
                            {item.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="md:hidden max-md:pt-5 max-md:p-2 overflow-auto max-h-[calc(100svh-184px)]">
        <Accordion type="single" collapsible>
          {categories.map((item, i) => (
            <AccordionItem key={i} value={item.label}>
              <AccordionTrigger className="[&[data-state=open]>svg]:text-primary [&[data-state=open]]:text-primary">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href={item.link}
                  className="font-semibold text-2xl link w-fit"
                >
                  <div className="flex items-center gap-1 w-fit">
                    {item.title} <ArrowUpRight />
                  </div>
                </Link>
                <div className="mt-5 ml-5">
                  {item.sub.map((item, i) => (
                    <Link
                      key={item.label}
                      href={item.link}
                      className="block link w-fit my-2"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
