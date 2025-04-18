# workflow.py

# Workflow Steps
form_workflow_steps = [
    "welcome",
    "personal_details",
    "relative_details",
    "contact_details",
    "aadhaar_details",
    "address_details",
    "disability",
    "family_reference",
    "declaration"
]

# Mandatory Documents
form_mandatory_documents = []

# Workflow Prompts
form_prompts = {
    "welcome": "Welcome to the New Voter Registration Assistant! Let's check your eligibility to apply for a new Voter ID. Please answer the following questions:<br>1. Are you an Indian citizen? (Yes/No)<br>2. Are you at least 18 years old as of January 1st of this year? (Yes/No)<br>3. Are you applying for the first time for voter registration? (Yes/No)<br>4. Do you currently live at your present address for at least 6 months? (Yes/No)<br>5. Do you have valid documents for age and address proof? (Yes/No)",
    "personal_details": "Please provide your personal details:<br>1. Full Name (in official language):<br>2. Full Name (in English BLOCK LETTERS):<br>3. Gender (Male/Female/Third Gender):<br>4. Date of Birth (DD-MM-YYYY):<br>5. Upload age proof document:<br>6. Upload passport size photo (4.5 cm x 3.5 cm):",
    "relative_details": "Please provide a relative's details:<br>1. Relation Type with the relative(Father/Mother/Husband/Wife/Guardian/Guru):<br>2. Full Name of the relative(in official language):<br>3. Full Name of the relative(in English BLOCK LETTERS):",
    "contact_details": "Contact Details:<br>1. Mobile Number:<br>2. Email ID (if available):",
    "aadhaar_details": "Aadhaar Details:<br>Do you have Aadhaar? (Yes/No)<br>If Yes, enter Aadhaar Number:",
    "address_details": "Present Address Details:<br>1. House/Building/Apartment No.:<br>2. Street/Area/Mohalla:<br>3. Town/Village:<br>4. Post Office:<br>5. PIN Code:<br>6. Tehsil/Taluqa/Mandal:<br>7. District:<br>8. State/UT:<br>9. Since when are you residing here? (MM-YYYY):<br>10. Upload address proof:",
    "disability": "Disability Information (Optional):<br>1. Do you have any disability? (Yes/No)<br>If Yes:<br>2. Type of Disability:<br>3. Percentage of Disability:<br>4. Upload Certificate:",
    "family_reference": "Details of a family member already registered at the same address:<br>1. Name of family member:<br>2. Relationship:<br>3. EPIC (Voter ID) Number:",
    "declaration": "Declaration:<br>1. Place of Birth (Village/Town, District, State/UT):<br>2. Are you applying for the first time in any constituency? (Yes/No)<br>Type 'YES' to agree:<br>'I declare that the information provided is true to the best of my knowledge. I understand that any false information may lead to rejection under the Representation of the People Act, 1950.'"
}

# Workflow Fields
form_fields = {
    "welcome": [
        "isIndianCitizen",
        "is18YearsOld",
        "isFirstTimeApplicant",
        "isResidentSince6Months",
        "hasValidDocs"
    ],
    "personal_details": [
        "nameLocalLang",
        "nameEnglish",
        "gender",
        "dob",
        "ageProofUpload",
        "passportPhotoUpload"
    ],
    "relative_details": [
        "relationType",
        "relativeNameLocalLang",
        "relativeNameEnglish"
    ],
    "contact_details": [
        "mobileNumber",
        "email"
    ],
    "aadhaar_details": [
        "hasAadhaar",
        "aadhaarNumber"
    ],
    "address_details": [
        "houseNumber",
        "streetArea",
        "townVillage",
        "postOffice",
        "pinCode",
        "tehsil",
        "district",
        "state",
        "residenceSince",
        "addressProofUpload"
    ],
    "disability": [
        "hasDisability",
        "disabilityType",
        "disabilityPercentage",
        "disabilityCertificate"
    ],
    "family_reference": [
        "familyMemberName",
        "familyRelationship",
        "familyEpicNumber"
    ],
    "declaration": [
        "placeOfBirth",
        "isFirstTimeVoter",
        "formDeclaration"
    ]
}

# Validation Rules
form_validation_rules = {
    "welcome": {
        "questions": 5,
        "fields": [
            "isIndianCitizen",
            "is18YearsOld",
            "isFirstTimeApplicant",
            "isResidentSince6Months",
            "hasValidDocs"
        ],
        "valid_responses": [
            "Yes",
            "No"
        ],
        "patterns": {},
        "confirmation": True
    },
    "personal_details": {
        "questions": 0,
        "fields": [
            "nameLocalLang",
            "nameEnglish",
            "gender",
            "dob",
            "ageProofUpload",
            "passportPhotoUpload"
        ],
        "valid_responses": [],
        "patterns": {
            "dob": "^\\d{2}-\\d{2}-\\d{4}$"
        },
        "confirmation": True
    },
    "relative_details": {
        "questions": 0,
        "fields": [
            "relationType",
            "relativeNameLocalLang",
            "relativeNameEnglish"
        ],
        "valid_responses": [],
        "patterns": {},
        "confirmation": True
    },
    "contact_details": {
        "questions": 0,
        "fields": [
            "mobileNumber",
            "email"
        ],
        "valid_responses": [],
        "patterns": {
            "mobileNumber": "^\\d{10}$"
        },
        "confirmation": True
    },
    "aadhaar_details": {
        "questions": 0,
        "fields": [
            "hasAadhaar",
            "aadhaarNumber"
        ],
        "valid_responses": [],
        "patterns": {
            "aadhaarNumber": "^\\d{12}$"
        },
        "confirmation": True
    },
    "address_details": {
        "questions": 0,
        "fields": [
            "houseNumber",
            "streetArea",
            "townVillage",
            "postOffice",
            "pinCode",
            "tehsil",
            "district",
            "state",
            "residenceSince",
            "addressProofUpload"
        ],
        "valid_responses": [],
        "patterns": {
            "pinCode": "^\\d{6}$",
            "residenceSince": "^\\d{2}-\\d{4}$"
        },
        "confirmation": True
    },
    "disability": {
        "questions": 0,
        "fields": [
            "hasDisability",
            "disabilityType",
            "disabilityPercentage",
            "disabilityCertificate"
        ],
        "valid_responses": [],
        "patterns": {},
        "confirmation": True
    },
    "family_reference": {
        "questions": 0,
        "fields": [
            "familyMemberName",
            "familyRelationship",
            "familyEpicNumber"
        ],
        "valid_responses": [],
        "patterns": {},
        "confirmation": True
    },
    "declaration": {
        "questions": 0,
        "fields": [
            "placeOfBirth",
            "isFirstTimeVoter",
            "formDeclaration"
        ],
        "valid_responses": [],
        "patterns": {},
        "confirmation": True
    }
}

if __name__ == '__main__':
    print("Voter Form Filled up Successfully!")
