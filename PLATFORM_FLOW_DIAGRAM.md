# 🔄 Coaching Platform Flow Diagram

## 🏗️ **System Architecture Overview**

```mermaid
graph TB
    subgraph "Frontend (React + Vite)"
        A[User Browser] --> B[React App]
        B --> C[AuthContext]
        B --> D[Router]
        D --> E[Home Page]
        D --> F[Login Page]
        D --> G[User Dashboard]
        D --> H[Mentor Dashboard]
        D --> I[Mentor Discovery]
        D --> J[Session Booking]
        D --> K[Payment Flow]
    end

    subgraph "Backend (Node.js + Express)"
        L[Express Server] --> M[Auth Middleware]
        L --> N[User Routes]
        L --> O[Payment Routes]
        L --> P[Session Routes]
        L --> Q[Webhook Handler]
    end

    subgraph "Payment System"
        R[PaymentService] --> S[Stripe Gateway]
        R --> T[PayPal Gateway]
        R --> U[IPaymentGateway Interface]
    end

    subgraph "Database (PostgreSQL)"
        V[Users Table]
        W[Mentor Profiles]
        X[Sessions Table]
        Y[Payments Table]
        Z[Reviews Table]
    end

    subgraph "External Services"
        AA[Stripe API]
        BB[PayPal API]
        CC[Email Service]
    end

    %% Frontend to Backend connections
    B -.->|API Calls| L
    C -.->|JWT Auth| M
    K -.->|Payment Intent| O

    %% Backend to Database connections
    N -.->|CRUD| V
    O -.->|Store Payment| Y
    P -.->|Session Data| X

    %% Payment System connections
    R -.->|Process Payment| S
    S -.->|API Calls| AA
    R -.->|Process Payment| T
    T -.->|API Calls| BB

    %% Webhook connections
    AA -.->|Webhook Events| Q
    BB -.->|Webhook Events| Q
    Q -.->|Update Status| Y

    %% Database relationships
    V -.->|User Data| W
    X -.->|Session Info| Y
    V -.->|User Reviews| Z

    classDef frontend fill:#e1f5fe
    classDef backend fill:#f3e5f5
    classDef payment fill:#e8f5e8
    classDef database fill:#fff3e0
    classDef external fill:#ffebee

    class A,B,C,D,E,F,G,H,I,J,K frontend
    class L,M,N,O,P,Q backend
    class R,S,T,U payment
    class V,W,X,Y,Z database
    class AA,BB,CC external
```

## 🔐 **Authentication Flow**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant JWT as JWT Token

    U->>F: Visit Platform
    F->>F: Check localStorage for token
    alt Token exists
        F->>B: GET /api/users/profile
        B->>JWT: Verify token
        JWT-->>B: Token valid
        B->>DB: Get user data
        DB-->>B: User data
        B-->>F: User authenticated
        F->>F: Redirect to dashboard
    else No token
        F->>F: Show login page
    end

    U->>F: Enter credentials
    F->>B: POST /api/users/login
    B->>DB: Verify credentials
    DB-->>B: User data
    B->>JWT: Generate token
    JWT-->>B: JWT token
    B-->>F: Token + user data
    F->>F: Store in localStorage
    F->>F: Redirect to dashboard
```

## 💳 **Payment Flow**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant PS as PaymentService
    participant SG as Stripe Gateway
    participant S as Stripe API
    participant DB as Database

    U->>F: Book Session
    F->>F: Select mentor & session type
    F->>B: POST /api/payments/create-intent
    B->>PS: createSessionPayment()
    PS->>SG: createPaymentIntent()
    SG->>S: Create Payment Intent
    S-->>SG: Payment Intent + Client Secret
    SG-->>PS: Payment data
    PS->>DB: Store payment record
    PS-->>B: Payment intent data
    B-->>F: Client secret + payment ID
    F->>F: Show payment form (Stripe Elements)
    
    U->>F: Enter payment details
    F->>S: Confirm payment (client-side)
    S-->>F: Payment confirmed
    F->>B: POST /api/payments/confirm
    B->>PS: confirmPayment()
    PS->>DB: Update payment status
    PS->>DB: Update session status
    PS-->>B: Confirmation result
    B-->>F: Payment successful
    F->>F: Show success page

    Note over S: Webhook sent to backend
    S->>B: POST /api/payments/webhook/stripe
    B->>PS: handleWebhook()
    PS->>DB: Final status update
```

## 🔍 **Mentor Discovery Flow**

```mermaid
flowchart TD
    A[User visits /mentors] --> B{User Authenticated?}
    B -->|No| C[Redirect to Login]
    B -->|Yes| D[Load Mentor List]
    
    D --> E[Display Mentors Grid]
    E --> F[Search & Filter Options]
    
    F --> G[Search by Name/Expertise]
    F --> H[Filter by Price Range]
    F --> I[Filter by Rating]
    F --> J[Filter by Availability]
    F --> K[Filter by Location]
    
    G --> L[Apply Filters]
    H --> L
    I --> L
    J --> L
    K --> L
    
    L --> M[Filtered Results]
    M --> N[User clicks on Mentor]
    N --> O[View Mentor Profile]
    O --> P[View Session Types]
    P --> Q[Select Session Type]
    Q --> R[Choose Date & Time]
    R --> S[Enter Session Goals]
    S --> T[Proceed to Payment]
    T --> U[Payment Flow]
```

## 📊 **Dashboard Flow**

```mermaid
flowchart TD
    A[User Login] --> B{User Role?}
    
    B -->|Mentor| C[Mentor Dashboard]
    B -->|User| D[User Dashboard]
    
    C --> E[View Upcoming Sessions]
    C --> F[View Earnings]
    C --> G[Manage Profile]
    C --> H[View Reviews]
    C --> I[Set Availability]
    
    D --> J[View Booked Sessions]
    D --> K[View Past Sessions]
    D --> L[View Goals Progress]
    D --> M[Find New Mentors]
    D --> N[Payment History]
    
    E --> O[Session Management]
    F --> P[Earnings Analytics]
    G --> Q[Profile Settings]
    H --> R[Review Management]
    I --> S[Calendar Management]
    
    J --> T[Session Details]
    K --> U[Session History]
    L --> V[Goal Tracking]
    M --> W[Mentor Discovery]
    N --> X[Payment Records]
```

## 🔄 **Session Lifecycle**

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Confirmed : Payment Successful
    Pending --> Cancelled : User Cancels
    Pending --> Expired : Time Limit Reached
    
    Confirmed --> InProgress : Session Start Time
    Confirmed --> Cancelled : Cancellation (with refund)
    
    InProgress --> Completed : Session Ends
    InProgress --> Cancelled : Emergency Cancellation
    
    Completed --> Reviewed : User Leaves Review
    Completed --> [*] : No Review
    
    Cancelled --> [*] : Refund Processed
    Expired --> [*] : Cleanup
    
    Reviewed --> [*] : Review Posted
```

## 💰 **Revenue Flow**

```mermaid
flowchart TD
    A[User Books Session] --> B[Payment Processed]
    B --> C[Payment Gateway Fee]
    B --> D[Platform Commission]
    B --> E[Mentor Payout]
    
    C --> F[Stripe/PayPal Fee: 2.9% + $0.30]
    D --> G[Platform Fee: 15%]
    E --> H[Mentor Receives: 82.1%]
    
    F --> I[Payment Provider Revenue]
    G --> J[Platform Revenue]
    H --> K[Mentor Revenue]
    
    I --> L[Monthly Payout to Platform]
    J --> M[Platform Operations]
    K --> N[Mentor Bank Account]
    
    M --> O[Platform Costs]
    M --> P[Platform Profit]
    
    O --> Q[Server Costs]
    O --> R[Development Costs]
    O --> S[Marketing Costs]
    O --> T[Support Costs]
```

## 🔧 **Technical Stack Flow**

```mermaid
graph LR
    subgraph "Frontend Stack"
        A[React 18] --> B[TypeScript]
        B --> C[Vite]
        C --> D[TanStack Query]
        D --> E[React Router]
        E --> F[Shadcn/ui]
        F --> G[Tailwind CSS]
    end

    subgraph "Backend Stack"
        H[Node.js] --> I[Express.js]
        I --> J[JWT Authentication]
        J --> K[PostgreSQL]
        K --> L[Payment Service]
        L --> M[Stripe/PayPal]
    end

    subgraph "Development Tools"
        N[ESLint] --> O[Prettier]
        O --> P[Git]
        P --> Q[Docker]
    end

    subgraph "Deployment"
        R[Vercel/Netlify] --> S[Frontend]
        T[Railway/Heroku] --> U[Backend]
        V[Supabase/AWS] --> W[Database]
    end

    A -.->|API Calls| I
    L -.->|Webhooks| M
    K -.->|Data Storage| W
```

## 🎯 **User Journey Flow**

```mermaid
journey
    title Coaching Platform User Journey
    section Discovery
      Visit Homepage: 5: User
      Browse Mentors: 4: User
      Read Reviews: 3: User
    section Registration
      Create Account: 5: User
      Choose Role: 4: User
      Complete Profile: 3: User
    section Booking
      Select Mentor: 5: User
      Choose Session: 4: User
      Schedule Time: 3: User
      Make Payment: 5: User
    section Session
      Join Session: 4: User
      Have Coaching: 5: User
      Leave Review: 3: User
    section Follow-up
      Track Progress: 4: User
      Book Again: 5: User
      Recommend: 4: User
```

---

## 📋 **Current Implementation Status**

### ✅ **Completed Features:**
- **Authentication System** (JWT, Role-based access)
- **Payment Gateway Abstraction** (Stripe, PayPal ready)
- **User Dashboards** (Mentor & User)
- **Session Booking UI**
- **Database Schema** (Users, Sessions, Payments, Reviews)
- **API Endpoints** (Auth, Payments, Users)

### 🚧 **In Progress:**
- **Search & Filtering** (Next Phase)
- **Real-time Communication** (Next Phase)

### 📋 **Planned Features:**
- **Advanced Search** (AI-powered matching)
- **Video Call Integration**
- **Subscription Payments**
- **Analytics Dashboard**
- **Mobile App**

---

**🎉 Your platform now has a solid foundation with authentication and payment processing ready for production!** 