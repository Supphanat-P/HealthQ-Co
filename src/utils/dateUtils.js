const pad = (n) => String(n).padStart(2, "0");

const thaiShortMonths = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

const monthMapThai = {
  "ม.ค.": 1,
  "ก.พ.": 2,
  "มี.ค.": 3,
  "เม.ย.": 4,
  "พ.ค.": 5,
  "มิ.ย.": 6,
  "ก.ค.": 7,
  "ส.ค.": 8,
  "ก.ย.": 9,
  "ต.ค.": 10,
  "พ.ย.": 11,
  "ธ.ค.": 12,
};

export function formatToDDMMYYYY(date) {
  if (!(date instanceof Date)) date = new Date(date);
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function formatToThaiBuddhist(date) {
  if (!(date instanceof Date)) date = new Date(date);
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear() + 543;
  return `${d} ${thaiShortMonths[m]} ${y}`;
}

export function parseScheduleDate(dateStr) {
  if (!dateStr) return null;
  dateStr = String(dateStr).trim();

  if (dateStr.includes("/")) {
    const parts = dateStr.split("/").map((p) => p.trim());
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    let y = parseInt(parts[2], 10);
    if (y < 100) y += 2000;
    return new Date(y, m, d);
  }

  // dd MMM yyyy (Thai) e.g. "31 ต.ค. 2568" or "31 ต.ค. 68"
  const parts = dateStr.split(/\s+/);
  if (parts.length >= 3) {
    const d = parseInt(parts[0], 10);
    const monthThai = parts[1];
    let y = parseInt(parts[2], 10);
    if (y > 2500) {
      y = y - 543; // Buddhist -> AD
    } else if (y < 100) {
      y += 2000;
    }
    const m = (monthMapThai[monthThai] || 1) - 1;
    return new Date(y, m, d);
  }

  return null;
}

export function isSameOrAfter(slotDateStr, selectedDate) {
  const d1 = parseScheduleDate(slotDateStr);
  if (!d1) return true;
  const d2 = selectedDate instanceof Date ? new Date(selectedDate) : new Date(selectedDate);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return d1 >= d2;
}

export default { formatToDDMMYYYY, formatToThaiBuddhist, parseScheduleDate, isSameOrAfter };
