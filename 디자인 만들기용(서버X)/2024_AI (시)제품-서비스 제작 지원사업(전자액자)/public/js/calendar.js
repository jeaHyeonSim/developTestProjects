"use strict";
//
/*document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const memoPopup = document.getElementById('memoPopup');
    const memoDetails = document.getElementById('memoDetails');
    const closeBtn = document.getElementsByClassName('close')[0];

    const memos = {
        '2024-07-14': '회의 준비',
        '2024-07-20': '프로젝트 마감일',
        '2024-07-25': '친구 생일',
        // 추가 메모...
    };

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 15);
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 15);

    const events = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        if (memos[dateStr]) {
            events.push({
                title: memos[dateStr],
                start: dateStr,
                description: memos[dateStr]
            });
        }
    }

    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'dayGrid' ],
        initialView: 'dayGridMonth',
        initialDate: today,
        events: events,
        eventClick: function(info) {
            memoDetails.innerText = info.event.extendedProps.description;
            memoPopup.style.display = 'block';
        }
    });

    calendar.render();

    closeBtn.onclick = function() {
        memoPopup.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == memoPopup) {
            memoPopup.style.display = 'none';
        }
    };
});*/


document.addEventListener('DOMContentLoaded', function() {
    calendar_rendering();
});

function calendar_rendering() {
    const today = new Date();

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        // height: '100%',
        // expandRows: true,
        locale: "ko",
        headerToolbar: {
            center: 'dayGridMonth timeGridWeek'
        },
        initialView: 'dayGridMonth',
        initialDate: today,
        // titleFormat: function (date) {
        //     year = date.date.year;
        //     month = date.date.month + 1;
        //
        //     return year + "년 " + month + "월";
        // },
        // views: {
        //     dayGridMonth: { // name of view
        //         titleFormat: { year: 'numeric', month: '2-digit' },
        //         // other view-specific options here
        //     }
        // }
    });
    calendar.render();
};