export interface TableColumns {
  id:
    | "make"
    | "model"
    | "year"
    | "engine"
    | "gearbox"
    | "condition"
    | "hp"
    | "color"
    | "price"
    | "city"
    | "mileage"
    | "extras";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
}
