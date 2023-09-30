// weight_tracker.js

document.addEventListener('DOMContentLoaded', function () {
    const personSelectForm = document.getElementById('personSelectForm');
    const weightTable = document.getElementById('weightTable');
    const weightTableBody = document.getElementById('weightTableBody');

    // Function to fetch weight entries for a selected person
    function fetchWeightEntries(selectedPersonId) {
        // Fetch weight entries for the selected person
        fetch(`/api/persons/${selectedPersonId}/weight_entries/`)
            .then((response) => response.json())
            .then((data) => {
                // Clear existing table rows
                weightTableBody.innerHTML = '';

                // Populate the table with weight entries
                data.forEach((entry) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${entry.date}</td><td>${entry.weight}</td>`;
                    weightTableBody.appendChild(row);
                });

                // Show the table
                weightTable.style.display = 'block';
            })
            .catch((error) => console.error('Error fetching weight entries:', error));
    }

    // Event listener for the form submission
    personSelectForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const selectedPersonId = document.getElementById('personSelect').value;
        fetchWeightEntries(selectedPersonId);
    });

    // Fetch and populate the dropdown with persons when the page loads
    fetch('/api/persons/')
        .then((response) => response.json())
        .then((data) => {
            const personSelect = document.getElementById('personSelect');
            data.forEach((person) => {
                const option = document.createElement('option');
                option.value = person.id;
                option.textContent = person.name;
                personSelect.appendChild(option);
            });
        })
        .catch((error) => console.error('Error fetching persons:', error));
});
