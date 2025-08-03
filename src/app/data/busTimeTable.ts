// Sample bus routes data for Alor Setar
export interface BusTimeTable {
  id: string;
  name: string;
  description: string;
  color: string;
  timeTable: Timetable[];
}

export interface Timetable {
  name: string;
  time?: string[];
  addTime?: number;
}

export const busTimeTables: BusTimeTable[] = [
  {
    id: "k100",
    name: "K100 - Bandar Alor Setar",
    description: "",
    color: "#2BB573",
    timeTable: [
      {
        name: "Shahab Perdana",
        time: [
          "7:00",
          "7:30",
          "8:00",
          "8:30",
          "9:00",
          "9:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
          "18:00",
          "18:30",
          "19:00",
          "19:30",
          "20:00",
          "20:30",
          "21:00",
          "21:30",
          "22:00",
          "22:30",
        ],
      },
      { name: "SMKAK", time: ["7:03"], addTime: 3 },
      { name: "Taman Selayang", time: ["7:00"] , addTime: 61},
      { name: "Plaza Perabot Classy Glory", time: ["7:00"] },
      { name: "Lotus Mergong", time: ["7:00"] },
      { name: "Kg Mempelam", time: ["7:00"] },
      { name: "Taman Rakyat Mergong", time: ["7:00"] },
      { name: "Masjid Al Hasanah", time: ["7:00"] },
      { name: "Asrama PolyTech MARA", time: ["7:00"] },
      { name: "Sekolah Tunku Abdul Rahman", time: ["7:00"] },
      { name: "Kg Berjaya", time: ["7:00"] },
      { name: "Star Village", time: ["7:00"] },
      { name: "SK Wan Sulaiman Siddiq", time: ["7:00"] },
      { name: "Aman Central / Menara Alor Setar", time: ["7:00"] },
      { name: "Dataran Alor Setar", time: ["7:00"] },
      { name: "Pekan Rabu", time: ["7:00"] },
      { name: "KTM Alor Setar", time: ["7:00"] },
      { name: "UTC Alor Setar", time: ["7:00"] },
      { name: "IPD Kota Setar", time: ["7:00"] },
      { name: "Ukir Mall", time: ["7:00"] },
      { name: "Wisma PKNK", time: ["7:00"] },
      { name: "Taman Yakin / Taman Darul Aman", time: ["7:00"] },
      { name: "Stadium Darul Aman", time: ["7:00"] },
      { name: "Taman PKNK", time: ["7:00"] },
      { name: "Taman PKNK 2", time: ["7:00"] },
      { name: "SM Dato Syed Omar", time: ["7:00"] },
      { name: "SMK Sultanah Bahiyah", time: ["7:00"] },
      { name: "Penjara", time: ["7:00"] },
      { name: "Wisma Darul Aman", time: ["7:00"] },
      { name: "Kedah Medical Centre", time: ["7:00"] },
      { name: "Kelab Royal Kedah", time: ["7:00"] },
      { name: "Apartment KCS", time: ["7:00"] },
      { name: "Petronas Alor Merah", time: ["7:00"] },
      { name: "Alor Merah", time: ["7:00"] },
      { name: "Pantai Johor", time: ["7:00"] },
      { name: "JPJ", time: ["7:00"] },
      { name: "Pejabat Daerah", time: ["7:00"] },
      { name: "Kompleks Badminton", time: ["7:00"] },
      { name: "SJK(C) Pumpong", time: ["7:00"] },
      { name: "Medan Selera Taman Wira Mergong", time: ["7:00"] },
      { name: "Masjid Al Rahmah", time: ["7:00"] },
      { name: "Shahab Perdana", time: ["7:00"] },
    ],
  },
];

export default busTimeTables;
