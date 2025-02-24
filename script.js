body {
    font-family: Arial, sans-serif;
    text-align: center;
}

.calendar-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

#calendar-container {
    width: 700px;
    margin: 0 auto;
}

#weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-weight: bold;
    background: #ddd;
    padding: 10px 0;
}

#weekdays div {
    text-align: center;
}

#calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin-top: 5px;
}

.day {
    border: 1px solid #ccc;
    padding: 10px;
    min-height: 100px;
    background: #f9f9f9;
    position: relative;
}

.day strong {
    display: block;
    margin-bottom: 5px;
}

textarea {
    width: 100%;
    height: 50px;
    font-size: 14px;
    border: none;
    resize: none;
    background: transparent;
}
