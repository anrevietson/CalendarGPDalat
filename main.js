function calculateYear(year) {
    const isLeap = isLeapYear(year);
    const firstDayOfYear = getFirstDayOfYear(year);
    const weeksInYear = firstDayOfYear === 0 ? 53 : 52;
    const easterDayOfYear = calculateEasterDayOfYear(year, isLeap);

    const firstSunday = getDayForWeek(year, 1, 0); // Chủ nhật tuần 1
    const baptismOfTheLord = getBaptismOfTheLord(firstDayOfYear, year); 
    const ashWednesday = getDayForYear(easterDayOfYear - 46, year); // Lễ Tro
    const firstSundayOfLent = getDayForWeek(year, Math.ceil((easterDayOfYear - 42) / 7), 0); // CN 1 Mùa Chay
    const easterSunday = getDayForWeek(year, Math.ceil(easterDayOfYear / 7), 0); // Phục Sinh
    const pentecostSunday = getDayForWeek(year, Math.ceil((easterDayOfYear + 49) / 7), 0); // Chúa Thánh Thần
    const lastSundayOrdinaryTime = getDayForWeek(year, weeksInYear === 53 ? 48 : 47, 0); // CN cuối mùa Thường Niên
    const firstSundayAdvent = getDayForWeek(year, weeksInYear === 53 ? 49 : 48, 0); // CN 1 Mùa Vọng
    const lastSundayOfYear = getDayForWeek(year, weeksInYear, 0); // CN cuối năm

    return {
        firstSunday, 
        baptismOfTheLord,
        ashWednesday,
        firstSundayOfLent,
        easterSunday,
        pentecostSunday,
        lastSundayOrdinaryTime,
        firstSundayAdvent,
        lastSundayOfYear
    };
}

// Kiểm tra năm nhuận
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Tính ngày đầu tiên của năm (0: Chủ nhật, 1: Thứ Hai, ..., 6: Thứ Bảy)
function getFirstDayOfYear(year) {
    return (year + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400)) % 7;
}

// Tính ngày Lễ Rửa Tội của Chúa (Chủ nhật sau Epiphany)
function getBaptismOfTheLord(firstDayOfYear, year) {
    return firstDayOfYear === 0 ? 
        { day: 9, month: 1, year } : 
        firstDayOfYear === 1 ? 
        { day: 8, month: 1, year } : 
        getDayForWeek(year, 2, 0); // Chủ nhật tuần 2 của năm
}

// This algorithm is based on Carl Friedrich Gauss's Easter date calculation.
function calculateEasterDayOfYear(year, isLeap) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const eM = Math.floor((h + l - 7 * m + 114) / 31);
    const eD = ((h + l - 7 * m + 114) % 31) + 1;
    return eM === 3 ? eD + (isLeap ? 60 : 59) : eD + (isLeap ? 91 : 90);
}

// Lấy ngày dựa trên số tuần và ngày trong tuần (0: Chủ nhật, ..., 6: Thứ Bảy)
function getDayForWeek(year, weekNumber, weekDay) {
    const firstDayOfYear = getFirstDayOfYear(year);
    const dayOfYear = (weekNumber - 1) * 7 + (weekDay - firstDayOfYear + 7) % 7 + 1;
    return getDayForYear(dayOfYear, year);
}

// Tính ngày tháng dựa trên số ngày trong năm
function getDayForYear(dayOfYear, year) {
    const isLeap = isLeapYear(year);
    const daysInMonth = isLeap
        ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let remainingDays = dayOfYear;
    let month = 0;

    while (remainingDays > daysInMonth[month]) {
        remainingDays -= daysInMonth[month];
        month++;
    }

    return { day: remainingDays, month: month + 1, year };
}
