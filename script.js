document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const prevYearBtn = document.getElementById("prevYear");
    const nextYearBtn = document.getElementById("nextYear");

    let currentDate = new Date();

    function createCalendar(year, month) {
        calendar.innerHTML = ""; // Clear previous calendar

        let firstDay = new Date(year, month, 1).getDay(); 
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

        // Adjust first day (make Monday=0, Sunday=6)
        firstDay = (firstDay === 0) ? 6 : firstDay - 1;

        // Ensure the calendar grid has exactly 7 columns
        calendar.style.display = "grid";
        calendar.style.gridTemplateColumns = "repeat(7, 1fr)";

        // Fill empty slots before the first day
        for (let i = 0; i < firstDay; i++) {
            let emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty-day");
            calendar.appendChild(emptyDiv);
        }

        // Generate days
        for (let day = 1; day <= daysInMonth; day++) {
            let dayDiv = document.createElement("div");
            dayDiv.classList.add("day");

            // Highlight today
            let today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayDiv.classList.add("today");
            }

            dayDiv.innerHTML = `<strong>${day}</strong><br><textarea id="note-${year}-${month}-${day}" placeholder="Write here..."></textarea>
            <button class="clear-btn" data-key="note-${year}-${month}-${day}">X</button>`;
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

            // Clear button functionality
            dayDiv.querySelector(".clear-btn").addEventListener("click", function() {
                localStorage.removeItem(this.getAttribute("data-key"));
                dayDiv.querySelector("textarea").value = "";
            });
        }
    }

    // Navigation
    prevMonthBtn.addEventListener("click", () => changeMonth(-1));
    nextMonthBtn.addEventListener("click", () => changeMonth(1));
    prevYearBtn.addEventListener("click", () => changeYear(-1));
    nextYearBtn.addEventListener("click", () => changeYear(1));

    function changeMonth(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }

    function changeYear(offset) {
        currentDate.setFullYear(currentDate.getFullYear() + offset);
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }

    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
