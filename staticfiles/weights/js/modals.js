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
    console.log('Entry with ID ' + entryId + ' deleted!');
    const url = `/api/weights/${entryId}/`;  
    const row = document.getElementById(`row${entryId}`);
    const selectedPersonId = document.getElementById("personSelect").value;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Entry deleted successfully');
            row.parentNode.removeChild(row);
            createChart(selectedPersonId);

        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors, show a message to the user, etc.
        });
    
    // Close the modal
    $('#deleteConfirmationModal').modal('hide');
}