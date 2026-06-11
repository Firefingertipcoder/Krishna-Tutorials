# Firebase Security Rules Specification (Phase 0)

This document outlines the security architecture, invariants, and validation specs designed to harden the Firestore database against Unauthorized Access, ID Poisoning, and State Bypass attacks.

## 1. Data Invariants
- **Inquiries & Applications**: Public creates are allowed (`create` command), but they must be structurally valid. Public reads or modifications are STRICTLY FORBIDDEN. Only authenticated administrator accounts can view or delete inquiries/applications.
- **Courses & Gallery**: Public read is allowed (`get` and `list`). Only administrators can create, update, or delete.
- **Announcements**: Public read is allowed (`list` and `get`) so students can see board schedules. Only administrators can publish or delete announcements.
- **Students**: Public blanket read is FORBIDDEN. A student profile can only be read (`get`) if the query corresponds directly to that student's credentials, or if the requester is an administrator.

## 2. The "Dirty Dozen" Malicious Payloads
Here are the 12 attack vectors we are blocking:
1. **Anon Inquiry Read**: Anonymous user attempts to read database inquiries list. (Should return permission denied).
2. **Inquiry Deletion**: Non-admin attempts to clean up or delete inquiry documents. (Should return permission denied).
3. **Ghost Fields Injection**: Setting `isApproved: true` as a hidden property on inquiries or applications. (Stopped by schema key size / whitelist checks).
4. **ID Poisoning in Course creation**: Injected special characters or huge 1.5KB string as key ID. (Stopped by `isValidId()` check).
5. **Hijacking Admin Announcements**: Non-admin trying to post or edit announcements to cancel classes. (Stopped by admin-only write lock).
6. **Student Data Scraping**: Logged-in or anonymous user crawling the entire `/students` directory. (Stopped by blocking blanket list/get).
7. **Cross-Student Spoofing**: Student with Roll No `KT1001` attempting to fetch information of `KT1002`. (Stopped by checking ID equals auth or roll code matching credentials).
8. **Testimonial Injection**: Unauthorized writes directly to Courses collection. (Stopped by admin lock).
9. **Creation Timestamp Spoofing**: Client-provided artificial back-dated `createdAt` in inquiries. (Stopped by `request.time` server verification).
10. **Admin Privilege Escalation**: Modifying self roles to Admin. (Blocked because admin documents reside in protected, read-only `/admins/` collections).
11. **Malicious Empty Payload**: Creating document with zero keys. (Blocked by checking minimum key length and required fields).
12. **Integer Flow Attack**: Setting fees in Course collection to a negative integer value. (Blocked by type/boundary rules).

## 3. Deployment Constraints
All database connections and rules are protected by rules version 2 with a default-deny catchall:
`match /{document=**} { allow read, write: if false; }`
Only explicit collections rules expose endpoints.
