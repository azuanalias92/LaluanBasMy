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
    id: "k101",
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
      { name: "Taman Selayang", time: ["7:05"], addTime: 5 },
      { name: "Plaza Perabot Classy Glory", time: ["7:07"], addTime: 7 },
      { name: "Lotus Mergong", time: ["7:10"], addTime: 10 },
      { name: "Kg Mempelam", time: ["7:12"], addTime: 12 },
      { name: "Taman Rakyat Mergong", time: ["7:14"], addTime: 14 },
      { name: "Masjid Al Hasanah", time: ["7:15"], addTime: 15 },
      { name: "Asrama PolyTech MARA", time: ["7:17"], addTime: 17 },
      { name: "Sekolah Tunku Abdul Rahman", time: ["7:20"], addTime: 20 },
      { name: "Kg Berjaya", time: ["7:22"], addTime: 22 },
      { name: "Star Village", time: ["7:26"], addTime: 26 },
      { name: "SK Wan Sulaiman Siddiq", time: ["7:28"], addTime: 28 },
      { name: "Aman Central / Menara Alor Setar", time: ["7:30"], addTime: 30 },
      { name: "Dataran Alor Setar", time: ["7:32"], addTime: 32 },
      { name: "Pekan Rabu", time: ["7:34"], addTime: 34 },
      { name: "KTM Alor Setar", time: ["7:36"], addTime: 36 },
      { name: "UTC Alor Setar", time: ["7:40"], addTime: 40 },
      { name: "IPD Kota Setar", time: ["7:38"], addTime: 38 },
      { name: "Ukir Mall", time: ["7:40"], addTime: 40 },
      { name: "Wisma PKNK", time: ["7:42"], addTime: 42 },
      { name: "Taman Yakin / Taman Darul Aman", time: ["7:46"], addTime: 46 },
      { name: "Stadium Darul Aman", time: ["7:48"], addTime: 48 },
      { name: "Taman PKNK", time: ["7:50"], addTime: 50 },
      { name: "Taman PKNK 2", time: ["7:54"], addTime: 54 },
      { name: "SM Dato Syed Omar", time: ["7:56"], addTime: 56 },
      { name: "SMK Sultanah Bahiyah", time: ["7:58"], addTime: 58 },
      { name: "Penjara", time: ["8:00"], addTime: 60 },
      { name: "Wisma Darul Aman", time: ["8:02"], addTime: 62 },
      { name: "Kedah Medical Centre", time: ["8:04"], addTime: 64 },
      { name: "Kelab Royal Kedah", time: ["8:06"], addTime: 66 },
      { name: "Apartment KCS", time: ["8:08"], addTime: 68 },
      { name: "Petronas Alor Merah", time: ["8:10"], addTime: 70 },
      { name: "Alor Merah", time: ["8:12"], addTime: 72 },
      { name: "Pantai Johor", time: ["8:14"], addTime: 74 },
      { name: "JPJ", time: ["8:16"], addTime: 76 },
      { name: "Pejabat Daerah", time: ["8:18"], addTime: 78 },
      { name: "Kompleks Badminton", time: ["8:20"], addTime: 80 },
      { name: "SJK(C) Pumpong", time: ["8:22"], addTime: 82 },
      { name: "Medan Selera Taman Wira Mergong", time: ["8:24"], addTime: 84 },
      { name: "Masjid Al Rahmah", time: ["8:26"], addTime: 86 },
      //{ name: "Shahab Perdana", time: ["8:30"], addTime: 90 },
    ],
  },
];

export default busTimeTables;
