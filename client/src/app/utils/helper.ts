import { DropdownOption } from "@core/models/base"

export const makeDropdownOption = (label: string, value: string | number): DropdownOption => ({label, value})
