export interface Room {
  id: number;
  name: string;
  code: string;
  type: string;
  building: string;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  facilities: string[];
  status: string;
  schedule: {
    day: string;
    time: string;
    class: string;
  }[];
  color: string;
}
