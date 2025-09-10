/////////////////////////


// Get dropdown and table body
const planSelect = document.querySelector('select[name="plan"]');
const tableBody = document.querySelector('#Row4 tbody');

// Map Inspection Subject to corresponding observations
const observationsMap = {
    "STRUCTURAL COLD-FORMED STEEL [BC 1704.3.4]": [
        "MATERIAL IDENTIFICATION: VERIFY TYPE & GRADE (AISI200)",
        "MATERIAL IS CLEAN, STRAIGHT AND UNDAMAGED.",
        "MEMBER SIZES CONFORM TO THE APPROVED CONSTRUCTION DOCUMENTS.",
        "MEMBER LAYOUT CONFORMS TO THE APPROVED CONSTRUCTION DOCUMENTS.",
        "PROPER FASTERNERS FOR JOINTS, COMPONENT & ASSEMBLIES",
        "ADEQUATE PLANS AVAILABLE ",
        "CONNECTING ELEMENTS",
        "WEB STIFFENERS, BRIDGING, BLOCKING, ARE INSTALLED IN ACCORDANCE WITH THE APPROVED.",
        "PROPER STORAGE",
        "USE QUALIFIED WELDERS",
        "WELDING TECHNIQUES, SIZE, LENGTH & LOCATION ",
        "WELDS MEET VISUAL ACCEPTANCE CRITERIA",
        "STRUCTURAL STEEL DETAILS ",
        "ANCHOR RODS & OTHER EMBEDMENTS SUPPORITNG STRUCTURAL STEEL",
        "STRUCTURAL STEEL SHOP DRAWINGS"
    ],
    "FENESTATION AREAS [IIA-5] , FNESTRATION AIR LEAKAGE [IIA-4] ,FNESTRATION THERMAL VALUES AND PRODUCT RATINGS [IIA-3] ": [
        "DID DIMENSIONS OF DOORS IN COMPLIANCE WITH CONSTRUCTION DOCUMENTS?",
        "DID DIMENSIONS OF WINDOS AND IN COMPLIANCE WITH CONSTRUCTION DOCUMENTS? ",
        "DID DOORS AND WINDOWS ASSEMBLIES INSTALLED FOR SLIDING OR SWINGING DOORS ARE LISTED AND LABELED TO THE REFERENCED STANDARD.",
        "DO WINDOW AND DOOR NFRC LABELS INDICATE AIR INFILTRATION RATES IN COMPLIANCE WITH APPLICABLE CODE SECTIONS? INDICATE ALL VALUES FOUND FOR EACH UNIT TYPE. ",
        "ARE THE U-FACTORS AND SHGC VALUES OF INSTALLED FENESTRATION IN CONFORMANCE WITH THE U-FACTORS AND SHGC VALUES IDENTIFIED IN THE CONSTRUCTION DRAWING."
    ],
    "INSULATION PLACEMENT & R VALUES (IA2) , (IIA2)": [
        "ARE R-VALUES MARKED ON ALL INSTALLED INSULATION PRODUCTS OR PRODUCT CERTIFICATION FOR UNMARKED PRODUCTS PROVIDED?",
        "DO ALL R-VALUES CONFORM TO THE APPROVED CONSTRUCTION DOCUMENTS FOR ALL ENVELOPE CONDITIONS INCLUDING BUT NOT LIMITED TO: WALLS / FOUNDATIONS ",
        "IS ALL INSULATION INSTALLED ACCORDING TO MANUFACTURER’S INSTRUCTIONS?"
    ],
    "SMASONRY [BC 1704.5].": [
        "** Approved plans **",
        "Materials Compliance with submittals, storage & protection from weather",
        "Thickness of walls & size of bond beams",
        "Reinforcing steel: grade, size, location, spacing, clearance and placement within allowable tolerance",
        "Connections :( size and location) joist anchors, number of bolts, dowels, stirrups, ties",
        "Placement of headers and lintels of material other than masonry",
        "** Mortar compliance by type and use **",
        "Manufacturers mortar mixing specifications followed (proportions and time of mixing)",
        "Mixer operating properly",
        "Batch of mortar used within correct time limits",
        "Mortar is not excessively retempered",
        "Mortar samples taken",
        "** Grout design mix or proportions **",
        "Consistency (Slump)",
        "Proper consolidation",
        "Grout samples taken",
        "Batch of grout used within correct time limits",
        "Placement method, high lift or low lift",
        "",
        "all head, bed and wall joints are Watertight, Correct size, Properly filled & buttered with mortar",
        "Vertical alignment and continuity of cells",
        "Cleanout openings for pours over 5' - 4'' ",
        "Position/securing of reinforcement",
        "Control joint location and reinforcement",
        "Prism specimens made for testing",
        "Contractor made the necessary arrangements for severe weather conditions",
        "Walls protected from rain and inclement weather on a daily basis"
    ],
    "MASONRY [BC 1704.5].": [
        "COLD FORMED OBSERVATION 1",
        "COLD FORMED OBSERVATION 2"
    ],
    "MASONRY [BC 1704.5].": [
        "COLD FORMED OBSERVATION 1",
        "COLD FORMED OBSERVATION 2"
    ],
    "MASONRY [BC 1704.5].": [
        "COLD FORMED OBSERVATION 1",
        "COLD FORMED OBSERVATION 2"
    ],
    "MASONRY [BC 1704.5].": [
        "COLD FORMED OBSERVATION 1",
        "COLD FORMED OBSERVATION 2"
    ],
    "MASONRY [BC 1704.5].": [
        "COLD FORMED OBSERVATION 1",
        "COLD FORMED OBSERVATION 2"
    ],
};

// Update table dynamically on dropdown change
planSelect.addEventListener('change', function () {
    const selectedSubject = planSelect.value;

    // Clear previous rows
    tableBody.innerHTML = '';

    if (!selectedSubject || !observationsMap[selectedSubject]) return;

    // Create rows dynamically
    observationsMap[selectedSubject].forEach((obs, index) => {
        const row = document.createElement('tr');

        // Observation cell
        const obsCell = document.createElement('td');
        obsCell.textContent = obs;
        row.appendChild(obsCell);

        // Result cell with select
        const resultCell = document.createElement('td');
        const select = document.createElement('select');
        select.name = `result${index + 1}`;
        select.classList.add('planResult');

        ["", "N/A", "PASS", "Fail"].forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        });

        resultCell.appendChild(select);
        row.appendChild(resultCell);

        tableBody.appendChild(row);
    });
});



//////////////////////////////

// Capture Form Data 
const reportForm = document.getElementById("reportForm");
console.log(reportForm);

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

// Get Lable name for each inpute 
function getLabelName(fieldName) {

    const label = document.querySelector(`label[for="${fieldName}"]`);

    return label ? label.textContent.trim() : fieldName;
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

    // i made a change on my code to reflect to the requirement 
    //Modify at least one attribute of an element in response to user interaction.
    if (field.name === "inspectorID") {
        if (!/^[A-Z0-9]+$/.test(field.value)) {
            field.setAttribute("aria-invalid", "true"); // Modifies the 'aria-invalid' attribute to indicate invalid input
            showError("Inspector ID should contain only uppercase letters and numbers.");
            return;
        } else {
            field.setAttribute("aria-invalid", "false"); // Ensures the attribute reflect valid input
        }
    }
    // if (field.name === "inspectorID") {
    //     if (!/^[A-Z0-9]+$/.test(field.value)) {
    //         showError("Inspector ID should contain only uppercase letters and numbers.");
    //         return;
    //     }
    // }



    //* validate Project Information :
    // Validate Permit Number
    if (field.name === "permitNum") {
        if (!/^\d{9}-\d{2}-[A-Z]{2}\/[A-Z0-9]+-[A-Z]\d$/.test(field.value)) {
            showError("Permit Number must follow the format '123456789-01-NB/A12345678-I1'.", field);
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


//////////////////////////

// Notes Section
const notesContainer = document.getElementById("notesContainer");
const addNoteBtn = document.getElementById("addNoteBtn");

let noteIndex = 0;
addNoteBtn.addEventListener("click", () => {
    noteIndex++;
    const noteBlock = document.createElement("div");
    noteBlock.classList.add("mb-3", "border", "p-2", "rounded");
    noteBlock.innerHTML = `
        <label class="fw-bold">Note ${noteIndex}</label>
        <input type="text" name="noteTitle${noteIndex}" class="form-control mb-2" placeholder="Enter a title for this note" />
        <input type="file" name="noteImage${noteIndex}" class="form-control mb-2" accept="image/*" />
        <textarea name="note${noteIndex}" class="form-control mb-2" rows="2" placeholder="Write your note..."></textarea>`;
    notesContainer.appendChild(noteBlock);
});

///////////////////////////

reportForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const requiredFields = [
        "reportNum", "reportDate", "inspectorName", "inspectorLastName",
        "inspectorID", "directorName", "directorLastName", "projectName",
        "permitNum", "address", "contractorName", "planerName", "revisionNumber",
        "Bdepartement", "planDate", "plan"
    ];

    for (let fieldName of requiredFields) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (!field || field.value.trim() === "") {
            alert(`Please fill in the ${getLabelName(fieldName)}.`);
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
        planDate: document.querySelector('[name="planDate"]').value,
        plan: document.querySelector('[name="plan"]').value,
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

    /////////////////
    // Collect notes & pictures
    const notes = [];
    const noteBlocks = document.querySelectorAll("#notesContainer > div");

    function processNotes(index = 0) {
        if (index >= noteBlocks.length) {
            formData.notes = notes;

            // Save and redirect
            localStorage.setItem('inspectionReport', JSON.stringify(formData));
            window.location.href = 'presentation.html';
            return;
        }

        const block = noteBlocks[index];
        const title = block.querySelector(`input[name^="noteTitle"]`).value.trim();
        const text = block.querySelector("textarea").value.trim();
        const fileInput = block.querySelector("input[type='file']");
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                notes.push({ title, text, image: e.target.result }); // Save title + text + Base64 image
                processNotes(index + 1);
            };
            reader.readAsDataURL(file);
        } else {
            notes.push({ title, text, image: "" });
            processNotes(index + 1);
        }
    }

    processNotes();
    /////////////

    // Store the data in localStorage
    localStorage.setItem('inspectionReport', JSON.stringify(formData));

    // Redirect to the final report display page
    window.location.href = 'presentation.html'; // Change the URL to the final report page
});
