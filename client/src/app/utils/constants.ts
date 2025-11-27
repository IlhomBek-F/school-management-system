import { DropdownOption } from "@core/models/base";

export const GRADES: DropdownOption[] = [
  { label: 'All Grades', value: 0 },
  { label: '9th Grade', value: 1 },
  { label: '10th Grade', value: 2 },
  { label: '11th Grade', value: 3 },
  { label: '12th Grade', value: 4 }
];

export const CLASS_SECTIONS: DropdownOption[] = [
  { label: 'Class A', value: 1 },
  { label: 'Class B', value: 2 },
  { label: 'Class C', value: 3 },
]

export const DEPARTMENTS: DropdownOption[] = [
  { label: 'All Departments', value: 0 },
  { label: 'Science & Math', value: 1 },
  { label: 'Languages', value: 2 },
  { label: 'Social Studies', value: 3 },
  { label: 'Sports', value: 4 }
];

export const DEPARTMENTS_MAP = DEPARTMENTS.reduce((prev: Record<number, string>, curr: DropdownOption) => {
  prev[curr.value] = curr.label
  return prev
}, {})

export const CLASS_SECTION_MAP = CLASS_SECTIONS.reduce((prev: Record<number, string>, curr: DropdownOption) => {
  prev[curr.value] = curr.label
  return prev
}, {})

export const GRADES_MAP = GRADES.reduce((prev: Record<number, string>, curr: DropdownOption) => {
  prev[curr.value] = curr.label
  return prev
}, {})
