document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");

    let currentDate = new Date();

    function createCalendar(year, month) {
        calendar.innerHTML = ""; // Clear previous days

        let firstDay = new Date(year, month, 1).getDay(); // Day of the week (0=Sunday)
        let daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in month
        
        // Adjust first day to start on Monday (0=Sunday → shift left)
        firstDay = (firstDay === 0) ? 6 : firstDay - 1;

        monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

        // Create blank spots for days before the first day
        for (let i = 0; i < firstDay; i++) {
            let emptyDiv = document.createElement("div");
            calendar.appendChild(emptyDiv);
        }

        // Generate days
        for (let day = 1; day <= daysInMonth; day++) {
            let dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.innerHTML = `<strong>${day}</strong><br><textarea id="note-${year}-${month}-${day}" placeholder="Write here..."></textarea>`;
            calendar.appendChild(dayDiv);

            // Load saved notes
            let savedNote = localStorage.getItem(`note-${year}-${month}-${day}`);
            if (savedNote) {
                dayDiv.querySelector("textarea").value = savedNote;
            }

            // Save notes when typing
            dayDiv.querySelector("textarea").addEventListener("input", function() {
                localStorage.setItem(`note-${year}-${month}-${day}`, this.value);
            });
        }
    }

    // Navigation Handlers
    prevMonthBtn.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    nextMonthBtn.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    // Initialize
    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
