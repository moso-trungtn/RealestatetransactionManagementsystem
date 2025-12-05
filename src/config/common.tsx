/**
 * Mock Data Export for Real Estate Transaction Management System
 *
 * This file contains all mock data used throughout the application
 * for development and testing purposes.
 */

import { Transaction } from '@/types/schema';


export const languages = [
    {name: "EN", value: "en", code: "en-US"},
    {name: "VI", value: "vi", code: "vi-VN"},
]

export const navigations = [
    {roles: ["agent"],label: "Transactions", value: "transactions", icon: <></>},
    {roles: ["admin"],label: "Agent Management", value: "agent-management", icon: <></>},
    {roles: ["admin"],label: "Transaction Management", value: "transaction-management", icon: <></>},
    {roles: ["admin"],label: "Admin Settings", value: "admin-settings", icon: <></>},
    {roles: ["admin"],label: "PDF Form Builder", value: "builder", icon: <></>},

]

// ============================================================================
// TRANSACTIONS DATA
// ============================================================================

export const mockTransactions: Transaction[] = [
    {
        id: '1',
        clientName: 'Joan Morris',
        address: '45 Covington Road',
        city: 'Ventura',
        state: 'CA',
        zipCode: '93003',
        price: 825000,
        type: 'Purchase',
        status: 'Pre-contract',
        closingDate: 'Nov 21, 2025',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MTY3NTM5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        mlsNumber: '123456',
        modifiedDate: 'Sep 12, 2025'
    },
    {
        id: '2',
        clientName: 'Yaro Kallaberry',
        address: '55 Robin Blvd',
        city: 'Riverside',
        state: 'CA',
        zipCode: '96102',
        price: 2500000,
        type: 'Listing',
        status: 'Pre-contract',
        listDate: 'Sep 22, 2025',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZXxlbnwxfHx8fDE3NjE2Njg1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        mlsNumber: '123457',
        modifiedDate: 'Sep 11, 2025'
    },
    {
        id: '3',
        clientName: 'Mia Peplum',
        address: '62 Caledon Way',
        city: 'Ventura',
        state: 'CA',
        price: 3650000,
        type: 'Purchase',
        status: 'Pre-contract',
        image: 'https://images.unsplash.com/photo-1621693722835-44c9dcb724fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwcG9vbHxlbnwxfHx8fDE3NjE3MzI1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        mlsNumber: '123458',
        modifiedDate: 'Sep 11, 2025'
    },
    {
        id: '4',
        clientName: 'Valerie Sampleton',
        address: '88 Bay St, 212',
        city: 'Santa Monica',
        state: 'CA',
        price: 414000,
        type: 'Purchase',
        status: 'Under Contract',
        closingDate: 'Oct 28, 2025',
        image: 'https://images.unsplash.com/photo-1689574120966-c7b1e57a8cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMHByb3BlcnR5fGVufDF8fHx8MTc2MTcxNzE5NXww&ixlib=rb-4.1.0&q=80&w=1080',
        mlsNumber: '123459',
        modifiedDate: 'Sep 11, 2025',
        lostDeals: 1
    },
    {
        id: '5',
        clientName: 'Madeline Lance',
        address: '525 Cavaletti Lane, 201',
        city: 'Ventura',
        state: 'CA',
        zipCode: '91330',
        price: 2200,
        type: 'Lease Listing',
        status: 'Under Contract',
        closingDate: 'Oct 23, 2025',
        image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ1cmJhbiUyMGhvdXNlfGVufDF8fHx8MTc2MTcyNjg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
        mlsNumber: '123460',
        modifiedDate: 'Sep 11, 2025'
    },
    {
        id: '6',
        clientName: 'Elizabeth Browning',
        address: '45 Huntington Ave',
        city: 'Los Angeles',
        state: 'CA',
        price: 825000,
        type: 'Purchase',
        status: 'Closed',
        listDate: 'Nov 4, 2025',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaG9tZXxlbnwxfHx8fDE3NjE3MjA1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        mlsNumber: '123461',
        modifiedDate: 'Sep 11, 2025'
    }
];

// ============================================================================
// DOCUMENTS DATA
// ============================================================================

export const mockDocuments = [
    {
        id: '1',
        name: 'Buyer Representation and Broker Compensation Agreement - 8/25',
        type: 'pdf',
        modifiedDate: 'Oct 23, 2025',
        folder: 'not-filed',
        size: '2.4 MB',
        uploadedBy: 'Christine Babikian'
    },
    {
        id: '2',
        name: 'Seller Counter Offer #1 - 1/024',
        type: 'pdf',
        modifiedDate: 'Oct 23, 2025',
        folder: 'not-filed',
        size: '1.8 MB',
        uploadedBy: 'Christine Babikian'
    },
    {
        id: '3',
        name: 'California Residential Purchase Agreement - 6/25',
        type: 'pdf',
        modifiedDate: 'Oct 23, 2025',
        folder: 'not-filed',
        size: '3.2 MB',
        uploadedBy: 'Christine Babikian'
    },
    {
        id: '4',
        name: 'Buyer Counter Offer #1 - 1/024',
        type: 'pdf',
        modifiedDate: 'Oct 23, 2025',
        folder: 'not-filed',
        size: '1.5 MB',
        uploadedBy: 'Christine Babikian'
    }
];

// ============================================================================
// AGENTS DATA
// ============================================================================

export const mockAgents = [
    {
        id: '1',
        firstName: 'Christine',
        lastName: 'Babikian',
        email: 'christine.babikian@realty.com',
        phone: '(555) 234-5678',
        role: 'Listing Agent',
        licenseNumber: 'CA-123456',
        brokerageName: 'Premium Realty Group'
    },
    {
        id: '2',
        firstName: 'Michael',
        lastName: 'Rodriguez',
        email: 'michael.rodriguez@realty.com',
        phone: '(555) 234-5679',
        role: 'Buyer Agent',
        licenseNumber: 'CA-234567',
        brokerageName: 'Premier Properties Inc.'
    }
];

// ============================================================================
// LENDERS DATA
// ============================================================================

export const mockLenders = [
    {
        id: '1',
        name: 'First National Bank',
        contactPerson: 'Robert Thompson',
        email: 'robert.thompson@fnb.com',
        phone: '(555) 345-6789',
        role: 'Loan Officer',
        institution: 'First National Bank',
        loanType: 'Conventional',
        preApprovalAmount: 1000000
    }
];

// ============================================================================
// OTHER PARTIES DATA
// ============================================================================

export const mockOtherParties = [
    {
        id: '1',
        firstName: 'Jennifer',
        lastName: 'Martinez',
        email: 'jennifer.martinez@titleco.com',
        phone: '(555) 456-7890',
        role: 'Title Officer',
        company: 'Secure Title Company'
    },
    {
        id: '2',
        firstName: 'David',
        lastName: 'Chen',
        email: 'david.chen@inspection.com',
        phone: '(555) 567-8901',
        role: 'Home Inspector',
        company: 'Premier Home Inspections'
    }
];

// ============================================================================
// BUYERS DATA
// ============================================================================

export const mockBuyers = [
    {
        id: '1',
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'Anderson',
        email: 'john.anderson@email.com',
        phone: '(555) 123-4567',
        relationship: 'Primary Buyer',
        dateOfBirth: '03/15/1985',
        ssn: '***-**-4567'
    },
    {
        id: '2',
        firstName: 'Sarah',
        middleName: 'Elizabeth',
        lastName: 'Anderson',
        email: 'sarah.anderson@email.com',
        phone: '(555) 123-4568',
        relationship: 'Co-Buyer',
        dateOfBirth: '07/22/1987',
        ssn: '***-**-8901'
    }
];

// ============================================================================
// TO-DO LISTS DATA
// ============================================================================

export const mockTodoLists = [
    {
        id: '1',
        name: 'Firm Deal',
        items: [
            {
                id: '1-1',
                text: 'Obtain Signed Firm Docs from Listing Agent',
                completed: false,
                assignedTo: 'Christine Babikian',
                priority: 'high'
            }
        ]
    },
    {
        id: '2',
        name: 'Home Search',
        items: [
            {
                id: '2-1',
                text: 'Add Clients to MLS Listing Alerts',
                completed: false,
                assignedTo: 'Michael Rodriguez',
                priority: 'medium'
            },
            {
                id: '2-2',
                text: 'Obtain signed Buyers Rep Agreement',
                completed: false,
                assignedTo: 'Christine Babikian',
                priority: 'high'
            }
        ]
    },
    {
        id: '3',
        name: 'Offer Submitted',
        items: [
            {
                id: '3-1',
                text: 'Pause MLS Listing Alerts',
                completed: false,
                dueDate: 'Sep 17, 2025',
                assignedTo: 'Michael Rodriguez',
                priority: 'medium'
            },
            {
                id: '3-2',
                text: 'Submit Docs to Brokerage',
                completed: false,
                dueDate: 'Sep 17, 2025',
                assignedTo: 'Christine Babikian',
                priority: 'high'
            }
        ]
    }
];

// ============================================================================
// TIMELINE DATA
// ============================================================================

export const mockTimelineData = [
    {
        date: 'Sep 12',
        label: 'today',
        events: []
    },
    {
        date: 'Sep 16',
        label: '4 days away',
        events: [
            { id: '1', title: 'Offer', date: 'Sep 16', type: 'milestone' },
            { id: '2', title: 'Offer Expiration', date: 'Sep 16', type: 'deadline' }
        ]
    },
    {
        date: 'Sep 17',
        label: '5 days away',
        events: [
            { id: '3', title: 'Offer Acceptance', date: 'Sep 17', type: 'milestone' },
            { id: '4', title: 'Pause MLS Listing Alerts', date: 'Sep 17', type: 'task' },
            { id: '5', title: 'Submit Docs to Brokerage', date: 'Sep 17', type: 'task' }
        ]
    }
];

// ============================================================================
// HISTORY DATA
// ============================================================================

export const mockHistoryData = [
    {
        id: '1',
        action: 'Offer Details Modified',
        changedBy: 'Christine Babikian',
        date: 'Sep 12, 2025 09:14 AM',
        personId: '3db01994-ded7-4c6c-9199-e8a1e0e913a2',
        details: {
            offerDate: {
                old: 'Sep 15, 2025',
                new: 'Sep 16, 2025'
            }
        }
    },
    {
        id: '2',
        action: 'Property Details Modified',
        changedBy: 'Christine Babikian',
        date: 'Sep 12, 2025 09:13 AM',
        details: {
            field: 'address',
            old: '45 Covington Rd',
            new: '45 Covington Road'
        }
    },
    {
        id: '3',
        action: 'Document Deleted',
        changedBy: 'Christine Babikian',
        date: 'Sep 12, 2025 09:07 AM',
        details: {
            documentName: 'Old Agreement.pdf'
        }
    },
    {
        id: '4',
        action: 'Document Created',
        changedBy: 'Christine Babikian',
        date: 'Sep 12, 2025 09:06 AM',
        details: {
            documentName: 'California Residential Purchase Agreement - 6/25.pdf'
        }
    },
    {
        id: '5',
        action: 'Document Created',
        changedBy: 'Christine Babikian',
        date: 'Sep 12, 2025 09:06 AM',
        details: {
            documentName: 'Buyer Counter Offer #1 - 1/024.pdf'
        }
    },
    {
        id: '6',
        action: 'Document Created',
        changedBy: 'Christine Babikian',
        date: 'Sep 12, 2025 09:06 AM',
        details: {
            documentName: 'Seller Counter Offer #1 - 1/024.pdf'
        }
    },
    {
        id: '7',
        action: 'Document Created',
        changedBy: 'Christine Babikian',
        date: 'Sep 12, 2025 09:06 AM',
        details: {
            documentName: 'Buyer Representation and Broker Compensation Agreement - 8/25.pdf'
        }
    },
    {
        id: '8',
        action: 'Property Details Modified',
        changedBy: 'Christine Babikian',
        date: 'Sep 12, 2025 09:03 AM',
        details: {
            field: 'price',
            old: '$820,000',
            new: '$825,000'
        }
    },
    {
        id: '9',
        action: 'Template Applied',
        changedBy: 'Christine Babikian',
        date: 'Sep 12, 2025 09:03 AM',
        details: {
            templateName: 'Standard Purchase Template'
        }
    },
    {
        id: '10',
        action: 'Tx Pre-Created',
        changedBy: 'Christine Babikian',
        date: 'Sep 11, 2025 09:02 AM',
        details: {
            transactionType: 'Purchase'
        }
    }
];

// ============================================================================
// COMMISSION SPLIT DATA
// ============================================================================

export const mockCommissionSplit = {
    totalCommission: 50000,
    parties: [
        {
            id: '1',
            name: 'User 1',
            role: 'Broker',
            percentage: 10,
            amount: 5000
        },
        {
            id: '2',
            name: 'User 2',
            role: 'Buyer Agent',
            percentage: 15,
            amount: 7500
        },
        {
            id: '3',
            name: 'User 3',
            role: 'Listing Agent',
            percentage: 50,
            amount: 25000
        },
        {
            id: '4',
            name: 'Loan Factory',
            role: 'Referral Partner',
            percentage: 25,
            amount: 12500
        }
    ]
};

// ============================================================================
// ADMIN PROFILE DATA
// ============================================================================

export const mockAdminProfile = {
    // Personal Information
    profilePicture: '',
    firstName: 'Chau',
    lastName: 'Chau',
    middleName: '',
    personalEmail: 'chauchau.inc@gmail.com',
    personalPhone: '(322) 334-3455',
    legalFirstName: 'Legal_given_name',
    legalLastName: 'Legal_last_name',
    preferredLanguages: ['Albanian', 'Bengali', 'Cantonese Chinese', 'English', 'Russian', 'Vietnamese'],
    maritalStatus: 'Married',

    // Citizenship & Personal Details
    citizenship: 'US Citizen',
    ssn: '123-56-2656',
    dateOfBirth: '1/16/2001',

    // Personal Address
    personalStreetAddress: '1251 Sunset Boulevard',
    personalAptUnit: '',
    personalZipCode: '29169',
    personalState: 'SC',
    personalCounty: 'LEXINGTON',
    personalCity: 'West Columbia',

    // Mailing Address
    sameAsPersonalAddress: true,
    mailingStreetAddress: '1251 Sunset Boulevard',
    mailingAptUnit: '',
    mailingZipCode: '29169',
    mailingCity: 'West Columbia',

    // Others
    note: 'have not completed the profile yet. okla',
    password: '******'
};

// ============================================================================
// WEBSITE CONFIGURATION DATA
// ============================================================================

export const mockWebsiteConfig = {
    primaryColor: '#FF6B35',
    secondaryColor: '#FFFFFF',
    companyLogo: 'https://lh3.googleusercontent.com/zocKBfqQmYOuFFXc6NYKuZ3MdIFTRB__lFwK7W7d_9W1yuvL5YGsfs3kcW9sHwwLcV0tGac94myUm8oLV1gQjoCrMQmth-2Yvn3vPg',
    loadingIcon: 'spinner' as const,
    companyName: 'Real Estate Transaction Management',
    companyAddress: '123 Business St, Suite 100, Los Angeles, CA 90001',
    companyPhone: '(555) 123-4567',
    companyEmail: 'info@realestatemanagement.com'
};

// ============================================================================
// TRANSACTION FORM DATA
// ============================================================================

export const mockTransactionFormData = {
    transactionType: 'Purchase',
    fullName: 'Joan Morris',
    middleName: '',
    email: 'joan.morris@email.com',
    phone: '(555) 987-6543',
    relationship: 'Primary Buyer',
    streetAddress: '45 Covington Road',
    unit: '',
    zipCode: '93003',
    city: 'Ventura',
    state: 'CA',
    county: 'Ventura',
    propertyValue: '825000',
    salePrice: '825000',
    lastAgreed: '',
    purchasePrice: '825000',
    approvedDate: '',
    appraisalOrdered: false,
    escrowNumber: '123456',
    lenderName: 'First National Bank - Robert Thompson',
    mlsCoordinator: '',
    agentTeam: '',
    listingAgent: 'Christine Babikian',
    offerPurchasePrice: '$1,000,000.00',
    deposit: '$30,000.00',
    offerDate: 'Oct 22, 2025',
    offerExpirationDate: 'Oct 25, 2025',
    offerAcceptanceDate: '',
    finalWalkthroughDate: '',
    offerClosingDate: 'Nov 21, 2025',
    possessionDate: ''
};

// ============================================================================
// OFFER CONDITIONS DATA
// ============================================================================

export const mockOfferConditions = [
    {
        id: '1',
        name: 'Home Inspection',
        dueType: 'relative',
        relativeTimeframe: '10',
        relativeDate: 'Offer Acceptance',
        notes: 'Professional home inspection to be completed within 10 days of offer acceptance',
        status: 'pending'
    },
    {
        id: '2',
        name: 'Financing Approval',
        dueType: 'relative',
        relativeTimeframe: '30',
        relativeDate: 'Offer Acceptance',
        notes: 'Buyer must secure financing within 30 days',
        status: 'pending'
    },
    {
        id: '3',
        name: 'Appraisal',
        dueType: 'specific',
        specificDate: 'Nov 1, 2025',
        notes: 'Property must appraise at or above purchase price',
        status: 'pending'
    }
];

// ============================================================================
// TEMPLATE DATA
// ============================================================================

export const mockTemplates = [
    {
        id: '1',
        name: 'Standard Purchase Template',
        type: 'Purchase',
        description: 'Default template for standard residential purchase transactions',
        sections: ['Property Info', 'Client Info', 'Offer Details', 'Contingencies'],
        createdDate: 'Jan 15, 2025',
        lastModified: 'Feb 10, 2025',
        usageCount: 45
    },
    {
        id: '2',
        name: 'Listing Template',
        type: 'Listing',
        description: 'Template for new listing transactions',
        sections: ['Property Info', 'Seller Info', 'Listing Details', 'Marketing Plan'],
        createdDate: 'Jan 20, 2025',
        lastModified: 'Mar 5, 2025',
        usageCount: 32
    },
    {
        id: '3',
        name: 'Lease Agreement Template',
        type: 'Lease',
        description: 'Template for residential lease transactions',
        sections: ['Property Info', 'Tenant Info', 'Lease Terms', 'Conditions'],
        createdDate: 'Feb 1, 2025',
        lastModified: 'Feb 28, 2025',
        usageCount: 18
    }
];

// ============================================================================
// EXPORT ALL DATA
// ============================================================================

export const mockData = {
    transactions: mockTransactions,
    documents: mockDocuments,
    agents: mockAgents,
    lenders: mockLenders,
    otherParties: mockOtherParties,
    buyers: mockBuyers,
    todoLists: mockTodoLists,
    timeline: mockTimelineData,
    history: mockHistoryData,
    commissionSplit: mockCommissionSplit,
    adminProfile: mockAdminProfile,
    websiteConfig: mockWebsiteConfig,
    transactionFormData: mockTransactionFormData,
    offerConditions: mockOfferConditions,
    templates: mockTemplates
};

export default mockData;


