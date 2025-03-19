

document.addEventListener('DOMContentLoaded', () => {
    const reportResult1 = document.getElementById('reportResult1');
    const reportResult2 = document.getElementById('reportResult2');
    const reportResult3 = document.getElementById('reportResult3');
    const reportResult4 = document.getElementById('reportResult4');
    const inspectionData = localStorage.getItem('inspectionReport');
    console.log(localStorage.getItem('inspectionReport'));

    if (inspectionData) {
        const data = JSON.parse(inspectionData); // Convert JSON string back into an object
        reportResult1.innerHTML = `
            <p><strong>Report Number :</strong> ${data.reportNum}</p>
            <p><strong>Project Name :</strong> ${data.projectName}</p>
            <p><strong>Inspection Date :</strong> ${data.reportDate}</p>`;
        reportResult2.innerHTML = `
            <p><strong>Project Name :</strong> ${data.projectName}</p>
            <p><strong>Permit Number :</strong> ${data.permitNum}</p>
            <p><strong>Project Address :</strong> ${data.address}</p>
            <p><strong>General Contractor :</strong> ${data.contractorName}</p> `; 
        reportResult3.innerHTML = `
            <p><strong>Planed By :</strong> ${data.planerName}</p>
            <p><strong>Revision Number :</strong> ${data.revisionNumber}</p>
            <p><strong>Buillding Department :</strong> ${data.Bdepartement}</p>
            <p><strong>Plan or Revision Approval Date :</strong> ${data.Bdepartement}</p> `; 
        data.planSheetResults.forEach(item => {
                reportResult4.innerHTML += `
                    <tr>
                        <td><p>${item.observation}</p></td>
                        <td><p></strong>: ${item.result}</strong></p></td>
                    </tr>`;
            });
          
        
    } else {
        reportResult1.innerHTML = '<p>No inspection data available.</p>';
        reportResult2.innerHTML = '<p>No inspection data available.</p>';
        reportResult3.innerHTML = '<p>No inspection data available.</p>';
        reportResult4.innerHTML = '<p>No inspection data available.</p>';
    }

});