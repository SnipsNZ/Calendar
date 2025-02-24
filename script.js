document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");

    function createCalendar() {
        calendar.innerHTML = ""; // Clear existing days
        for (let i = 1; i <= 30; i++) { // Simple 30-day month
            let day = document.createElement("div");
            day.classList.add("day");
            day.innerHTML = `<strong>${i}</strong><br><textarea id="note-${i}" placeholder="Write here..."></textarea>`;
            calendar.appendChild(day);

            // Load saved notes
            let savedNote = localStorage.getItem(`note-${i}`);
            if (savedNote) {
                day.querySelector("textarea").value = savedNote;
            }

            // Save notes when typing
            day.querySelector("textarea").addEventListener("input", function() {
                localStorage.setItem(`note-${i}`, this.value);
            });
        }
    }

    createCalendar();
});
