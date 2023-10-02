// chart
var weightChart;
console.log("loading charts");
function createChart(selectedPersonId){
    console.log(`selected person: ${selectedPersonId}`);
    // Fetch data from your DRF API
    fetch(`/api/persons/${selectedPersonId}/weights`)
        .then(response => response.json())
        .then(data => {
            // Prepare data for Chart.js
            const labels = data.map(Weight => Weight.w_date);
            const values = data.map(Weight => Weight.weight);

            // Create a Chart.js chart
            const ctx = document.getElementById('myChart').getContext('2d');
            if (!weightChart){
                weightChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Weights',
                            data: values,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                });
            }
            else {
                
                weightChart.data.labels = labels;
                weightChart.data.datasets[0].data = values;
                weightChart.update()
            };
            
        })
        .catch(error => console.error('Error fetching data:', error));
    };