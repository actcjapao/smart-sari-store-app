For a simple SaaS with:

- **Trial** → all features, 15 days free
- **Premium** → paid monthly, all features

…the best approach is to keep the billing model extremely simple while still future-proofing for upgrades like annual billing, coupons, failed payments, and cancellations.

# Recommended Subscription Flow

## 1. User Registration

User signs up.

Create:

- `users` record
- `subscriptions` record

Initial subscription state:

| Field                | Value      |
| -------------------- | ---------- |
| plan                 | `trial`    |
| status               | `trialing` |
| trial_start_at       | now        |
| trial_end_at         | +15 days   |
| current_period_start | now        |
| current_period_end   | +15 days   |

User immediately gets full access.

## 2. Trial Period

During trial:

- No payment required initially (recommended for conversion)
- Send reminder emails:
   - Day 10
   - Day 13
   - Day 14

Recommended reminders:

    - “Your trial ends in X days”
    - “Add payment method to continue”

## 3. Upgrade to Premium

User clicks Upgrade.

Flow:

1. Collect payment method
2. Create customer in payment gateway
3. Create recurring subscription
4. Webhook confirms payment success
5. Update subscription

Now subscription becomes:

| Field                | Value                |
| -------------------- | -------------------- |
| plan                 | `premium`            |
| status               | `active`             |
| billing_cycle        | `monthly`            |
| current_period_start | payment success date |
| current_period_end   | +1 month             |
| next_billing_at      | +1 month             |

## 4. Monthly Billing Cycle

Every month:

### Successful Renewal

Gateway charges customer automatically.

Webhook updates:

| Field                | Value        |
| -------------------- | ------------ |
| current_period_start | previous end |
| current_period_end   | +1 month     |
| next_billing_at      | +1 month     |
| status               | `active`     |

### Failed Renewal

If charge fails:

| Field  | Value      |
| ------ | ---------- |
| status | `past_due` |

Recommended retry schedule:

- Retry after 1 day
- Retry after 3 days
- Retry after 5 days

Send automated emails.

### Final Failure

After retries fail:

| Field  | Value                   |
| ------ | ----------------------- |
| status | `canceled` or `expired` |

Access removed or downgraded.

## 5. Cancellation Flow

If user cancels:

Recommended behavior:

- Keep access until end of billing period
- Do NOT immediately revoke

Example:

| Field                | Value |
| -------------------- | ----- |
| cancel_at_period_end | true  |
| canceled_at          | now   |

When period ends:

| Field  | Value      |
| ------ | ---------- |
| status | `canceled` |

This reduces support issues and improves UX.

## Recommended Subscription States

Use explicit states.

- `trialing`
- `active`
- `past_due`
- `canceled`
- `expired`
- `unpaid`

You may not need all initially, but these scale well.

## Recommended Database Design

### Minimal but Production-Ready `subscriptions` Table

```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,

    user_id UUID NOT NULL REFERENCES users(id),

    plan VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,

    billing_cycle VARCHAR(20), -- monthly, yearly

    trial_start_at TIMESTAMP NULL,
    trial_end_at TIMESTAMP NULL,

    current_period_start TIMESTAMP NULL,
    current_period_end TIMESTAMP NULL,

    next_billing_at TIMESTAMP NULL,

    cancel_at_period_end BOOLEAN DEFAULT FALSE,

    canceled_at TIMESTAMP NULL,

    payment_provider VARCHAR(50), -- stripe, paypal, paddle
    provider_customer_id VARCHAR(255),
    provider_subscription_id VARCHAR(255),

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## Recommended Enum Values

### plan

- trial
- premium

Even if trial isn't technically a paid plan, treating it as one simplifies authorization logic.

### status

- `trialing`
- `active`
- `past_due`
- `canceled`
- `expired`
- `unpaid`

## Recommended Additional Tables

Do NOT overload subscriptions.

You should also have:

`payments` - Tracks invoices/charges.

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY,

    subscription_id UUID REFERENCES subscriptions(id),

    amount DECIMAL(10,2),
    currency VARCHAR(10),

    status VARCHAR(50), -- pending, paid, failed

    provider_payment_id VARCHAR(255),

    paid_at TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT NOW()
);
```

## Recommended Payment Providers

For SaaS, best options are:

- Stripe
- Paddle
- Lemon Squeezy

## Best Practice Architecture

### Never Trust Frontend Billing State

Always rely on:

- payment provider webhooks
- server-side subscription state

Frontend should only display status.

## Recommended Entitlement Logic

Avoid feature flags per plan initially.

Since both plans unlock all features:

```sql
Has Access =
status IN ('trialing', 'active')
AND current_period_end > now()
```

Very simple.

## Recommended Trial Strategy

For highest conversion:

**No credit card required for trial**

Pros:

- Higher signup conversion
- Better top-of-funnel growth

Cons:

- Slightly lower paid conversion

Usually worth it for early-stage SaaS.

## Recommended Billing Architecture

### Use Webhooks

Critical events:

- `subscription.created`
- `invoice.paid`
- `invoice.payment_failed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Your DB should sync from webhook events.

## Ideal Real-World Lifecycle

```js
signup
  ↓
trialing (15 days)
  ↓
upgrade
  ↓
active
  ↓
monthly renewals
  ↓
past_due (if failed)
  ↓
active OR canceled
```

That’s the cleanest scalable SaaS subscription architecture for your setup.
