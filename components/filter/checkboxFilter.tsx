"use client";

export default function CheckboxFilter({
  items,
  setActiveFilters,
  activeFilters,
  name,
  active,
}: {
  items: any;
  setActiveFilters: any;
  activeFilters: any;
  name: string;
  active?: boolean;
}) {
  return (
    <div className="flex justify-between items-center gap-3 py-0.5">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          value={items.label}
          id={`${active ? "active-" : ""}${items.label}`}
          name={items.label}
          readOnly={false}
          checked={activeFilters[name]?.includes(items.label) ? true : false}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              setActiveFilters((prev: any) => ({
                ...prev,
                [name]: prev[name] && prev[name].length > 0 ? [...prev[name], items.label] : [items.label],
              }));
            } else {
              if (activeFilters[name]?.length == 1) {
                setActiveFilters((prev: any) => {
                  const newObj = {...prev};
                  delete newObj[name];
                  return newObj;
                });
              } else {
                setActiveFilters((prev: any) => ({
                  ...prev,
                  [name]: prev[name]?.filter((item: string) => item != items.label),
                }));
              }
            }
          }}
        />
        <label htmlFor={`${active ? "active-" : ""}${items.label}`}>{items.name}</label>
      </div>
      <div className="text-muted-foreground">({items.total})</div>
    </div>
  );
}
