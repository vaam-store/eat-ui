# Detailed Plan: Vendor Account Activation Page

## 1. Project Setup and Dependencies

*   **Verify Existing Dependencies:** Ensure `formik`, `zod`, `@tanstack/react-query` are correctly installed and configured as per the project rules.
*   **Install Geolocation Library (if needed):** If a specific React hook or utility for browser geolocation isn't already present, I will create a custom hook to encapsulate this logic.

## 2. Data Models and API Endpoints

*   **Define Vendor Profile Schema (Zod):**
    *   Create a Zod schema for `VendorContactInformation` (First Name, Last Name, Email).
    *   Create a Zod schema for `VendorAddress` (Street Address Line 1, Street Address Line 2, City, State/Province, Postal Code, Country, Latitude, Longitude).
    *   Create a main Zod schema for `VendorActivationForm` combining contact info and an array of `VendorAddress`.
*   **API Endpoints (tRPC/Medusa):**
    *   **GET `/customer/me` (or similar):** To fetch the logged-in user's details for pre-population. I will use `medusa.client.customers.retrieve()` for this.
    *   **POST `/vendors/activate` (or similar):** To submit the vendor activation form data. This endpoint will handle updating the user's status to 'Pending Validation' and saving the vendor profile and addresses. I will need to define the input and output types for this tRPC procedure.

## 3. Component Breakdown and Implementation

### 3.1. Presentation Layer (UI Elements)

*   **`VendorActivationPage` (src/app/(default)/v/activate/page.tsx):**
    *   This will be the main page component.
    *   It will be a client component (`'use client'`) as it involves form handling, state management, and browser APIs (geolocation).
    *   It will orchestrate the `VendorActivationForm` and handle data fetching for pre-population.
    *   It will display success/error messages after form submission.
*   **`VendorActivationForm` (src/components/vendor/vendor-activation-form.tsx):**
    *   A client component responsible for rendering the entire form.
    *   Uses `Formik` for form state management, validation, and submission.
    *   Integrates `Zod` for schema validation.
    *   Will contain `VendorContactInfoSection` and `VendorAddressesSection` components.
    *   Will use DaisyUI classes for styling.
*   **`VendorContactInfoSection` (src/components/vendor/vendor-contact-info-section.tsx):**
    *   A client component for displaying and allowing edits to First Name, Last Name, and Email.
    *   Uses `InputField` components from `src/components/input/`.
    *   Pre-populates fields with data fetched from the logged-in user.
*   **`VendorAddressesSection` (src/components/vendor/vendor-addresses-section.tsx):**
    *   A client component to manage multiple vendor addresses.
    *   Allows adding new address entries dynamically.
    *   Each address entry will be rendered by a `VendorAddressFieldset` component.
    *   Includes a "Add New Address" button.
*   **`VendorAddressFieldset` (src/components/vendor/vendor-address-fieldset.tsx):**
    *   A client component representing a single address entry.
    *   Uses `InputField` components for Street Address Line 1, Street Address Line 2, City, State/Province, Postal Code, Country.
    *   Includes Latitude and Longitude input fields.
    *   Integrates a custom hook (`useGeolocation`) to pre-populate GPS coordinates.
    *   Includes a "Remove Address" button for dynamic removal.
*   **`InputField` (src/components/input/input-field.tsx):**
    *   Reuses the existing `InputField` component.
    *   Ensures proper styling with DaisyUI.

### 3.2. Business Logic Layer

*   **Formik Integration:**
    *   `VendorActivationForm` will use `Formik`'s `initialValues`, `validationSchema` (Zod), and `onSubmit` props.
    *   `onSubmit` will call the tRPC mutation for vendor activation.
*   **Zod Validation:**
    *   The Zod schemas defined in step 2 will be used for client-side validation within Formik.
*   **Geolocation Hook (`useGeolocation` - src/hooks/use-geolocation.ts):**
    *   A custom React hook to:
        *   Request user's current location using `navigator.geolocation.getCurrentPosition()`.
        *   Handle permissions and errors.
        *   Return latitude and longitude.
        *   Provide a function to trigger manual location updates.
*   **tRPC Mutations/Queries:**
    *   **`useCustomerDetails` (src/hooks/customer.ts):** A new TanStack Query hook to fetch logged-in customer details using `medusa.client.customers.retrieve()`.
    *   **`useActivateVendor` (src/hooks/vendor.ts):** A new TanStack Query mutation hook to call the backend API endpoint for vendor activation.

### 3.3. Data Persistence Layer (API Endpoints/Schema Considerations)

*   **Medusa Backend Integration:**
    *   **Extend Medusa Customer Entity:** If Medusa's default customer entity doesn't include fields for vendor status or addresses, I will need to consider how to extend it. Given the prompt, it implies a separate vendor profile.
    *   **New Medusa Service/Endpoint:** A new endpoint (e.g., `/vendors/activate`) will be needed in the Medusa backend to:
        *   Receive the `VendorActivationForm` data.
        *   Update the user's role/status to 'Pending Validation'.
        *   Save the vendor contact information.
        *   Save the multiple business addresses associated with the vendor.
        *   This might involve creating new entities in Medusa (e.g., `VendorProfile`, `VendorAddress`) or extending existing ones.
*   **tRPC Router (`src/server/api/routers/vendor.ts`):**
    *   Create a new tRPC router for vendor-related operations.
    *   Define a `vendor.activate` procedure that:
        *   Receives the `VendorActivationForm` data.
        *   Calls the Medusa backend API (e.g., `medusa.client.fetch('/vendors/activate', ...)`) to perform the activation.
        *   Handles success and error responses.

### 4. Styling and Responsiveness

*   **Tailwind CSS & DaisyUI:**
    *   Apply DaisyUI component classes (`input`, `btn`, `card`, `fieldset`, `label`, etc.) for consistent styling.
    *   Use Tailwind CSS utility classes for layout (`flex`, `grid`, responsive prefixes like `sm:`, `md:`, `lg:`).
    *   Ensure the form is responsive and user-friendly on various screen sizes.

### 5. File Structure

```
src/
├── app/
│   └── (default)/
│       └── v/
│           └── activate/
│               └── page.tsx             # VendorActivationPage (Client Component)
├── components/
│   └── vendor/
│       ├── vendor-activation-form.tsx
│       ├── vendor-contact-info-section.tsx
│       ├── vendor-addresses-section.tsx
│       └── vendor-address-fieldset.tsx
├── hooks/
│   ├── use-geolocation.ts               # New custom hook for geolocation
│   ├── customer.ts                      # New hook for fetching customer details
│   └── vendor.ts                        # New hook for vendor activation mutation
├── types/
│   └── vendor.ts                        # New types for Vendor, VendorAddress, etc.
├── server/
│   └── api/
│       └── routers/
│           └── vendor.ts                # New tRPC router for vendor operations
└── ...
```

### 6. Workflow

1.  **Define Zod Schemas and TypeScript Types:** Start by creating the necessary types and Zod schemas in `src/types/vendor.ts`.
2.  **Implement Geolocation Hook:** Create `src/hooks/use-geolocation.ts`.
3.  **Implement Customer Details Hook:** Create `src/hooks/customer.ts` to fetch logged-in user data.
4.  **Develop UI Components (Bottom-Up):**
    *   `VendorAddressFieldset`
    *   `VendorAddressesSection`
    *   `VendorContactInfoSection`
    *   `VendorActivationForm`
5.  **Create tRPC Router and Procedure:** Define the `vendor.activate` procedure in `src/server/api/routers/vendor.ts`.
6.  **Implement Vendor Activation Mutation Hook:** Create `src/hooks/vendor.ts` to call the tRPC procedure.
7.  **Integrate into `VendorActivationPage`:** Assemble all components and hooks in `src/app/(default)/v/activate/page.tsx`.
8.  **Styling and Responsiveness:** Apply DaisyUI and Tailwind CSS.
9.  **Testing:** Ensure all form fields work, validation is correct, pre-population functions, and submission updates the status.

### Mermaid Diagram: Component Flow

```mermaid
graph TD
    A[VendorActivationPage] --> B[VendorActivationForm]
    B --> C[VendorContactInfoSection]
    B --> D[VendorAddressesSection]
    D --> E[VendorAddressFieldset (multiple)]
    E --> F[useGeolocation Hook]
    A --> G[useCustomerDetails Hook]
    B --> H[useActivateVendor Mutation]
    H --> I[tRPC Vendor Router]
    I --> J[Medusa Backend API]
```

### Mermaid Diagram: Data Flow

```mermaid
graph TD
    A[Logged-in User] --> B[Browser Geolocation API]
    B --> C[useGeolocation Hook]
    C --> D[VendorAddressFieldset (pre-population)]

    E[Medusa Client (Frontend)] --> F[useCustomerDetails Hook]
    F --> G[VendorContactInfoSection (pre-population)]

    H[VendorActivationForm (Submission)] --> I[Zod Validation]
    I --> J[useActivateVendor Mutation]
    J --> K[tRPC Vendor Router]
    K --> L[Medusa Backend API (Update User Status, Save Vendor Profile/Addresses)]