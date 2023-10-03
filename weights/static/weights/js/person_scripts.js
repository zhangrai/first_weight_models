// weight_tracker.js

document.addEventListener('DOMContentLoaded', function () {
    const personSelectForm = document.getElementById('personSelectForm');
    const weightTable = document.getElementById('weightTable');
    const weightTableBody = document.getElementById('weightTableBody');
    const addWeightForm = document.getElementById('addEntry');

    // Function to fetch weight entries for a selected person
    function fetchWeightEntries(selectedPersonId) {
        // Fetch weight entries for the selected person
        fetch(`/api/persons/${selectedPersonId}/weights/`)
            .then((response) => response.json())
            .then((data) => {
                // Clear existing table rows
                weightTableBody.innerHTML = '';

                // change addform displayer to show
                const addWeightFormContainer = document.getElementById("addWeightFormContainer");
                addWeightFormContainer.style.display = "block"

                // Populate the table with weight entries
                data.forEach((entry) => {
                    console.log(entry)

                    // create new row, with 3 new buttons
                    const row = document.createElement('tr');
                    row.id = `row${entry.id}`;
                    const editButton = document.createElement('button');
                    const deleteButton = document.createElement("button");
                    const cancelButton = document.createElement("button");

                    // Edit button 
                    editButton.textContent="Edit";
                    editButton.classList.add('btn','btn-primary');
                    const editButtonCell = document.createElement('td');
                    editButton.id = entry.id;
                    editButtonCell.appendChild(editButton);
                    editButton.addEventListener("click",editButtonHandler);

                    // delete button
                    deleteButton.textContent="Delete";
                    deleteButton.classList.add('btn','btn-primary');
                    const deleteButtonCell = document.createElement('td');
                    deleteButton.id = entry.id;
                    deleteButtonCell.appendChild(deleteButton);
                    deleteButton.addEventListener("click",function(){
                        confirmDelete(deleteButton.id);
                    });

                    // cancel button
                    cancelButton.textContent = "Cancel";
                    const cancelButtonCell = document.createElement("td");
                    cancelButton.id = `cancel${entry.id}`;
                    cancelButtonCell.appendChild(cancelButton);
                    cancelButton.addEventListener("click",cancelButtonHandler);
                    cancelButton.style.display = "none";

                    // create cell data
                    const dateCell = document.createElement('td');
                    dateCell.textContent= entry.w_date;

                    const weightCell = document.createElement('td');
                    weightCell.textContent = entry.weight;

                    // populate row

                    row.appendChild(dateCell);
                    row.appendChild(weightCell);
                    row.appendChild(editButtonCell);
                    row.appendChild(deleteButtonCell);
                    row.appendChild(cancelButtonCell);

                    // append row to table
                    weightTableBody.appendChild(row);
                });

                // Show the table
                weightTable.style.display = 'block';
            })
            .catch((error) => console.error('Error fetching weight entries:', error));
    }
    // Will change row fields to input
    function editButtonHandler(event){
        const buttonId = this.id;
        const row = event.target.closest("tr");
        const rowId = row.id;
        const dateCell = row.cells[0];
        const weightCell = row.cells[1];
        const selectedPersonId = document.getElementById('personSelect').value;
        const cancelButton = document.getElementById(`cancel${buttonId}`);

        if (this.textContent == "Edit"){
            //  if Edit button pressed, create input forms for date and weight then change text of button to "save"
            var weightForm = document.createElement("input");
            weightForm.type = "number"
            weightForm.value = weightCell.textContent;

            var dateForm = document.createElement("input");
            dateForm.type = "date";
            dateForm.value = dateCell.textContent;

            dateCell.innerHTML  = "";
            dateCell.appendChild(dateForm);

            weightCell.innerHTML = "";
            weightCell.appendChild(weightForm);

            // show cancel button
            cancelButton.style.display = "block";

            this.textContent = "Save";
        }
        else if (this.textContent == "Save"){
            // if save button pressed, handle saving of data
            const inputWeight = weightCell.querySelector("input");
            const inputDate = dateCell.querySelector("input");
            const url = `/api/weights/${buttonId}/`;
            
            data = {
                w_date:inputDate.value,
                weight:inputWeight.value,
            };
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // SUCCESS prompt- show values of data instead of forms, change button to "edit" and hide cancel button. updates chart
                console.log('Success:', data);

                dateCell.innerHTML = "";
                dateCell.textContent = data.w_date;

                weightCell.innerHTML = "";
                weightCell.textContent = data.weight;

                this.textContent = "Edit";

                // show cancel button
                cancelButton.style.display = "none";

                createChart(selectedPersonId)

            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors, show a message to the user, etc.
            });
            }
            
        else{
            console.log("else statement made");
        }

    }


    function cancelButtonHandler(event){
        
        // repopulate cells with original data
        entryId = this.id.substring(6);
        row = event.target.closest("tr");
        const dateCell = row.cells[0];
        const weightCell = row.cells[1];
        const editCell = row.cells[2];
        url = `/api/weights/${entryId}/`;
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // remake cells into textContent
            const editButton = editCell.querySelector("button");
            editButton.textContent = "Edit";

            dateCell.innerHTML = "";
            dateCell.textContent = data.w_date;

            weightCell.innerHTML = "";
            weightCell.textContent = data.weight;
            
            this.style.display = "none";
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors, show a message to the user, etc.
        });
    }
    // Event listener for the form submission
    personSelectForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const selectedPersonId = document.getElementById('personSelect').value;
        fetchWeightEntries(selectedPersonId);
        createChart(selectedPersonId);
    });

    document.getElementById('addWeightForm').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("activating addweightForm");
        const date = document.getElementById('inputDate').value;
        const weight  = document.getElementById('inputWeight').value;
        const selectedPersonId = document.getElementById('personSelect').value;
        context = {
            weight:weight,
            w_date:date,
            person: selectedPersonId,
        };
        console.log(context);
        // AJAX request using fetch
        fetch('/api/weights/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            body: JSON.stringify(context),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle success, e.g., show a success message
            console.log('Weight created successfully', data);
            fetchWeightEntries(selectedPersonId);
            createChart(selectedPersonId);
        })
        .catch(error => {
            // Handle error, e.g., display an error message
            console.error('Error creating weight', error);
        });

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
