# Data Schema Quick Reference

## Entity Relationship Diagram (Text Format)

```
┌─────────────────────────────────────────────────────────────────────┐
│                          TRANSACTION (Core Entity)                   │
├─────────────────────────────────────────────────────────────────────┤
│ • id: string                                                         │
│ • clientName: string                                                │
│ • address, city, state, zipCode: string                             │
│ • price: number                                                     │
│ • type: Purchase | Listing | Lease Listing | Lease                 │
│ • status: Pre-contract | Under Contract | Closed                    │
│ • closingDate, listDate, contractDate: string (optional)            │
│ • image: string (URL)                                               │
│ • mlsNumber: string (optional)                                      │
│ • modifiedDate: string (optional)                                   │
│ • lostDeals: number (optional)                                      │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ Has Many
                              ├──────────────────────────────────────┐
                              │                                      │
                              ▼                                      ▼
                    ┌──────────────────┐                ┌──────────────────┐
                    │    DOCUMENT      │                │     BUYER        │
                    ├──────────────────┤                ├──────────────────┤
                    │ • id             │                │ • id             │
                    │ • name           │                │ • firstName      │
                    │ • type           │                │ • lastName       │
                    │ • modifiedDate   │                │ • middleName     │
                    │ • folder         │                │ • email          │
                    │ • size           │                │ • phone          │
                    │ • uploadedBy     │                │ • relationship   │
                    └──────────────────┘                │ • dateOfBirth    │
                                                        │ • ssn            │
                              │                         └──────────────────┘
                              │
                              ├──────────────────────────────────────┐
                              │                                      │
                              ▼                                      ▼
                    ┌──────────────────┐                ┌──────────────────┐
                    │    TODO LIST     │                │    TIMELINE      │
                    ├──────────────────┤                ├──────────────────┤
                    │ • id             │                │ • date           │
                    │ • name           │                │ • label          │
                    │ • items[]        │                │ • events[]       │
                    │   - id           │                │   - id           │
                    │   - text         │                │   - title        │
                    │   - completed    │                │   - date         │
                    │   - dueDate      │                │   - type         │
                    │   - assignedTo   │                └──────────────────┘
                    │   - priority     │
                    └──────────────────┘
                              │
                              │
                              ├──────────────────────────────────────┐
                              │                                      │
                              ▼                                      ▼
                    ┌──────────────────┐                ┌──────────────────┐
                    │    HISTORY       │                │ COMMISSION SPLIT │
                    ├──────────────────┤                ├──────────────────┤
                    │ • id             │                │ • totalCommission│
                    │ • action         │                │ • parties[]      │
                    │ • changedBy      │                │   - id           │
                    │ • date           │                │   - name         │
                    │ • personId       │                │   - role         │
                    │ • details        │                │   - percentage   │
                    └──────────────────┘                │   - amount       │
                                                        └──────────────────┘
                              │
                              │
                              ├──────────────────────────────────────┐
                              │                                      │
                              ▼                                      ▼
                    ┌──────────────────┐                ┌──────────────────┐
                    │ OFFER CONDITION  │                │   FORM DATA      │
                    ├──────────────────┤                ├──────────────────┤
                    │ • id             │                │ • transactionType│
                    │ • name           │                │ • fullName       │
                    │ • dueType        │                │ • email          │
                    │ • relativeTime   │                │ • phone          │
                    │ • relativeDate   │                │ • streetAddress  │
                    │ • specificDate   │                │ • city, state    │
                    │ • notes          │                │ • zipCode        │
                    │ • status         │                │ • propertyValue  │
                    └──────────────────┘                │ • (+ 20 fields)  │
                                                        └──────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     PEOPLE / PARTIES (Linked Entities)              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐     │
│  │    AGENT     │    │    LENDER    │    │  OTHER PARTY     │     │
│  ├──────────────┤    ├──────────────┤    ├──────────────────┤     │
│  │ • id         │    │ • id         │    │ • id             │     │
│  │ • firstName  │    │ • name       │    │ • firstName      │     │
│  │ • lastName   │    │ • contactPrn │    │ • lastName       │     │
│  │ • email      │    │ • email      │    │ • email          │     │
│  │ • phone      │    │ • phone      │    │ • phone          │     │
│  │ • role       │    │ • role       │    │ • role           │     │
│  │ • license#   │    │ • institution│    │ • company        │     │
│  │ • brokerage  │    │ • loanType   │    └──────────────────┘     │
│  └──────────────┘    │ • preApproval│                              │
│                      └──────────────┘                              │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      SYSTEM / CONFIGURATION                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐           ┌──────────────────────┐          │
│  │ ADMIN PROFILE    │           │  WEBSITE CONFIG      │          │
│  ├──────────────────┤           ├──────────────────────┤          │
│  │ • firstName      │           │ • primaryColor       │          │
│  │ • lastName       │           │ • secondaryColor     │          │
│  │ • email          │           │ • companyLogo        │          │
│  │ • phone          │           │ • loadingIcon        │          │
│  │ • legalName      │           │ • companyName        │          │
│  │ • languages[]    │           │ • companyAddress     │          │
│  │ • maritalStatus  │           │ • companyPhone       │          │
│  │ • citizenship    │           │ • companyEmail       │          │
│  │ • ssn            │           └──────────────────────┘          │
│  │ • dateOfBirth    │                                              │
│  │ • personalAddr   │           ┌──────────────────────┐          │
│  │ • mailingAddr    │           │    TEMPLATE          │          │
│  │ • note           │           ├──────────────────────┤          │
│  └──────────────────┘           │ • id                 │          │
│                                  │ • name               │          │
│                                  │ • type               │          │
│                                  │ • description        │          │
│                                  │ • sections[]         │          │
│                                  │ • createdDate        │          │
│                                  │ • lastModified       │          │
│                                  │ • usageCount         │          │
│                                  └──────────────────────┘          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Field Type Reference

### String Types
```typescript
id: string                    // UUID or unique identifier
name: string                  // Person or entity name
email: string                 // Email address format
phone: string                 // Format: (555) 123-4567
address: string               // Street address
city: string                  // City name
state: string                 // 2-letter state code (CA, NY, etc.)
zipCode: string               // Postal code
date: string                  // Format: "Sep 12, 2025" or ISO
url: string                   // Full URL for images/documents
```

### Number Types
```typescript
price: number                 // Currency value in dollars (825000 = $825,000)
amount: number                // Dollar amount
percentage: number            // 0-100 (10 = 10%)
lostDeals: number            // Count of failed offers
usageCount: number           // Number of times used
```

### Boolean Types
```typescript
completed: boolean            // Task completion status
appraisalOrdered: boolean    // Yes/No flag
sameAsPersonalAddress: boolean // Address sync flag
```

### Enum Types
```typescript
TransactionType = 'Purchase' | 'Listing' | 'Lease Listing' | 'Lease'
TransactionStatus = 'Pre-contract' | 'Under Contract' | 'Closed'
Priority = 'low' | 'medium' | 'high'
LoadingIcon = 'spinner' | 'dots' | 'pulse'
EventType = 'milestone' | 'deadline' | 'task'
ConditionStatus = 'pending' | 'completed' | 'waived'
```

### Array Types
```typescript
items: TodoItem[]            // Array of todo items
events: TimelineEvent[]      // Array of events
parties: CommissionParty[]   // Array of commission recipients
preferredLanguages: string[] // Array of language names
sections: string[]           // Array of section names
```

---

## Common Queries & Operations

### 1. Get Transaction by ID
```typescript
const transaction = mockTransactions.find(t => t.id === '1');
```

### 2. Filter Transactions by Type
```typescript
const purchases = mockTransactions.filter(t => t.type === 'Purchase');
const listings = mockTransactions.filter(t => t.type === 'Listing');
```

### 3. Filter Transactions by Status
```typescript
const underContract = mockTransactions.filter(t => t.status === 'Under Contract');
```

### 4. Search Transactions
```typescript
const results = mockTransactions.filter(t => 
  t.address.toLowerCase().includes(query.toLowerCase()) ||
  t.clientName.toLowerCase().includes(query.toLowerCase()) ||
  t.mlsNumber?.toLowerCase().includes(query.toLowerCase())
);
```

### 5. Sort Transactions
```typescript
// By price (descending)
const sorted = [...mockTransactions].sort((a, b) => b.price - a.price);

// By date (most recent first)
const sorted = [...mockTransactions].sort((a, b) => 
  new Date(b.modifiedDate || 0).getTime() - new Date(a.modifiedDate || 0).getTime()
);
```

### 6. Calculate Commission
```typescript
const calculateCommission = (percentage: number, total: number) => {
  return (total * percentage) / 100;
};

// Example: 2.5% of $825,000
const commission = calculateCommission(2.5, 825000); // $20,625
```

### 7. Validate Commission Split
```typescript
const totalPercentage = commissionParties.reduce((sum, party) => 
  sum + party.percentage, 0
);
const isValid = Math.abs(totalPercentage - 100) < 0.01; // Allow for rounding
```

### 8. Get Incomplete Tasks
```typescript
const incompleteTasks = todoLists.flatMap(list => 
  list.items.filter(item => !item.completed)
);
```

### 9. Get Upcoming Events
```typescript
const today = new Date();
const upcomingEvents = timelineData.flatMap(day => 
  day.events.filter(event => new Date(event.date) >= today)
);
```

### 10. Format Currency
```typescript
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};

formatCurrency(825000); // "$825,000.00"
```

---

## Data Validation Rules

### Transaction
- ✓ `id` must be unique
- ✓ `type` must be one of: Purchase, Listing, Lease Listing, Lease
- ✓ `status` must be one of: Pre-contract, Under Contract, Closed
- ✓ `price` must be positive number
- ✓ `state` must be valid 2-letter code
- ✓ `email` must be valid email format
- ✓ `phone` must be valid phone format

### Commission Split
- ✓ Total percentage must equal 100% (±0.01 for rounding)
- ✓ Each party must have name and role
- ✓ Percentage must be 0-100
- ✓ Amount must be positive

### Buyer
- ✓ At least one buyer required per transaction
- ✓ Email must be unique per transaction
- ✓ Phone must be valid format

### Document
- ✓ Name must not be empty
- ✓ Type must be valid file extension
- ✓ Must be associated with a folder

### Todo Item
- ✓ Text must not be empty
- ✓ Due date must be valid date format
- ✓ Priority must be: low, medium, or high

---

## Status Badge Colors

```typescript
const statusColors = {
  'Pre-contract': {
    bg: 'bg-blue-100',
    text: 'text-blue-700'
  },
  'Under Contract': {
    bg: 'bg-orange-100',  // Uses theme primary color
    text: 'text-orange-600'
  },
  'Closed': {
    bg: 'bg-gray-100',
    text: 'text-gray-700'
  }
};
```

---

## Date Formats Used

| Context | Format | Example |
|---------|--------|---------|
| Display Date | "MMM DD, YYYY" | "Sep 12, 2025" |
| Display DateTime | "MMM DD, YYYY hh:mm A" | "Sep 12, 2025 09:14 AM" |
| Input Date | "M/D/YYYY" | "1/16/2001" |
| Relative Date | "X days away" | "4 days away" |
| Timeline Label | "today", "tomorrow", etc. | "today" |

---

## Default Values

```typescript
// New Transaction
{
  status: 'Pre-contract',
  type: 'Purchase',
  image: 'placeholder-image-url'
}

// New Todo Item
{
  completed: false,
  priority: 'medium'
}

// New Commission Party
{
  percentage: 0,
  amount: 0
}

// New Document Folder
{
  expanded: true,
  name: 'Not Filed'
}

// Website Config
{
  primaryColor: '#FF6B35',
  secondaryColor: '#FFFFFF',
  loadingIcon: 'spinner'
}
```

---

## Calculated Fields

| Field | Calculation | Example |
|-------|-------------|---------|
| Commission Amount | `(totalCommission × percentage) / 100` | `(50000 × 10) / 100 = 5000` |
| Commission % | `(amount / totalCommission) × 100` | `(5000 / 50000) × 100 = 10` |
| Total Allocated | `sum(parties.map(p => p.amount))` | `5000 + 7500 + ... = 50000` |
| Incomplete Tasks | `items.filter(i => !i.completed).length` | `3` |
| Days Until Event | `eventDate - today` | `4 days` |

---

## Import Examples

```typescript
// Import everything
import { mockData } from './data/mockData';

// Import specific datasets
import { 
  mockTransactions, 
  mockDocuments, 
  mockAgents 
} from './data/mockData';

// Import types
import { 
  Transaction, 
  Document, 
  Agent,
  TodoList,
  CommissionSplit
} from './types/schema';

// Use in component
const transactions: Transaction[] = mockTransactions;
```

---

## Export Format (JSON)

```json
{
  "transactions": [...],
  "documents": [...],
  "agents": [...],
  "lenders": [...],
  "otherParties": [...],
  "buyers": [...],
  "todoLists": [...],
  "timeline": [...],
  "history": [...],
  "commissionSplit": {...},
  "adminProfile": {...},
  "websiteConfig": {...},
  "transactionFormData": {...},
  "offerConditions": [...],
  "templates": [...]
}
```

---

## Sample Record Counts

```
Transactions:        6 records
├─ Purchase:        4 records
├─ Listing:         1 record
└─ Lease Listing:   1 record

Documents:          4 records
Agents:             2 records
Lenders:            1 record
Other Parties:      2 records
Buyers:             2 records
Todo Lists:         3 records
Todo Items:         6 records
Timeline Days:      3 records
Timeline Events:    5 records
History Entries:   10 records
Commission Parties: 4 records
Offer Conditions:   3 records
Templates:          3 records
```

---

## Key Relationships Summary

```
Transaction (1) ──→ (Many) Documents
Transaction (1) ──→ (Many) Buyers
Transaction (1) ──→ (Many) Todo Lists
Transaction (1) ──→ (Many) Timeline Events
Transaction (1) ──→ (Many) History Entries
Transaction (1) ──→ (Many) Offer Conditions
Transaction (1) ──→ (1) Commission Split
Transaction (Many) ←→ (Many) Agents
Transaction (Many) ←→ (Many) Lenders
Transaction (Many) ←→ (Many) Other Parties
```

---

Last Updated: November 20, 2025
