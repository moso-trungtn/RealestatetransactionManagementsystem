# Real Estate Transaction Management System - Data Schema Documentation

## Overview

This document provides comprehensive documentation of the data schema and mock data used in the Real Estate Transaction Management System. The system is designed to manage real estate transactions from initial contact through closing, with support for multiple transaction types, document management, commission tracking, and collaboration tools.

## Table of Contents

1. [Core Entities](#core-entities)
2. [Data Relationships](#data-relationships)
3. [Mock Data Structure](#mock-data-structure)
4. [Field Descriptions](#field-descriptions)
5. [Business Rules](#business-rules)
6. [Data Import/Export](#data-importexport)

---

## Core Entities

### 1. Transaction
The primary entity representing a real estate deal.

**Key Fields:**
- `id`: Unique identifier
- `type`: Purchase | Listing | Lease Listing | Lease
- `status`: Pre-contract | Under Contract | Closed
- `price`: Transaction value (sale price or lease amount)
- `address`, `city`, `state`, `zipCode`: Property location
- `clientName`: Primary client name
- `mlsNumber`: MLS listing number
- `closingDate`, `listDate`, `contractDate`: Important dates
- `image`: Property photo URL
- `modifiedDate`: Last modification timestamp
- `lostDeals`: Number of previous failed offers (optional)

**Count in Mock Data:** 6 transactions

---

### 2. Document
Files and paperwork associated with transactions.

**Key Fields:**
- `id`: Unique identifier
- `name`: Document filename
- `type`: File extension (pdf, doc, jpg, etc.)
- `modifiedDate`: Last modification date
- `folder`: Associated folder/category
- `size`: File size
- `uploadedBy`: User who uploaded the document

**Count in Mock Data:** 4 documents

**Folder Structure:**
- Default folders: "Not Filed"
- Custom folders can be created dynamically

---

### 3. Agents
Real estate agents involved in transactions.

**Key Fields:**
- `id`: Unique identifier
- `firstName`, `lastName`: Agent name
- `email`, `phone`: Contact information
- `role`: Listing Agent | Buyer Agent | Broker
- `licenseNumber`: State license number
- `brokerageName`: Associated brokerage

**Count in Mock Data:** 2 agents

---

### 4. Lenders
Financial institutions and loan officers.

**Key Fields:**
- `id`: Unique identifier
- `name`: Institution name
- `contactPerson`: Loan officer name
- `email`, `phone`: Contact information
- `role`: Position/title
- `institution`: Bank/lender name
- `loanType`: Type of financing
- `preApprovalAmount`: Pre-approved loan amount

**Count in Mock Data:** 1 lender

---

### 5. Other Parties
Additional parties involved (title officers, inspectors, etc.).

**Key Fields:**
- `id`: Unique identifier
- `firstName`, `lastName`: Party name
- `email`, `phone`: Contact information
- `role`: Title Officer | Home Inspector | Attorney, etc.
- `company`: Associated company

**Count in Mock Data:** 2 other parties

---

### 6. Buyers
Individual buyers/clients in a transaction.

**Key Fields:**
- `id`: Unique identifier
- `firstName`, `middleName`, `lastName`: Full name
- `email`, `phone`: Contact information
- `relationship`: Primary Buyer | Co-Buyer | Spouse
- `dateOfBirth`: Birth date (optional)
- `ssn`: Social security number (masked)

**Count in Mock Data:** 2 buyers

---

### 7. To-Do Lists
Task management and checklists.

**Key Fields:**
- `id`: Unique identifier
- `name`: List name (e.g., "Firm Deal", "Offer Submitted")
- `items`: Array of todo items

**Todo Item Structure:**
- `id`: Unique identifier
- `text`: Task description
- `completed`: Boolean status
- `dueDate`: Due date (optional)
- `assignedTo`: Assigned user (optional)
- `priority`: low | medium | high

**Count in Mock Data:** 3 lists with 6 total items

---

### 8. Timeline
Event timeline for transaction milestones.

**Key Fields:**
- `date`: Event date
- `label`: Relative time label (e.g., "today", "4 days away")
- `events`: Array of timeline events

**Timeline Event Structure:**
- `id`: Unique identifier
- `title`: Event name
- `date`: Event date
- `type`: milestone | deadline | task

**Count in Mock Data:** 3 days with 5 events

---

### 9. History
Audit trail of all transaction changes.

**Key Fields:**
- `id`: Unique identifier
- `action`: Description of what changed
- `changedBy`: User who made the change
- `date`: Timestamp of change
- `personId`: User ID (optional)
- `details`: Object containing old/new values

**Action Types:**
- Property Details Modified
- Offer Details Modified
- Document Created
- Document Deleted
- Template Applied
- Tx Pre-Created

**Count in Mock Data:** 10 history entries

---

### 10. Commission Split
Commission distribution among parties.

**Key Fields:**
- `totalCommission`: Total commission amount
- `parties`: Array of commission recipients

**Commission Party Structure:**
- `id`: Unique identifier
- `name`: Recipient name
- `role`: Broker | Agent | Referral Partner, etc.
- `percentage`: Percentage of total (0-100)
- `amount`: Calculated dollar amount

**Business Rule:** Total percentage must equal 100%

**Count in Mock Data:** 4 parties in commission split

---

### 11. Admin Profile
User profile information.

**Sections:**
1. **Personal Information**
   - Name, email, phone
   - Legal name
   - Preferred languages
   - Marital status
   - Citizenship
   - SSN, date of birth

2. **Address Information**
   - Personal address
   - Mailing address (can be same as personal)

3. **Other Information**
   - Notes
   - Password management

---

### 12. Website Configuration
System-wide settings and branding.

**Key Fields:**
- `primaryColor`: Hex color code (default: #FF6B35 - orange)
- `secondaryColor`: Hex color code (default: #FFFFFF - white)
- `companyLogo`: Logo URL
- `loadingIcon`: spinner | dots | pulse
- `companyName`: Company name
- `companyAddress`: Business address
- `companyPhone`: Contact phone
- `companyEmail`: Contact email

---

### 13. Transaction Form Data
Complete form data for transaction details.

**Sections:**
1. **Client Information**
   - Full name, email, phone
   - Relationship to transaction

2. **Property Information**
   - Address, city, state, zip code
   - County
   - Property value, sale price, purchase price

3. **Transaction Details**
   - Transaction type
   - Escrow number
   - MLS coordinator
   - Agent team
   - Listing agent
   - Lender name

4. **Offer Details**
   - Offer purchase price
   - Deposit amount
   - Offer date
   - Expiration date
   - Acceptance date
   - Closing date
   - Possession date
   - Final walkthrough date

5. **Financing**
   - Approved date
   - Appraisal ordered status

---

### 14. Offer Conditions
Contingencies and conditions on offers.

**Key Fields:**
- `id`: Unique identifier
- `name`: Condition name
- `dueType`: relative | specific
- `relativeTimeframe`: Days from trigger event
- `relativeDate`: Trigger event (e.g., "Offer Acceptance")
- `specificDate`: Absolute date
- `notes`: Additional details
- `status`: pending | completed | waived

**Common Conditions:**
- Home Inspection
- Financing Approval
- Appraisal
- Title Review
- HOA Document Review

**Count in Mock Data:** 3 conditions

---

### 15. Templates
Reusable transaction templates.

**Key Fields:**
- `id`: Unique identifier
- `name`: Template name
- `type`: Transaction type
- `description`: Template description
- `sections`: Array of included sections
- `createdDate`: Creation date
- `lastModified`: Last modified date
- `usageCount`: Number of times used

**Count in Mock Data:** 3 templates

---

## Data Relationships

### Transaction → Document
- One-to-Many: One transaction has many documents
- Documents are organized in folders
- Each document tracks who uploaded it and when

### Transaction → Agents
- Many-to-Many: Transactions can have multiple agents
- Typical roles: Listing Agent, Buyer Agent, Broker
- Each agent can work on multiple transactions

### Transaction → Lenders
- Many-to-Many: Transactions can involve multiple lenders
- Lenders provide financing for purchases

### Transaction → Buyers
- One-to-Many: One transaction has multiple buyers
- Buyers have relationship types (Primary, Co-Buyer, etc.)

### Transaction → To-Do Lists
- One-to-Many: One transaction has multiple checklists
- Each list contains multiple items
- Items can be assigned to specific people

### Transaction → Timeline
- One-to-Many: One transaction has multiple timeline events
- Events are grouped by date
- Events have types (milestone, deadline, task)

### Transaction → History
- One-to-Many: One transaction has multiple history entries
- Complete audit trail of all changes
- Tracks who made changes and when

### Transaction → Commission Split
- One-to-One: Each transaction has one commission split
- Split can have multiple parties
- Total must equal 100%

### Transaction → Conditions
- One-to-Many: One transaction has multiple conditions
- Conditions track contingencies
- Can be relative or specific date-based

---

## Mock Data Structure

### File: `/data/mockData.ts`

```typescript
export const mockData = {
  transactions: Transaction[],      // 6 sample transactions
  documents: Document[],            // 4 sample documents
  agents: Agent[],                  // 2 sample agents
  lenders: Lender[],               // 1 sample lender
  otherParties: OtherParty[],      // 2 sample other parties
  buyers: Buyer[],                 // 2 sample buyers
  todoLists: TodoList[],           // 3 sample todo lists
  timeline: TimelineDay[],         // 3 days of timeline data
  history: HistoryEntry[],         // 10 history entries
  commissionSplit: CommissionSplit, // 1 commission split example
  adminProfile: AdminProfile,       // 1 admin profile
  websiteConfig: WebsiteConfig,     // System configuration
  transactionFormData: TransactionFormData, // Complete form example
  offerConditions: OfferCondition[], // 3 sample conditions
  templates: Template[]             // 3 sample templates
};
```

---

## Field Descriptions

### Currency Fields
All currency values are stored as numbers (not strings):
- `price`: In dollars (e.g., 825000 = $825,000)
- `amount`: In dollars
- `preApprovalAmount`: In dollars

For display purposes, values are formatted using:
```typescript
value.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
})
```

### Date Fields
Dates are stored as strings in various formats:
- Display format: "Sep 12, 2025" or "Sep 12, 2025 09:14 AM"
- Input format: "1/16/2001" or ISO format for precise timestamps

### Phone Numbers
Phone numbers are formatted as: "(555) 123-4567"

### Email Addresses
Standard email format: "user@domain.com"

### Percentages
Commission percentages are stored as numbers 0-100:
- 10 = 10%
- 15.5 = 15.5%

---

## Business Rules

### Transaction Status Flow
1. **Pre-contract**: Initial stage, property search, offer preparation
2. **Under Contract**: Offer accepted, working through contingencies
3. **Closed**: Transaction completed successfully

### Commission Split Rules
1. Total percentage must equal 100%
2. Each party must have a name and role
3. Amount is automatically calculated from percentage
4. Percentage is automatically calculated from amount
5. System validates before saving

### Document Management Rules
1. Documents must be associated with a folder
2. Default folder is "Not Filed"
3. Custom folders can be created dynamically
4. Documents track upload user and date

### To-Do List Rules
1. Lists can have multiple items
2. Items can have due dates (relative or specific)
3. Items can be assigned to users
4. Completion tracking is boolean
5. Lists can be reordered and categorized

### Offer Conditions Rules
1. Conditions can be relative (X days from event) or specific (absolute date)
2. Common trigger events: Offer Date, Offer Acceptance, Escrow Opening
3. Status tracking: pending, completed, waived
4. Conditions can have notes and additional details

---

## Data Import/Export

### Importing Mock Data

```typescript
import { mockData } from './data/mockData';

// Import all data
const { transactions, documents, agents, ... } = mockData;

// Import specific data
import { mockTransactions } from './data/mockData';
```

### Type Safety

```typescript
import { Transaction, Document, Agent } from './types/schema';

const transaction: Transaction = mockData.transactions[0];
```

### Data Validation

```typescript
import { isTransactionType, isTransactionStatus } from './types/schema';

if (isTransactionType(value)) {
  // TypeScript knows value is TransactionType
}
```

---

## Sample Data Statistics

- **Total Transactions**: 6
  - Purchase: 4
  - Listing: 1
  - Lease Listing: 1

- **Transaction Statuses**:
  - Pre-contract: 3
  - Under Contract: 2
  - Closed: 1

- **Total Documents**: 4
- **Total Agents**: 2
- **Total Lenders**: 1
- **Total Other Parties**: 2
- **Total Buyers**: 2
- **Total To-Do Lists**: 3
- **Total To-Do Items**: 6
- **Total Timeline Events**: 5
- **Total History Entries**: 10
- **Commission Split Parties**: 4
- **Offer Conditions**: 3
- **Templates**: 3

---

## Color Scheme

The system uses a consistent orange and white color scheme:

- **Primary Color**: #FF6B35 (Orange)
- **Secondary Color**: #FFFFFF (White)
- **Accent Colors**:
  - Light orange backgrounds: rgba(255, 107, 53, 0.1)
  - Status badges: Blue (Pre-contract), Orange (Under Contract), Gray (Closed)

---

## Future Enhancements

Potential extensions to the data model:

1. **User Management**: Full user authentication and roles
2. **Notifications**: System notifications and alerts
3. **Messages**: Internal messaging between parties
4. **Calendar Integration**: Sync with external calendars
5. **File Versioning**: Track document versions
6. **Email Integration**: Email templates and sending
7. **Reports**: Custom report generation
8. **Analytics**: Transaction metrics and dashboards
9. **API Integration**: MLS feeds, title company APIs
10. **Mobile App Data**: Optimized data structure for mobile

---

## Technical Notes

### Storage
- Current implementation uses React state
- `websiteConfig` is persisted to localStorage
- For production, integrate with backend database

### Performance Considerations
- Mock data is loaded once at application start
- Large document lists should be paginated
- Search/filter operations should be optimized
- Consider virtual scrolling for long lists

### Security Considerations
- Sensitive fields (SSN) should be masked
- Documents should have access controls
- Audit trail tracks all changes
- Commission data is sensitive financial information

---

## Support

For questions about the data schema or mock data structure, please refer to:
- `/types/schema.ts` - Complete TypeScript definitions
- `/data/mockData.ts` - Mock data implementation
- Component files for usage examples

---

Last Updated: November 20, 2025
Version: 1.0
