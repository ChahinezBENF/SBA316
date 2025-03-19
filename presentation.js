

document.addEventListener('DOMContentLoaded', () => {
    const reportResult = document.getElementById('reportResult');
    const inspectionData = localStorage.getItem('inspectionReport');
    console.log(localStorage.getItem('inspectionReport'));

    if (inspectionData) {
        const data = JSON.parse(inspectionData); // Convert JSON string back into an object
        reportResult.innerHTML = `
            <p><strong>Report Number:</strong> ${data.reportNum}</p>
            <p><strong>Inspection Date:</strong> ${data.reportDate}</p>
            <p><strong>Inspector Name:</strong> ${data.inspectorName}</p>
            <!-- Add other fields  -->
        `;
    } else {
        reportResult.innerHTML = '<p>No inspection data available.</p>';
    }
});