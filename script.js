document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const exportBtn = document.getElementById("exportNotes");
    const importBtn = document.getElementById("importNotes");
    const fileInput = document.getElementById("fileInput");

    let currentDate = new Date();

    function createCalendar(year, month) {
        calendar.innerHTML = "";

        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

        firstDay = (firstDay === 0) ? 6 : firstDay - 1;

        calendar.style.display = "grid";
        calendar.style.gridTemplateColumns = "repeat(7, 1fr)";

        for (let i = 0; i < firstDay; i++) {
            let emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty-day");
            calendar.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let dayDiv = document.createElement("div");
            dayDiv.classList.add("day");

            let today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayDiv.classList.add("today");
            }

            let noteKey = `note-${year}-${month}-${day}`;
            dayDiv.innerHTML = `<strong>${day}</strong><br>
                <textarea id="${noteKey}" placeholder="Write here..."></textarea>
                <button class="clear-btn" data-key="${noteKey}">X</button>`;

            calendar.appendChild(dayDiv);

            let savedNote = localStorage.getItem(noteKey);
            if (savedNote) {
                dayDiv.querySelector("textarea").value = savedNote;
            }

            dayDiv.querySelector("textarea").addEventListener("input", function() {
                localStorage.setItem(noteKey, this.value);
            });

            dayDiv.querySelector(".clear-btn").addEventListener("click", function() {
                localStorage.removeItem(noteKey);
                dayDiv.querySelector("textarea").value = "";
            });
        }
    }

    prevMonthBtn.addEventListener("click", () => changeMonth(-1));
    nextMonthBtn.addEventListener("click", () => changeMonth(1));

    function changeMonth(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }

    // 🔹 Export Notes as JSON File
    exportBtn.addEventListener("click", function() {
        let allNotes = {};
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith("note-")) {
                allNotes[key] = localStorage.getItem(key);
            }
        }

        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allNotes));
        let downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "calendar_notes.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });

    // 🔹 Import Notes from JSON File
    importBtn.addEventListener("click", function() {
        fileInput.click();
    });

    fileInput.addEventListener("change", function(event) {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = function(e) {
            let importedNotes = JSON.parse(e.target.result);
            for (let key in importedNotes) {
                localStorage.setItem(key, importedNotes[key]);
            }
            createCalendar(currentDate.getFullYear(), currentDate.getMonth());
        };

        reader.readAsText(file);
    });

    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
