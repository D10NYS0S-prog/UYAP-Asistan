# İMEREK Database Schema Documentation

This document describes the database schema from İMEREK PROGRAM.

## Database Tables

### 1. dosyalar (Cases)
Main case tracking table with 50+ columns for file management.

### 2. evraklar (Documents) 
Document management with types, senders, receivers.

### 3. tebligatlar (Notifications)
Service of process tracking.

### 4. tahsilat (Collections)
Payment records.

### 5. notlar (Notes)
User notes for cases.

### 6. borclu_bilgileri (Debtors)
Party and debtor information.

### 7. calisma_grubu (Team)
Team member access control.

## Integration
Use better-sqlite3 in Electron main process for database operations.

See IMEREK PROGRAM/database.sql for complete schema.
