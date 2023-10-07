// Confirm Deletion Modals
function confirmDelete(entryId) {
    console.log(`you clicked delete! heres the ID: ${entryId}`);
    // Set the entry ID in the modal for reference
    $('#deleteConfirmationModal').data('entry-id', entryId);
    
    // Show the modal
    $('#deleteConfirmationModal').modal('show');
};


function deleteEntry() {
    // Get the entry ID from the modal data
    var entryId = $('#deleteConfirmationModal').data('entry-id');
    
    // Delete ID, refresh table and chart

    console.log('Entry with ID ' + entryId + ' deleting');

    const url = `/api/weights/${entryId}/`;  
    const row = document.getElementById(`row${entryId}`);
    const selectedPersonId = document.getElementById("personSelect").value;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token from the cookie
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else if (response.ok){
            console.log('Entry deleted successfully');
            row.parentNode.removeChild(row);
            createChart(selectedPersonId);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors, show a message to the user, etc.
    });
    
    // Close the modal
    $('#deleteConfirmationModal').modal('hide');
}


    // Function to get the CSRF token from the cookie
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }