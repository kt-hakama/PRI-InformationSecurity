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
      explanation: 'A common phishing technique. The message is from a domain that mimics the real one. Attackers exploit the similarity between the digit "1" and the letter "l".'
    },
    {
      id: 'point-002',
      text: 'There is a ZIP file attached',
      isCorrect: true,
      explanation: 'ZIP files are often used to hide malware. Password-protected ZIPs in particular can be used to evade security software scanning.'
    },
    {
      id: 'point-003',
      text: 'The message says the password will be sent by SMS',
      isCorrect: true,
      explanation: 'Legitimate business rarely shares passwords via SMS. Password-protected files are commonly used to bypass security checks.'
    },
    {
      id: 'point-004',
      text: 'The word "urgent" is used to create pressure',
      isCorrect: true,
      explanation: 'Attackers pressure recipients to skip careful verification. Be cautious of words like "urgent" or "immediate".'
    },
    {
      id: 'point-005',
      text: 'The email is polite and looks professional',
      isCorrect: false,
      explanation: 'Phishing emails can be polite and professional. Politeness alone does not indicate safety.'
    },
    {
      id: 'point-006',
      text: 'It is from a vendor so it can be trusted',
      isCorrect: false,
      explanation: 'The sender may be impersonating a vendor. Always verify the sender address and content carefully.'
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
      explanation: 'Public Wi-Fi carries eavesdropping and man-in-the-middle risks. Prefer VPN or mobile data for confidential documents.'
    },
    {
      id: 'point-202',
      text: 'An unknown USB device was left on the table by a stranger',
      isCorrect: true,
      explanation: 'Malicious USB devices (e.g. malware or hardware attacks) are sometimes left for victims to plug in. Do not connect found USB devices; hand them to staff.'
    },
    {
      id: 'point-203',
      text: 'Sending the document from this public location',
      isCorrect: true,
      explanation: 'Public places pose shoulder-surfing risks. Avoid handling confidential information in plain view; use a secure environment when possible.'
    },
    {
      id: 'point-204',
      text: 'Working from a café',
      isCorrect: false,
      explanation: 'The location itself is less important than how you use it (Wi-Fi, devices, screen visibility).'
    },
    {
      id: 'point-205',
      text: 'Using cloud storage is safe',
      isCorrect: false,
      explanation: 'Even with cloud services, an unencrypted or untrusted Wi-Fi path can be eavesdropped.'
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
      explanation: 'Email is vulnerable to interception and leakage. Credentials should be delivered through a secure channel, and first-time password change should be required (Subject B: Securing IT use).'
    },
    {
      id: 'point-302',
      text: 'Only one administrator and two-factor authentication is optional',
      isCorrect: true,
      explanation: 'A single administrator creates concentration of privilege and continuity risk. Optional 2FA increases the risk of unauthorized access if passwords are compromised (Subject B: Cloud security).'
    },
    {
      id: 'point-303',
      text: 'Data is stored in overseas data centers',
      isCorrect: true,
      explanation: 'Personal or confidential data may be restricted or prohibited from being stored abroad by law or industry guidelines. Confirm storage location before contracting (Subject B: Information asset management).'
    },
    {
      id: 'point-304',
      text: 'Customer data will be handed over on USB',
      isCorrect: true,
      explanation: 'USB media is easy to lose or steal; without encryption and access control it can lead to data breach. Share with vendors through secure means and limit data to the minimum necessary (Subject B: Vendor management).'
    },
    {
      id: 'point-305',
      text: 'The NDA will be signed after development starts',
      isCorrect: true,
      explanation: 'An NDA (Non-Disclosure Agreement) defines obligations to keep confidential information secret and not use it for other purposes. It should be in place before sharing information; signing after disclosure leaves a gap in legal protection (Subject B: Vendor management).'
    },
    {
      id: 'point-306',
      text: 'Chat with no logging is used for business communication',
      isCorrect: true,
      explanation: 'Using chat that does not keep logs for confidential or personal data leaves no audit trail. Define how vendor communications and records are managed (Subject B: Information asset management).'
    },
    {
      id: 'point-307',
      text: 'Starting with a free trial saves cost',
      isCorrect: false,
      explanation: 'What matters more is the service terms, contract, and security (e.g. data location, encryption, logging). A free trial itself is not a risk point.'
    },
    {
      id: 'point-308',
      text: 'Cloud is safer than on-premise servers',
      isCorrect: false,
      explanation: 'Cloud safety depends on configuration, contract, and operations. Without proper access control and encryption it can be unsafe. Evaluate whether requirements are met rather than assuming cloud is safe.'
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
      explanation: 'Email is vulnerable to interception, misdelivery, and forwarding. Personal data should be shared through encrypted or secure file transfer, not plain email.'
    },
    {
      id: 'point-402',
      text: 'The outsourcing and confidentiality agreements are “to be signed later”',
      isCorrect: true,
      explanation: 'Contracts (outsourcing, NDA, and personal data handling) must be in place before sharing personal information. Signing after disclosure leaves a gap in legal and procedural protection.'
    },
    {
      id: 'point-403',
      text: 'The list includes purchase history and other data not needed for DM distribution',
      isCorrect: true,
      explanation: 'Personal data shared with vendors should be limited to what is necessary for the outsourced task (purpose limitation, data minimization). Including unnecessary data increases breach impact and can violate privacy principles.'
    },
    {
      id: 'point-404',
      text: 'There is no agreement on return or deletion of the list after the work is done',
      isCorrect: true,
      explanation: 'The contract or request should specify retention period, how the data will be returned or deleted, and handling after the outsourcing ends. Without this, data may remain with the vendor and increase the risk of misuse or breach.'
    },
    {
      id: 'point-405',
      text: 'The shared folder password is easy to guess (e.g. 1234)',
      isCorrect: true,
      explanation: 'Storage used for personal data should have a strong, hard-to-guess password and minimal access rights. Weak passwords increase the risk of unauthorized access.'
    },
    {
      id: 'point-406',
      text: 'C is a long-standing vendor so they can be trusted',
      isCorrect: false,
      explanation: 'Even with a long relationship, you still need a contract, clear scope of data sharing, and a secure transfer method before sharing personal information. Trust alone is not a substitute for proper procedures.'
    },
    {
      id: 'point-407',
      text: 'The list is created in Excel',
      isCorrect: false,
      explanation: 'The main risks are how the data is transferred (email, shared folder settings), what is shared, and whether contracts are in place. Using Excel itself is not the risk.'
    }
  ]
};

// ========== Hard scenarios (advanced versions of each theme) ==========

export const sampleScenario001HardEn: Scenario = {
  id: 'scenario-001-hard',
  difficulty: 'hard',
  title: 'Incoming email from external sender (Advanced)',
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
  title: 'Working while on a business trip (Advanced)',
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
  title: 'Cloud service adoption and sharing data with a vendor (Advanced)',
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
  title: 'Sharing a personal information list with a vendor (Advanced)',
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

export const scenariosEn: Scenario[] = [
  sampleScenarioEn,
  sampleScenario2En,
  sampleScenario3En,
  sampleScenario4En,
  sampleScenario001HardEn,
  sampleScenario002HardEn,
  sampleScenario003HardEn,
  sampleScenario004HardEn,
];
