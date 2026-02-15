import { Scenario } from '@/types';

export const sampleScenarioEn: Scenario = {
  id: 'scenario-001',
  difficulty: 'easy',
  title: 'Incoming email from external sender',
  description: 'You are checking email at work. Identify the information security risk points in the following scenario.',
  situation: `
On Monday morning, you receive an email from a vendor contact with the subject "Urgent: Invoice correction."

Email body:
"Thank you for your business. We found an error in the invoice we sent. Please open the attached corrected version and forward it to your accounting department as soon as possible. The password will be sent to you separately by SMS."

Attachment: Invoice_Revised.zip

Sender address: tanaka@examp1e-company.com
(Your usual contact uses tanaka@example-company.com)

You are in a hurry and are about to open the attachment.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-001',
      text: 'The sender address is different from usual (e.g. "l" in example replaced with "1" in examp1e)',
      isCorrect: true,
      explanation: 'Correct. In this scenario the sender is tanaka@examp1e-company.com while your usual contact uses tanaka@example-company.com. The domain is spoofed to look like the real one, a common phishing tactic, so selecting this as a risk is right.'
    },
    {
      id: 'point-002',
      text: 'There is a ZIP file attached',
      isCorrect: true,
      explanation: 'Correct. In this scenario the attachment is Invoice_Revised.zip and the password is to be sent by SMS. ZIPs and password-protected files are often used to hide malware or evade scanning, so selecting this as a risk is right.'
    },
    {
      id: 'point-003',
      text: 'The message says the password will be sent by SMS',
      isCorrect: true,
      explanation: 'Correct. In this scenario the email says "The password will be sent to you separately by SMS." Legitimate business rarely shares passwords by SMS, and password-protected files are often used to bypass checks, so selecting this as a risk is right.'
    },
    {
      id: 'point-004',
      text: 'The word "urgent" is used to create pressure',
      isCorrect: true,
      explanation: 'Correct. In this scenario the subject is "Urgent: Invoice correction" and the body asks to act "as soon as possible." Attackers use urgency to skip verification, so selecting this as a risk is right.'
    },
    {
      id: 'point-005',
      text: 'The email is polite and looks professional',
      isCorrect: false,
      explanation: 'Incorrect. Although the email is polite, politeness alone does not show it is safe. The real risks are the spoofed sender, the attachment, and the urgency; this option is not a correct risk to select.'
    },
    {
      id: 'point-006',
      text: 'It is from a vendor so it can be trusted',
      isCorrect: false,
      explanation: 'Incorrect. In this scenario the sender may be impersonating a vendor and the address differs from your usual contact. You should verify sender and content; trusting it because it looks like a vendor is not a correct risk to select.'
    }
  ]
};

export const sampleScenario2En: Scenario = {
  id: 'scenario-002',
  difficulty: 'easy',
  title: 'Working while on a business trip',
  description: 'You are working at a café during a business trip. Identify the information security risk points in the following scenario.',
  situation: `
You have arrived at a café and need to finish the materials for tomorrow’s meeting.

You connect to the café’s free Wi-Fi, download the documents from cloud storage, and start editing. A person at the next table asks, "Did you drop this USB drive?" and hands you an unknown USB device. You say no, and they reply, "Must be someone else’s. You might find it useful," and leave it on the table.

You ignore the USB drive and are about to upload the edited file to the cloud and send it by email.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-201',
      text: 'Accessing cloud storage and email over public Wi-Fi',
      isCorrect: true,
      explanation: 'Correct. In this scenario you connect to the café\'s free Wi-Fi, download from cloud storage, and are about to send by email. Public Wi-Fi carries eavesdropping and man-in-the-middle risks, so selecting this as a risk is right.'
    },
    {
      id: 'point-202',
      text: 'An unknown USB device was left on the table by a stranger',
      isCorrect: true,
      explanation: 'Correct. In this scenario a stranger left an unknown USB drive on your table. Malicious USB devices are sometimes left for victims to use, so leaving it there is a risk and selecting this is right.'
    },
    {
      id: 'point-203',
      text: 'Sending the document from this public location',
      isCorrect: true,
      explanation: 'Correct. In this scenario you are about to upload the edited file and send it by email from the café. Public places pose shoulder-surfing risks, so selecting this as a risk is right.'
    },
    {
      id: 'point-204',
      text: 'Working from a café',
      isCorrect: false,
      explanation: 'Incorrect. Although you are at a café, the risks come from using free Wi-Fi, the unknown USB, and handling the document in view of others—not from the café itself. This option is not a correct risk to select.'
    },
    {
      id: 'point-205',
      text: 'Working using cloud storage',
      isCorrect: false,
      explanation: 'Incorrect. Using cloud storage itself is not dangerous. The danger is the free Wi-Fi path. In this scenario you access cloud storage over free Wi-Fi, so there is eavesdropping risk, but "working using cloud storage" itself is not a risk point to select.'
    }
  ]
};

export const sampleScenario3En: Scenario = {
  id: 'scenario-003',
  difficulty: 'easy',
  title: 'Cloud service adoption and sharing data with a vendor',
  description: 'This scenario is based on the Information Security Management exam (Subject B). Identify risk points when introducing a cloud service and sharing data with an external vendor.',
  situation: `
Your department is considering a cloud file-sharing service (proposed by vendor A) for efficiency. At the same time, you plan to outsource system changes to development company B.

[About the cloud service (from vendor A)]
・You can start with a free trial immediately
・Initial passwords will be sent to the responsible person by email
・A single administrator account is sufficient
・Data may be stored in overseas data centers for cost reasons
・Login uses only ID and password; two-factor authentication is optional to match your policy

[About sharing information with vendor B (from your manager)]
・Customer master data samples will be handed over on USB at tomorrow’s meeting
・An NDA will be signed after development has started
・Communication with B will continue via email and a chat app (chat does not keep logs)

You are wondering whether it is safe to proceed as planned.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-301',
      text: 'Passwords are sent by email',
      isCorrect: true,
      explanation: 'Correct. In this scenario "Initial passwords will be sent to the responsible person by email." Email is vulnerable to interception, so credentials should not be sent this way; selecting this as a risk is right.'
    },
    {
      id: 'point-302',
      text: 'Only one administrator and two-factor authentication is optional',
      isCorrect: true,
      explanation: 'Correct. In this scenario "A single administrator account is sufficient" and "two-factor authentication is optional." This increases risk if passwords are compromised; selecting this as a risk is right.'
    },
    {
      id: 'point-303',
      text: 'Data is stored in overseas data centers',
      isCorrect: true,
      explanation: 'Correct. In this scenario "Data may be stored in overseas data centers for cost reasons." Personal or confidential data may be restricted abroad by law or guidelines; selecting this as a risk is right.'
    },
    {
      id: 'point-304',
      text: 'Customer data will be handed over on USB',
      isCorrect: true,
      explanation: 'Correct. In this scenario "Customer master data samples will be handed over on USB at tomorrow\'s meeting." USB is easy to lose or steal; selecting this as a risk is right.'
    },
    {
      id: 'point-305',
      text: 'The NDA will be signed after development starts',
      isCorrect: true,
      explanation: 'Correct. In this scenario "An NDA will be signed after development has started." The NDA should be in place before sharing information; selecting this as a risk is right.'
    },
    {
      id: 'point-306',
      text: 'Chat with no logging is used for business communication',
      isCorrect: true,
      explanation: 'Correct. In this scenario "Communication with B will continue via email and a chat app (chat does not keep logs)." No logs means no audit trail; selecting this as a risk is right.'
    },
    {
      id: 'point-307',
      text: 'Starting with a free trial saves cost',
      isCorrect: false,
      explanation: 'Incorrect. Although the scenario mentions a free trial, the real risks are password delivery by email, single admin, optional 2FA, overseas storage, USB handover, NDA timing, and no-log chat. A free trial itself is not a correct risk to select.'
    },
    {
      id: 'point-308',
      text: 'Cloud is safer than on-premise servers',
      isCorrect: false,
      explanation: 'Incorrect. The scenario involves cloud adoption, but the risks are the specific terms (password by email, 2FA optional, overseas storage, etc.), not "cloud" in general. Assuming cloud is safe is not a correct risk to select.'
    }
  ]
};

export const sampleScenario4En: Scenario = {
  id: 'scenario-004',
  difficulty: 'easy',
  title: 'Sharing a personal information list with a vendor',
  description: 'You are responsible for providing a personal information list to an outsourced vendor. Identify the information security risk points in the following scenario.',
  situation: `
Your department will outsource direct mail (DM) distribution to vendor C. Your manager has asked you to provide C with a list of personal information for mailing.

[Current procedure (from your manager)]
・The list will be created in Excel and sent to C’s contact by email attachment
・Since you have a long-standing relationship with C, the outsourcing and confidentiality agreements are “to be signed later”
・The list will include names, addresses, phone numbers, and purchase history (“C might use it for analysis”)
・There is no agreement on returning or deleting the list after the work is done

[Message from C’s contact]
・“The file is too large, so please upload it to the shared folder (password is set to 1234).”

You are wondering whether it is safe to provide the list as planned.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-401',
      text: 'The personal information list will be sent as an email attachment',
      isCorrect: true,
      explanation: 'Correct. In this scenario "The list will be created in Excel and sent to C\'s contact by email attachment." Email is vulnerable to interception and misdelivery, so selecting this as a risk is right.'
    },
    {
      id: 'point-402',
      text: 'The outsourcing and confidentiality agreements are “to be signed later”',
      isCorrect: true,
      explanation: 'Correct. In this scenario the agreements are "to be signed later." Contracts should be in place before sharing personal information; selecting this as a risk is right.'
    },
    {
      id: 'point-403',
      text: 'The list includes purchase history and other data not needed for DM distribution',
      isCorrect: true,
      explanation: 'Correct. In this scenario the list will include "purchase history" ("C might use it for analysis"). Personal data should be limited to what is necessary; selecting this as a risk is right.'
    },
    {
      id: 'point-404',
      text: 'There is no agreement on return or deletion of the list after the work is done',
      isCorrect: true,
      explanation: 'Correct. In this scenario "There is no agreement on returning or deleting the list after the work is done." Without this, data may remain with the vendor; selecting this as a risk is right.'
    },
    {
      id: 'point-405',
      text: 'The shared folder password is easy to guess (e.g. 1234)',
      isCorrect: true,
      explanation: 'Correct. In this scenario C says "please upload it to the shared folder (password is set to 1234)." Weak passwords increase unauthorized access risk; selecting this as a risk is right.'
    },
    {
      id: 'point-406',
      text: 'C is a long-standing vendor so they can be trusted',
      isCorrect: false,
      explanation: 'Incorrect. Although there is a long-standing relationship, the risks are email attachment, contracts signed later, unnecessary data, no return/deletion agreement, and weak password. Trust alone is not a correct risk to select.'
    },
    {
      id: 'point-407',
      text: 'The list is created in Excel',
      isCorrect: false,
      explanation: 'Incorrect. The scenario says the list is in Excel, but the risks are the transfer method (email), contract timing, scope of data, return/deletion, and password strength. Excel format itself is not a correct risk to select.'
    }
  ]
};

// Scenario 5: Sending electronic files to a business partner
export const sampleScenario005En: Scenario = {
  id: 'scenario-005',
  difficulty: 'easy',
  title: 'Sending electronic files to a business partner',
  description: 'You have been asked by your manager to send the "current term estimate" to business partner B by email. Identify the information security risk points in the following scenario.',
  situation: `
You have been asked to send the "current term estimate" to business partner B by email.

You have the following files on hand:
・Estimate_2025Q1.xlsx … Current term estimate (prepared for B)
・Estimate_2024Q4_InternalDraft.xlsx … Previous term estimate (contains internal comments and cost breakdown)

B’s contact was previously Mr. Sato (sato@b-company.co.jp), but you received a notice last month that "the contact has changed to Mr. Yamada," and you have a note saying "Yamada yamada@b-company.co.jp." Below that note, another contact "Tamura tamura@c-company.co.jp" from a different partner C is also written.

Short on time, you attached "Estimate_2025Q1.xlsx," set the subject to "[B] Current term estimate," and entered yamada@b-company.co.jp as the recipient. Before sending, a colleague said, "The file is large, so use password estimate2025 and put it in the body." You have added that password to the email body and are about to click Send.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-501',
      text: 'The file you are about to attach is "Internal draft" and may contain internal comments or cost breakdown',
      isCorrect: false,
      explanation: 'Incorrect. In this scenario you attached "Estimate_2025Q1.xlsx", not the internal draft, so this option does not match the situation. Selecting it as a risk is therefore wrong.'
    },
    {
      id: 'point-502',
      text: 'The note has B’s and C’s addresses close together, and you are about to send in a situation where recipient mix-up is easy',
      isCorrect: true,
      explanation: 'With Sato→Yamada change noted next to C’s Tamura address, recipient mix-ups are easy. Final verification of the recipient is important, so selecting this as a risk is right.'
    },
    {
      id: 'point-503',
      text: 'You are about to send the password in the same email body',
      isCorrect: true,
      explanation: 'Correct. In this scenario you have added the password estimate2025 to the email body and are about to send. If the email is compromised, the password is exposed too, so selecting this as a risk is right.'
    },
    {
      id: 'point-504',
      text: 'You have not verified the attachment is the correct file for B before sending',
      isCorrect: true,
      explanation: 'Correct. In this scenario you attached "Estimate_2025Q1.xlsx" but there is no mention of opening and verifying the contents. You should confirm contents before sending; selecting this as a risk is right.'
    },
    {
      id: 'point-505',
      text: 'After the contact change, you have not confirmed Yamada’s address via official communication (email or business card)',
      isCorrect: true,
      explanation: 'Correct. In this scenario you only have a note about the contact change; there is no mention of confirming the address via official email or business card. Selecting this as a risk is right.'
    },
    {
      id: 'point-506',
      text: 'Sending as Excel is fine; PDF would be safer',
      isCorrect: false,
      explanation: 'Incorrect. In this scenario you are sending an Excel file, but the risks are content verification, recipient confirmation, and how the password is shared. Excel vs PDF is not a correct risk to select.'
    },
    {
      id: 'point-507',
      text: 'Estimates are not confidential so sending as-is is fine',
      isCorrect: false,
      explanation: 'Incorrect. In this scenario you are sending an estimate, which can contain confidential information. Claiming it is not confidential and can be sent as-is is not a correct risk to select.'
    }
  ]
};

// ========== Challenge scenarios (advanced versions of each theme) ==========

export const sampleScenario001HardEn: Scenario = {
  id: 'scenario-001-hard',
  difficulty: 'hard',
  title: 'Incoming email from external sender (Challenge)',
  description: 'An email that appears to be from a vendor has arrived. The tactics are more sophisticated than the easy version. Identify the risk points.',
  situation: `
On Monday morning, your inbox contains an unread HR notice that was circulated: "Mr. Yamada at our vendor Partner Co. left the company as of yesterday." You have not yet read it.

In that situation, the following email arrives. The sender address is the same one you always use (yamada@partner-company.co.jp).

────────────────────────────────────────
From: Taro Yamada <yamada@partner-company.co.jp>
To: (your email address)
Date: Mon, Jan 13, 2025 at 9:02 AM
Subject: [Important] Notice of change in payment account for invoices
Attachments: Payment_Account_Change.pdf (1 file)
────────────────────────────────────────

Thank you for your business.

Due to internal changes in our accounting department, our bank account for this term has changed. The attached PDF contains the new account details. We would appreciate it if you could use the new account for future payments. Please review the attachment and complete your internal procedures by January 20.

Partner Corporation
Accounting Department
Taro Yamada

────────────────────────────────────────

Your internal policy states that payment account changes must not be applied until formal written notice is received from the vendor.

You are focused on the "Important" subject and the deadline and are about to open the attachment.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-001h-1',
      text: 'The payment account change is requested only via email and attachment',
      isCorrect: true,
      explanation: 'Payment account changes are a common fraud tactic. Legitimate vendors typically use written notices and multiple channels for verification. A change request by email and attachment alone is a strong sign of BEC (Business Email Compromise).'
    },
    {
      id: 'point-001h-2',
      text: 'The message uses "important" and a deadline to create urgency',
      isCorrect: true,
      explanation: 'Attackers create urgency to bypass internal verification. Payment account changes require especially careful verification before acting.'
    },
    {
      id: 'point-001h-3',
      text: 'Even if the sender address matches, the sender could be someone else',
      isCorrect: true,
      explanation: 'Email addresses can be spoofed or accounts compromised to look legitimate. For critical requests like account changes, verify the request through a separate channel.'
    },
    {
      id: 'point-001h-4',
      text: 'Proceeding would violate internal policy (no change until written notice)',
      isCorrect: true,
      explanation: 'Payment account changes must follow internal procedures. Acting on email-only requests can violate policy and is a sign of fraud.'
    },
    {
      id: 'point-001h-5',
      text: 'PDF is safer than ZIP so it is acceptable',
      isCorrect: false,
      explanation: 'PDFs can also be used for malware or phishing. The real issue is requesting a payment account change by email attachment alone, not the file format.'
    },
    {
      id: 'point-001h-6',
      text: 'The email is from the vendor\'s official address so it is trustworthy',
      isCorrect: false,
      explanation: 'Even a correct address can be used by a former employee or after account takeover. Critical requests need verification through another channel, not just the address.'
    }
  ]
};

export const sampleScenario002HardEn: Scenario = {
  id: 'scenario-002-hard',
  difficulty: 'hard',
  title: 'Working while on a business trip (Challenge)',
  description: 'You are working from a hotel on a business trip. Risks can exist even in seemingly secure environments. Identify the risk points.',
  situation: `
You are staying at a hotel on a business trip and need to do a final check on your presentation for tomorrow.

You connect to the hotel’s "Guest Secure Wi-Fi," log in to the company portal, and download the presentation. Following the in-room notice about "Business Center available," you copy the file to a USB drive borrowed from the front desk and go to the business corner on the first floor to open the file on a shared PC and print it. A sign says "Please log out after use."

You are short on time and are about to click Print with the presentation open from the USB drive, while still logged in as "Guest" on the shared PC.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-002h-1',
      text: 'Even on "secure" hotel Wi-Fi, other guests are on the same network',
      isCorrect: true,
      explanation: 'Guest Wi-Fi often puts many users on the same network. Without proper isolation, traffic can be intercepted. Use VPN or mobile data for confidential documents.'
    },
    {
      id: 'point-002h-2',
      text: 'Opening internal confidential material on a shared PC',
      isCorrect: true,
      explanation: 'Shared PCs may have keyloggers or leave data in cache. Opening internal documents on them can leave content or keystrokes available to the next user.'
    },
    {
      id: 'point-002h-3',
      text: 'Copying internal material to a USB drive borrowed from the hotel',
      isCorrect: true,
      explanation: 'Loaner USBs are used by many people and may contain malware. Connecting them to work or personal devices increases infection risk.'
    },
    {
      id: 'point-002h-4',
      text: 'Using the shared PC while logged in as "Guest" without logging out',
      isCorrect: true,
      explanation: 'Using a shared PC without logging out, or leaving without logging out, leaves the session and possibly files visible to the next user, which can lead to data exposure.'
    },
    {
      id: 'point-002h-5',
      text: 'The business corner is managed by the hotel so it is safe',
      isCorrect: false,
      explanation: 'Managed or not, shared PCs and shared networks still carry risks of eavesdropping, data residue, and malware. Your own device on a secure connection is safer.'
    },
    {
      id: 'point-002h-6',
      text: 'Only printing the file so read-only access is fine',
      isCorrect: false,
      explanation: 'Opening the file loads it into memory and cache. Even read-only use on a shared PC leaves data on the device and is a risk.'
    }
  ]
};

export const sampleScenario003HardEn: Scenario = {
  id: 'scenario-003-hard',
  difficulty: 'hard',
  title: 'Cloud service adoption and sharing data with a vendor (Challenge)',
  description: 'Cloud and vendor arrangements are in place. Look for gaps in the contract and operations. Identify the risk points.',
  situation: `
The cloud file-sharing service (vendor A) contract is signed, and customer master data is shared with vendor B via encrypted USB and an NDA.

[New proposals under discussion]
・Vendor A’s service can integrate with an "affiliate partner" analytics tool (vendor D) to automatically retrieve usage reports
・The contract states that "A and subprocessors selected by A may process data," but vendor D is not named and data handling is not specified
・Vendor B has asked to switch from a chat tool that keeps logs to one that does not, for "faster communication"

You are wondering whether these changes are safe to adopt.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-003h-1',
      text: 'The subprocessor (D) is not explicitly named in the contract and data handling is unclear',
      isCorrect: true,
      explanation: 'Subprocessors that handle personal or confidential data should be identified in the contract, with clarity on storage, purpose, and safeguards. Vague wording can mean unmanaged data sharing with third parties.'
    },
    {
      id: 'point-003h-2',
      text: 'Data may be sent to the "affiliate partner" analytics tool',
      isCorrect: true,
      explanation: 'Integration may send your data to vendor D. Data flows and third-party access should be defined in the contract and settings; consent or assessment may be required.'
    },
    {
      id: 'point-003h-3',
      text: 'Switching vendor B communication to a chat tool that does not keep logs',
      isCorrect: true,
      explanation: 'Using a no-log chat for vendor communication removes an audit trail and makes it hard to demonstrate compliance or resolve disputes. Vendor management should keep traceable records.'
    },
    {
      id: 'point-003h-4',
      text: 'Changing the communication channel only because B requested "faster" communication',
      isCorrect: true,
      explanation: 'Changing to a no-log tool for convenience can create security and compliance issues later. Communication channels with vendors should align with internal policy.'
    },
    {
      id: 'point-003h-5',
      text: 'NDA and encrypted USB are in place so there is no problem',
      isCorrect: false,
      explanation: 'B’s data sharing may be in order, but cloud integration, subprocessors, and switching to no-log chat are separate risks. The full picture of operations must be reviewed.'
    },
    {
      id: 'point-003h-6',
      text: 'A’s chosen partner is safe to use',
      isCorrect: false,
      explanation: 'Vendor selection by A does not replace your need to confirm who gets your data and how. Subprocessors should be explicitly identified and assessed.'
    }
  ]
};

export const sampleScenario004HardEn: Scenario = {
  id: 'scenario-004-hard',
  difficulty: 'hard',
  title: 'Sharing a personal information list with a vendor (Challenge)',
  description: 'List sharing is now done via a secure channel and contracts. Identify the more subtle risk points.',
  situation: `
Personal data lists are now shared with vendor C via a dedicated secure file transfer service, with outsourcing, confidentiality, and personal data handling agreements in place. The list is limited to name, address, and delivery details needed for DM distribution.

[New request (from your manager)]
・Vendor C has asked to reuse the list for "another campaign in the same industry" and wants the customer segment (A/B/C) added to the list
・Your manager is considering it: "It’s the same vendor, and it’s just the segment, so we could provide it"
・Return and deletion of the list are set for "end of the outsourcing contract," but "reuse for another campaign" is not explicitly covered in the contract; the stated purpose is only "for DM distribution"

You are wondering whether to allow this reuse and the additional provision of segment data.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-004h-1',
      text: 'Reusing the list for a campaign beyond the contracted purpose (DM distribution)',
      isCorrect: true,
      explanation: 'Personal data must be used within the specified purpose. Reuse for "another campaign" is a new purpose and may require consent or a contract update.'
    },
    {
      id: 'point-004h-2',
      text: 'Adding "customer segment" expands the scope of data shared',
      isCorrect: true,
      explanation: 'Originally only name, address, and delivery details were shared. Adding segment changes the scope of disclosure and should be reviewed under the contract and purpose.'
    },
    {
      id: 'point-004h-3',
      text: 'The contract does not include "reuse for another campaign" in the purpose',
      isCorrect: true,
      explanation: 'If the purpose is only "for DM distribution," use for another campaign may be out of scope. Expanding purpose typically requires a contract change and documentation.'
    },
    {
      id: 'point-004h-4',
      text: 'Considering the additional disclosure only because "it’s the same vendor"',
      isCorrect: true,
      explanation: 'Same vendor does not mean same purpose. A different use is a new disclosure and should be assessed on necessity, purpose, and contract, not trust alone.'
    },
    {
      id: 'point-004h-5',
      text: 'Secure transfer and contracts are in place so there is no problem',
      isCorrect: false,
      explanation: 'Channel and base contract may be fine, but "reuse for another purpose" and "expanding data scope" are separate risks. Purpose and scope of data must be managed.'
    },
    {
      id: 'point-004h-6',
      text: 'Customer segment does not identify individuals so it can be shared',
      isCorrect: false,
      explanation: 'Segment combined with name and address can identify individuals. Adding segment is adding personal data; it must be justified by purpose and contract.'
    }
  ]
};

// Scenario 5 (Challenge): Sending electronic files – recipient and delivery verification
export const sampleScenario005HardEn: Scenario = {
  id: 'scenario-005-hard',
  difficulty: 'hard',
  title: 'Sending electronic files to a business partner (Challenge)',
  description: 'You are asked to send a "contract draft" to B’s new contact, Mr. Yamada. Internal policy is followed, but there are pitfalls in recipient and delivery. Identify the risk points.',
  situation: `
You have been asked to send the "contract draft" to B’s new contact, Mr. Yamada (yamada@b-company.co.jp). Internal policy states: "Send confidential files as password-protected ZIP; share the password by separate email or phone."

You prepared the delivery as follows:
・Opened the file "ContractDraft_ForB.pdf" and confirmed it only contains B’s name and contract terms.
・Set a password (Contract2025) on the ZIP, set subject "[B] Contract draft," and entered yamada@b-company.co.jp as the recipient.
・Sent an email saying "Password sent separately" first, then sent the ZIP attachment a few minutes later.

After sending, Mr. Yamada from B replied: "yamada@b-company.co.jp was in CC. My correct address is yamada-t@b-company.co.jp (with hyphen). If it arrived, I’ll open it there." You thought "Putting it in CC was a mistake, but if it reached the right person it’s fine" and did not report to your manager or information security.

Meanwhile, your note has both "B – Yamada yamada@b-company.co.jp" and "B – Yamada (other dept) yamada-t@b-company.co.jp," and past email history suggests that messages sent to yamada@ may have been received by a different person with the same name in another department.
  `.trim(),
  dangerPoints: [
    {
      id: 'point-005h-1',
      text: 'You entered yamada@ as recipient but the correct address is yamada-t@; you may have sent the confidential file to the wrong address',
      isCorrect: true,
      explanation: 'With same-name, different-address contacts, confidential information can reach the wrong person. Verify the recipient with official contact (business card or email from the partner) before sending.'
    },
    {
      id: 'point-005h-2',
      text: 'You put the contact’s address in CC, mixing the use of CC (copy) with "send to recipient"',
      isCorrect: true,
      explanation: 'CC is for "reference copy." Using it for the main recipient blurs intent. For a single recipient, use To only.'
    },
    {
      id: 'point-005h-3',
      text: 'You sent the password in a "separate" email but shortly after to the same recipient; if the mail is compromised both could be obtained together',
      isCorrect: true,
      explanation: 'Even if policy is met, sending the password by the same channel at the same time is effectively "in the same envelope." A different channel (phone, another system) is safer when possible.'
    },
    {
      id: 'point-005h-4',
      text: 'After realizing the possible misdelivery, you did not report or consult your manager or information security',
      isCorrect: true,
      explanation: 'Leaving it unclear whether the file reached the right person can allow leakage or mix-up to spread. You should report even after the fact and take re-send or verification steps if needed.'
    },
    {
      id: 'point-005h-5',
      text: 'You assumed "if it reached the person it’s fine" without confirming that the recipient at yamada@ is really the contract contact, Mr. Yamada',
      isCorrect: true,
      explanation: 'The message may have gone to a same-name person in another department. Verifying who actually received it and their role is necessary for proper handling of confidential information.'
    },
    {
      id: 'point-005h-6',
      text: 'Your note has both yamada@ and yamada-t@ but you did not formally confirm which is the contact for this delivery before sending',
      isCorrect: true,
      explanation: 'When multiple addresses exist, identify "this delivery’s contact" through the partner’s official communication before sending.'
    },
    {
      id: 'point-005h-7',
      text: 'Sending as PDF is safer than Word',
      isCorrect: false,
      explanation: 'The format (PDF/Word) is not the main issue. The risks are correct recipient, how the password is shared, and verifying who received the file.'
    },
    {
      id: 'point-005h-8',
      text: 'You followed policy by sending the password separately, so there is no problem',
      isCorrect: false,
      explanation: 'Policy was followed, but the way you sent the password (same channel, same time) can still create risk. That is the learning point in this scenario.'
    }
  ]
};

export const scenariosEn: Scenario[] = [
  sampleScenarioEn,
  sampleScenario2En,
  sampleScenario3En,
  sampleScenario4En,
  sampleScenario005En,
  sampleScenario001HardEn,
  sampleScenario002HardEn,
  sampleScenario003HardEn,
  sampleScenario004HardEn,
  sampleScenario005HardEn,
];
