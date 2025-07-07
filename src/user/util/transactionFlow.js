export function transactionFlow(data) {
    const monthMap = {
        JAN: '01', FEB: '02', MAR: '03', APR: '04',
        MAY: '05', JUN: '06', JUL: '07', AUG: '08',
        SEP: '09', OCT: '10', NOV: '11', DEC: '12'
    };

    function parseCustomDate(dateStr) {
        const [datePart, timePart, meridian] = dateStr.split(' ');
        const [day, mon, year] = datePart.split('-');
        const [hour, min, sec] = timePart.split('.');

        const fullYear = parseInt(year) < 50 ? '20' + year : '19' + year;
        let h = parseInt(hour);
        if (meridian === 'PM' && h !== 12) h += 12;
        if (meridian === 'AM' && h === 12) h = 0;

        return new Date(`${fullYear}-${monthMap[mon]}-${day.padStart(2, '0')}T${h.toString().padStart(2, '0')}:${min}:${sec}`);
    }

    return data
        .map(item => {
            const paymentDesc = item.DESCRIPTION;
            const amount =  item.TYPE === "LoanPayment" ? item.PAYAMOUNT : item.AMOUNT;
            const type = item.TYPE;
            const date = item.TRANSACTIONDATE;

            let flow;
            if (type.toLowerCase().includes("receiver")) {
                flow = "in";
            } else {
                flow = "out";
            }

            return {
                paymentDesc,
                amount,
                type,
                flow,
                transactionDate: date,
                parsedDate: parseCustomDate(date)
            };
        })
        .sort((a, b) => b.parsedDate - a.parsedDate); // Most recent first
}
