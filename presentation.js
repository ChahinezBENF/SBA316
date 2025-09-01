

document.addEventListener('DOMContentLoaded', () => {
    const reportResult1 = document.getElementById('reportResult1');
    const reportResult2 = document.getElementById('reportResult2');
    const reportResult3 = document.getElementById('reportResult3');
    const reportResult4 = document.getElementById('reportResult4');
    const reportResult5 = document.getElementById('reportResult5');
    const reportResult6 = document.getElementById('reportResult6');
    const reportResult7 = document.getElementById('reportResult7');
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
            <p><strong>Plan By :</strong> ${data.planerName}</p>
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
        reportResult5.innerHTML = `
            <p> ${data.inspectorName}<hr><strong>INSPECTOR</strong></p>`;  
        reportResult6.innerHTML = `
            <p> ${data.directorName}<hr><strong>Reviewed By (Initial) </strong></p>`;  
        reportResult7.innerHTML = `
             <p><strong> Special Inspection Report for: </strong> ${data.plan}</p>`;        

        //  Render Notes & Pictures here
const notesContainer = document.getElementById('notesPicturesContainer');
if (data.notes && data.notes.length > 0) {
    data.notes.forEach(note => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("mb-3", "p-2", "border", "rounded");

        // Build content with Title, Image, and Note under image
        let content = "";

        if (note.title) {
            content += `<h5 style="margin-bottom:5px;">${note.title}</h5>`;
        }

        if (note.image) {
            content += `<img src="${note.image}" alt="Note Image" style="max-width:250px; display:block; margin:8px 0;">`;
        }

        if (note.text) {
            content += `<p style="margin-top:5px;"><strong>Note:</strong> ${note.text}</p>`;
        }

        noteDiv.innerHTML = content;
        notesContainer.appendChild(noteDiv);
    });
} else {
    notesContainer.innerHTML = "<p>No notes or pictures provided.</p>";
}
 
        
    } else {
        reportResult1.innerHTML = '<p>No inspection data available.</p>';
        reportResult2.innerHTML = '<p>No inspection data available.</p>';
        reportResult3.innerHTML = '<p>No inspection data available.</p>';
        reportResult4.innerHTML = '<p>No inspection data available.</p>';
        reportResult5.innerHTML = '<p>No inspection data available.</p>';
        reportResult6.innerHTML = '<p>No inspection data available.</p>';
    }



     //  Print Button functionality
    const printBtn = document.getElementById('printBtn');
    printBtn.addEventListener('click', () => {
        window.print();
    });

});


