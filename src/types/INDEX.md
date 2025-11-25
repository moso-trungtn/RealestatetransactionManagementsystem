# Data Documentation Index

Welcome to the Real Estate Transaction Management System data documentation. This index provides quick access to all data-related resources.

## 📁 File Structure

```
/data/
├── INDEX.md                    ← You are here
├── README.md                   ← Comprehensive documentation
├── SCHEMA_REFERENCE.md         ← Quick reference guide
├── mockData.ts                 ← Mock data implementation
└── sample-export.json          ← Sample JSON export

/types/
└── schema.ts                   ← TypeScript type definitions
```

---

## 🚀 Quick Start

### For Developers

**1. Import Mock Data**
```typescript
import { mockData } from './data/mockData';
```

**2. Import Types**
```typescript
import { Transaction, Document, Agent } from './types/schema';
```

**3. Use in Component**
```typescript
const transactions: Transaction[] = mockData.transactions;
```

---

## 📚 Documentation Files

### [README.md](./README.md)
**Comprehensive Data Schema Documentation**

- Complete entity descriptions
- Data relationships
- Field descriptions
- Business rules
- Sample data statistics
- Future enhancements

**Best for:** Understanding the full data model and relationships

---

### [SCHEMA_REFERENCE.md](./SCHEMA_REFERENCE.md)
**Quick Reference Guide**

- Entity relationship diagrams (text format)
- Field type reference
- Common queries & operations
- Data validation rules
- Status badge colors
- Default values
- Calculated fields
- Import examples

**Best for:** Quick lookups and common operations

---

### [mockData.ts](./mockData.ts)
**Mock Data Implementation**

- Complete TypeScript mock data
- All entities with sample records
- Ready to import and use
- Organized by entity type
- Includes helper data and defaults

**Best for:** Development and testing

---

### [sample-export.json](./sample-export.json)
**Sample JSON Export**

- Real-world JSON structure
- Example of data export format
- Statistics included
- Clean, readable format

**Best for:** Understanding JSON structure and API design

---

### [/types/schema.ts](../types/schema.ts)
**TypeScript Type Definitions**

- Complete type definitions
- Interface declarations
- Enum types
- Type guards
- Utility types
- Constants

**Best for:** Type safety and IntelliSense

---

## 🎯 Common Tasks

### View All Available Data
```typescript
import { mockData } from './data/mockData';

// Available datasets:
mockData.transactions        // 6 transactions
mockData.documents          // 4 documents
mockData.agents             // 2 agents
mockData.lenders            // 1 lender
mockData.otherParties       // 2 other parties
mockData.buyers             // 2 buyers
mockData.todoLists          // 3 todo lists
mockData.timeline           // 3 days of events
mockData.history            // 10 history entries
mockData.commissionSplit    // Commission split data
mockData.adminProfile       // Admin profile
mockData.websiteConfig      // Website configuration
mockData.transactionFormData // Form data
mockData.offerConditions    // 3 conditions
mockData.templates          // 3 templates
```

### Filter Transactions
```typescript
// By type
const purchases = mockData.transactions.filter(t => t.type === 'Purchase');

// By status
const underContract = mockData.transactions.filter(t => t.status === 'Under Contract');

// By search
const search = (query: string) => 
  mockData.transactions.filter(t => 
    t.address.toLowerCase().includes(query.toLowerCase())
  );
```

### Work with Types
```typescript
import { Transaction, TransactionType, TransactionStatus } from './types/schema';

const transaction: Transaction = {
  id: '1',
  clientName: 'John Doe',
  type: 'Purchase' as TransactionType,
  status: 'Pre-contract' as TransactionStatus,
  // ... other fields
};
```

### Validate Data
```typescript
import { isTransactionType, isTransactionStatus } from './types/schema';

if (isTransactionType(value)) {
  // TypeScript knows value is TransactionType
}
```

---

## 📊 Data Statistics

| Entity | Count | Description |
|--------|-------|-------------|
| Transactions | 6 | Main transaction records |
| Documents | 4 | PDF and document files |
| Agents | 2 | Real estate agents |
| Lenders | 1 | Loan officers and banks |
| Other Parties | 2 | Title officers, inspectors, etc. |
| Buyers | 2 | Individual buyers/clients |
| Todo Lists | 3 | Task checklists |
| Todo Items | 6 | Individual tasks |
| Timeline Events | 5 | Milestones and deadlines |
| History Entries | 10 | Audit trail records |
| Commission Parties | 4 | Commission split recipients |
| Offer Conditions | 3 | Contingencies |
| Templates | 3 | Transaction templates |

---

## 🔍 Finding What You Need

### "I want to understand the data model"
→ Read [README.md](./README.md) - Section: Core Entities & Data Relationships

### "I need to know field types"
→ Check [schema.ts](../types/schema.ts) or [SCHEMA_REFERENCE.md](./SCHEMA_REFERENCE.md)

### "I want to see the actual data"
→ Look at [mockData.ts](./mockData.ts) or [sample-export.json](./sample-export.json)

### "I need validation rules"
→ Check [SCHEMA_REFERENCE.md](./SCHEMA_REFERENCE.md) - Section: Data Validation Rules

### "How do I format currency/dates?"
→ See [SCHEMA_REFERENCE.md](./SCHEMA_REFERENCE.md) - Common Queries & Operations

### "What are the business rules?"
→ Read [README.md](./README.md) - Section: Business Rules

### "I need the JSON structure"
→ Open [sample-export.json](./sample-export.json)

---

## 🎨 Key Features

### Transaction Management
- Multiple transaction types (Purchase, Listing, Lease)
- Status tracking (Pre-contract, Under Contract, Closed)
- Property and client information
- MLS integration

### Document Management
- File organization with folders
- Document versioning and tracking
- Upload history and metadata

### People & Parties
- Agents, lenders, buyers, and other parties
- Contact information management
- Role-based organization

### Task Management
- Customizable checklists
- Due dates and priorities
- Assignment tracking

### Commission Tracking
- Flexible commission splitting
- Percentage and amount calculations
- Multi-party support

### Timeline & History
- Event tracking and milestones
- Complete audit trail
- Change history with details

### Configuration
- Customizable branding
- Color theming
- Company settings

---

## 🔗 Related Files

### Application Files
- `/App.tsx` - Main application component with Transaction type
- `/components/TransactionsDashboard.tsx` - Uses mockTransactions
- `/components/TransactionDetail.tsx` - Uses all data types
- `/components/CommissionSplit.tsx` - Commission data
- `/components/AdminProfile.tsx` - Profile data
- `/contexts/WebsiteConfigContext.tsx` - Configuration

---

## 📦 Data Export Format

The system supports JSON export with the following structure:

```json
{
  "exportDate": "2025-11-20T00:00:00.000Z",
  "exportVersion": "1.0",
  "systemName": "Real Estate Transaction Management System",
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
  "templates": [...],
  "statistics": {...}
}
```

---

## 🛠️ Development Tools

### Type Checking
All data is fully typed with TypeScript for IntelliSense and compile-time safety.

### Validation
Use the provided type guards and validation functions:
- `isTransactionType()`
- `isTransactionStatus()`
- `isView()`

### Constants
Pre-defined constants available:
- `TRANSACTION_TYPES`
- `TRANSACTION_STATUSES`
- `US_STATES`
- `PRIORITY_LEVELS`
- `DOCUMENT_TYPES`

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 20, 2025 | Initial documentation release |

---

## 💡 Tips

1. **Start with mockData.ts** - See real examples of each entity
2. **Reference schema.ts** - Use types for type safety
3. **Check SCHEMA_REFERENCE.md** - Quick lookups and operations
4. **Read README.md** - Understand relationships and rules
5. **View sample-export.json** - See JSON structure

---

## 🤝 Support

For questions about:
- **Data Structure**: See README.md
- **Type Definitions**: Check schema.ts
- **Usage Examples**: Look at component files
- **Quick Reference**: Use SCHEMA_REFERENCE.md

---

## 🎯 Next Steps

1. ✅ Review this index
2. 📖 Read [README.md](./README.md) for full documentation
3. 🔍 Browse [SCHEMA_REFERENCE.md](./SCHEMA_REFERENCE.md) for quick reference
4. 💻 Import data from [mockData.ts](./mockData.ts)
5. 🎨 Customize for your needs

---

Last Updated: November 20, 2025
Documentation Version: 1.0

**Ready to build something awesome! 🚀**
