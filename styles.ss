body {
    font-family: Arial, sans-serif;
    text-align: center;
}

#calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    max-width: 700px;
    margin: 20px auto;
}

.day {
    border: 1px solid #ccc;
    padding: 20px;
    min-height: 100px;
    cursor: pointer;
    background: #f9f9f9;
}

.day:hover {
    background: #e0e0e0;
}
