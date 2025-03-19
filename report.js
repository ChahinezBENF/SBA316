// Capture Form Data 
const reportForm = document.getElementById("reportForm");

//make sure the programe is working 
if (!reportForm) {
    console.error("reportForm element not found!");
}


//show error if found
function showError(message) {
    errorDisplay.style.display = "block";
    const errorItem = document.createElement("p");
    errorItem.textContent = message;
    errorDisplay.appendChild(errorItem);

}


//hide error if not found
function hideError() {
    // Clear all error messages
    errorDisplay.innerHTML = "";
    errorDisplay.style.display = "none";
}


// first i have to get an immidiate feedback befot submit 
reportForm.addEventListener("input", function (e) {
    const field = e.target;
    hideError(); // Clear previous error message
    //* validate Report Information :
    // Validate Report Number
    if (field.name === "reportNum") {
        if (field.value.trim().length < 6) {
            showError("Report Number must be at least 6 characters long.");
            return;
        }
        if (!/^[A-Z]{2}-[A-Z]{3}-\d{3}$/.test(field.value)) {
            showError("Report Number can only contain uppercase letters, numbers, and dashes.");
            return;
        }
    }

    // Validate Inspection Date
    if (field.name === "reportDate") {
        const dateValue = new Date(field.value);
        const today = new Date();
        if (isNaN(dateValue.getTime()) || dateValue > today) {
            showError("Invalid Date ");
            return;
        }
    }

    // Name Validation for: director , inspector, Contractor, Departement responsible , planer
    if (field.name === "inspectorName" || field.name === "inspectorLastName" 
        || field.name === "directorName" || field.name === "directorLastName"
        || field.name === "contractorName" || field.name === "Bdepartement" || field.name === "planerName") {
        if (!/^[A-Za-z\s]+$/.test(field.value)) {
            showError(field, `${field.name} must contain only letters and spaces.`);
            return;
        }
    }

    if (field.name === "inspectorID") {
        if (!/^[A-Z0-9]+$/.test(field.value)) {
            showError("Inspector ID should contain only uppercase letters and numbers.");
            return;
        }
    }

   

    //* validate Project Information :
    // Validate Permit Number
    if (field.name === "permitNum") {
        if (!/^\d{9}-\d{2}-[A-Z]{2}\/[A-Z0-9]+-[A-Z]\d$/.test(field.value)) {
            showError("Permit Number must follow the format '321588082-01-NB/B00339711-I1'.", field);
            return;
        }
    }
    

    // * Validate Plan Information :
        //  Validate Revision number 
    if (field.name === "revisionNumber") {
        if (isNaN(field.value) || field.value <= 0) {
            showError("Revision Number must be a positive number.");
            return;
        }
    }
 
    
    if (field.name === "planDate") {
        const dateValue = new Date(field.value);
        const today = new Date();
        if (isNaN(dateValue.getTime()) || dateValue > today) {
            showError("Invalid Date");
            return;
        }
    }
});


reportForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const requiredFields = [
        "reportNum", "reportDate", "inspectorName", "inspectorLastName",
        "inspectorID", "directorName", "directorLastName", "projectName",
        "permitNum", "address", "contractorName", "planerName", "revisionNumber",
        "Bdepartement", "planDate"
    ];

    for (let fieldName of requiredFields) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (!field || field.value.trim() === "") {
            alert(`Please fill in the ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
            return;
        }
    }

    // Validate Plan Sheet dropdowns
    const Results = document.querySelectorAll('.planResult');
    for (let result of Results) {
        if (!result.value || result.value === "Select" || result.value.trim() === "") {
            alert("Please select a valid option for all Plan Sheet observations.");
            return;
        }
    }

    // Save form data in an object
    const formData = {
        reportNum: document.querySelector('[name="reportNum"]').value,
        reportDate: document.querySelector('[name="reportDate"]').value,
        inspectorName: document.querySelector('[name="inspectorName"]').value,
        inspectorLastName: document.querySelector('[name="inspectorLastName"]').value,
        inspectorID: document.querySelector('[name="inspectorID"]').value,
        directorName: document.querySelector('[name="directorName"]').value,
        directorLastName: document.querySelector('[name="directorLastName"]').value,
        projectName: document.querySelector('[name="projectName"]').value,
        permitNum: document.querySelector('[name="permitNum"]').value,
        address: document.querySelector('[name="address"]').value,
        contractorName: document.querySelector('[name="contractorName"]').value,
        planerName: document.querySelector('[name="planerName"]').value,
        revisionNumber: document.querySelector('[name="revisionNumber"]').value,
        Bdepartement: document.querySelector('[name="Bdepartement"]').value,
        planDate: document.querySelector('[name="planDate"]').value
    };

    // Capture Plan Sheet Results
    const planSheetResults = [];
    const planResults = document.querySelectorAll('.planResult');
    planResults.forEach((result) => {
        planSheetResults.push({
            observation: result.parentElement.previousElementSibling.textContent.trim(),
            result: result.value
        });
    });

    formData.planSheetResults = planSheetResults;

    // Store the data in localStorage
    localStorage.setItem('inspectionReport', JSON.stringify(formData));

    // Redirect to the final report display page
    window.location.href = 'presentation.html'; // Change the URL to the final report page
});