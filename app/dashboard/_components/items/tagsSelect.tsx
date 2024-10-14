import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {availableTags} from "@/lib/consts";
import {TagName, TagValue} from "@/lib/types";
import {Plus} from "lucide-react";
import {useState} from "react";

export default function TagsSelect({
  tags,
  filters,
  setTags,
  setFilters,
}: {
  setTags: any;
  setFilters: any;
  tags: any;
  filters: any;
}) {
  const [selectedTagName, setSelectedTagName] = useState<TagName | null>(null);
  const [selectedTagValue, setSelectedTagValue] = useState<TagValue | null>(null);

  const handleAdd = () => {
    // @ts-ignore
    setTags((prev: any) => ({...prev, [selectedTagName?.label]: selectedTagValue?.label}));
    setFilters((prev: any) => {
      const index = prev.findIndex((item: any) => item.name_label === selectedTagName?.label);
      if (index !== -1) {
        // Update existing object
        return prev.map((item: any, i: number) =>
          i === index ? {...item, value: selectedTagValue?.name, value_label: selectedTagName?.label} : item
        );
      } else {
        // Add new object
        return [
          ...prev,
          {
            name: selectedTagName?.name,
            value: selectedTagValue?.name,
            name_label: selectedTagName?.label,
            value_label: selectedTagValue?.label,
          },
        ];
      }
    });
  };
  return (
    <div className="flex items-center gap-3">
      <div className="w-1/3">
        <Select
          onValueChange={(e) => {
            // @ts-ignore
            setSelectedTagName(availableTags.names.find((item) => item.label == e));
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="tag name" />
          </SelectTrigger>
          <SelectContent>
            {availableTags.names.map((item) => (
              <SelectItem value={item.label} key={item.label}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedTagName ? (
        <div className="w-1/3">
          <Select
            onValueChange={(e) => {
              // @ts-ignore
              setSelectedTagValue(availableTags.values[selectedTagName.label].find((item) => item.label == e));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="tag value" />
            </SelectTrigger>
            <SelectContent>
              {/* @ts-ignore */}
              {availableTags.values[selectedTagName.label].map((item) => (
                <SelectItem value={item.label} key={item.label}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <></>
      )}
      {selectedTagValue ? (
        <div className="w-1/3">
          <Button type="button" className="w-full" onClick={handleAdd}>
            <Plus /> Add
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
