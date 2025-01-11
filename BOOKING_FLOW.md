# Beauty Studio - Booking Flow Documentation

## Overview

This document outlines the complete flow of a booking in the Beauty Studio system, including all possible states, transitions, and business rules.

### Initial State

#### Pending

- Initial state when a customer creates a booking
- Requires artist action (accept/reject)
- Auto-cancels if no response within specified timeframe

### Core States

#### Confirmed

- Booking has been accepted by the artist
- Service is scheduled and awaiting the appointment time
- Can transition to various states based on actions or events

#### In Progress

- Service has been started by the artist
- Indicates active service delivery
- Can only be initiated when both parties are present

#### Completed

- Service has been successfully delivered
- Final state for successful bookings
- Triggers payment release to artist

#### Cancelled

- Booking has been terminated before completion
- Can occur at various stages with different implications
- Triggers different payment actions based on cancellation reason

### State Transitions & Business Rules

#### From Pending

- **Artist Accepts** → Confirmed
- **Artist Rejects** → Cancelled (with refund to customer)

#### From Confirmed

1. **Artist Cancels**

   - Status → Cancelled
   - Action: Refund to customer
   - Consequence: Apply penalty to artist

2. **Member Cancels**

   - If > 3 hours before appointment:
     - Status → Cancelled
     - Action: Refund to customer
   - If ≤ 3 hours before appointment:
     - Status → Cancelled
     - Action: Release payment to artist

3. **Artist No-Show**

   - Status → Cancelled
   - Action: Contact support
   - Resolution: Support decides between refund or release based on investigation

4. **Member No-Show**

   - Status → Cancelled
   - Action: Release payment to artist
   - Reason: Member's fault, artist compensated

5. **Service Started**

   - Status → In Progress

6. **No Activity**
   - If appointment time passes without any action:
     - Status → Completed
     - Action: Release payment to artist

#### From In Progress

1. **Artist Cancels**

   - Status → Cancelled
   - Action: Release payment

2. **Member Cancels**

   - Status → Cancelled
   - Action: Refund 

3. **Artist Finishes**
   - Status → Completed
   - Action: Release full payment to artist

### Payment Rules

1. **Refund Conditions**

- Early cancellation by either party
- Artist no-show (after support verification)
- Service not delivered as promised

2. **Payment Release Conditions**

- Service completed successfully
- Member no-show
- Late cancellation by member
- Time-based auto-completion

3. **Penalty Applications**

- Artist cancellation
- Artist no-show
- Multiple service disruptions

### Support Intervention

Support team may intervene in cases of:

- Disputes between artist and member
- No-show investigations
- Payment disputes
- Service quality issues

### Automatic Actions

The system automatically:

1. Cancels pending bookings if no artist response
2. Marks bookings as completed if time passes without issues
3. Handles payment releases based on final status
4. Triggers support notifications for disputes

### Notes

- All status changes are logged for audit purposes
- Payment actions are irreversible once processed
- Support has override capabilities for special cases
- Time-based rules are strictly enforced by the system
