(function () {
    // Hàm so sánh ngày (chỉ so sánh ngày, tháng, năm)
    function isSameDate(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    // Hàm tính toán các ngày lễ riêng (calculateOptionFeasts)
    function calculateOptionFeasts(inputDate) {
        const OptionFeasts = [];

        // Lấy năm từ đối tượng Date
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth(); // Lấy tháng từ inputDate

        // Hàm để đảm bảo date luôn là đối tượng Date
        function parseDate(date) {
            return (date instanceof Date) ? date : new Date(date);
        }
        
        // Tính các ngày lễ
        OptionFeasts.push({ name: 'Bổn mạng Đức Giám mục Giáo Phận.', date: new Date(year, 7, 8) });
        OptionFeasts.push({ name: 'Ngày thụ phong Giám mục của Đức Giám mục Giáo Phận (2017)', date: new Date(year, 4, 31) });
        OptionFeasts.push({ name: 'Ngày giỗ Đức Cố Giám mục Bartôlômêô (+2003).', date: new Date(year, 5, 9) });
        OptionFeasts.push({ name: 'Ngày giỗ Đức Cố Giám mục Simon Hòa (+1973).', date: new Date(year, 8, 5) });
        OptionFeasts.push({ name: 'Ngày Đức Cha Antôn nghỉ hưu (2019).', date: new Date(year, 8, 14) });
        OptionFeasts.push({ name: 'Ngày thụ phong Giám mục của Đức Cha Antôn.', date: new Date(year, 9, 1) });
        OptionFeasts.push({ name: 'Kỷ niệm ngày thiết lập Giáo phận (24 và 27.11.1960).', date: new Date(year, 10, 24) });
         

        // Lọc ra các ngày lễ trùng với ngày truyền vào
        const matchingFeasts = OptionFeasts.filter(feast => isSameDate(feast.date, inputDate));

        // Trả về các ngày lễ trùng với ngày truyền vào
        return matchingFeasts;
    }

    // Đưa hàm calculateOptionFeasts ra ngoài phạm vi toàn cục
    window.calculateOptionFeasts = calculateOptionFeasts;
})();
