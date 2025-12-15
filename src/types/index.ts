// API Response Types
export interface AjaxResponse {
  Success: boolean;
  Msg: any;
  InsertId: number;
  AlertType: 'success' | 'warning' | 'error' | 'info';
}

export interface ApiResponse<T> {
  Success: boolean;
  Msg: T;
  InsertId?: number;
  AlertType?: string;
}

// User Types
export interface User {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
  // Legacy fields
  FirstNames?: string;
  Surname?: string;
  Email?: string;
  Phone?: string;
  ClientCode?: string;
  MemberStatusCode?: string;
  MemberStatusDescription?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  termsAccepted: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone?: string;
}

// Document Types
export interface Document {
  id: number;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  url: string;
}

// Invoice Types
export interface Invoice {
  id: number;
  invoiceNumber: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  createdAt: string;
}

// Event Types
export interface WMCEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  price: number;
  imageUrl?: string;
}

// Booking Types
export interface Booking {
  id: number;
  eventId: number;
  userId: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

// Webinar Types
export interface Webinar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  speaker: string;
  maxAttendees: number;
  currentAttendees: number;
  registrationUrl: string;
  imageUrl?: string;
}

// Component Props Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'back';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface AlertProps {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  onClose?: () => void;
  className?: string;
}

// API Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface UploadDocumentRequest {
  file: File;
  type: string;
}

export interface SubmitInvoiceRequest {
  invoiceNumber: string;
  amount: number;
  description: string;
  dueDate: string;
}

export interface BookEventRequest {
  eventId: number;
}

export interface RegisterWebinarRequest {
  webinarId: number;
}

export const allowedCodes = ['MS-D', 'MS-EXEC', 'MS-PREM', 'MS-PE', 'MS-P', 'MS-PG', 'MS-PS'];

export interface MemberData {
  AnnualCommission: number;
  Bond: string | null;
  Charter: number;
  ClientCode: string;
  ClientPercentage: string | null;
  ClientType: string | null;
  ClubUnitAmount: string;
  ClubUnitGrowth: number;
  ClubUnitPercentageLimit: number;
  ClubUnitPricePerUnit: number;
  ClubUnits: string;
  CommissionSubmission: boolean;
  CurrencyCode: string;
  Email: string;
  Events: Array<{
    SeminarName: string;
    EventDate: string;
    StartTime: string;
    Venue: string;
    EventImage: string;
    SocialImage: string;
  }>;
  ExchangeRate: number;
  FirstNames: string;
  Graduate: number;
  IsAmbassador: boolean;
  IsDeleted: number;
  Limit: number;
  LoyaltyPoints: number;
  MemberCode: string;
  MemberStatusCode: string;
  MemberStatusDescription: string;
  OffSet: number;
  OperationalEntity: boolean;
  PaidCourses: string | null;
  Phone: string;
  Portfolios: string | null;
  Properties: string | null;
  ResultCount: number;
  Sponsor: string;
  SponsorName: string;
  Status: number;
  StatusCode: string;
  Surname: string;
  Value: string | null;
  ZarToDollar: string;
  ambassador_terms: number;
  wmc_terms: number;
}

interface SuccessMsg {
  Msg: Array<string>;
  MemberData: MemberData;
}

export interface LoginResponse {
  Success: boolean;
  Msg: SuccessMsg | string[]; // string[] if "Authentication failed" is returned as an array
  InsertId: number;
  AlertType: string;
}

export interface DashboardStats {
  AnnualCommission: string;
  totalCommission: string;
  clubUnits: string;
  growthRate: string;
  eventsThisMonth: number;
}

export interface Event {
  title: string;
  date: string;
  time: string;
  event_image: string;
  social_image: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export interface ExistingContactRequest {
  ServiceProviderContactRequestId: number;
  Name: string;
  Email: string;
  Phone: string;
  RequestDate: string;
  Subject: string;
  Comment: string;
  Estimated: boolean;
  Quoted: boolean;
  Invoiced: boolean;
  EstimatedAmount: string;
  InvoiceAmountQuoted: string;
  InvoiceAmountSent: string;
  ProfitAmount: string;
  Notes: string;
  ByMemberClientFullName: string;
}

export interface Assignee {
  id: number;
  name: string;
}

export interface Article {
  Title: string;
  OgImage: string;
  Content?: string;
  Description?: string;
  // Add other article properties as needed
}

export interface WebinarData {
  Title: string;
  EventId: string | null;
  SeminarImage: string;
  Content: string;
  Description: string;
  BookingLink?: string; // Optional URL for external booking systems
}

export interface WebinarEvent {
  SeminarName: string;
  EventDate: string;
  StartTime: string;
  Venue: string;
  EventImage: string;
  SocialImage: string;
  BookingLink?: string;
}

export interface WebinarAccess {
  Success: boolean;
  Msg: {
    ClientId: number;
    Name: string;
    EventId: number;
    SeminarId: number;
    EventDate: string;
    Streaming: number;
    EnrolmentId: number;
    EnrolmentDate: string;
    EmbeddedCode: string;
    StreamingInfo: {
      stream_url: string;
      hls_url: string;
      dash_url: string;
      expires_at: string;
    };
    Image: string;
    StreamablePeriod: boolean;
  };
  InsertId: number;
  AlertType: string;
}

export interface WebinarStreamingData {
  Access: WebinarAccess;
  Title: string;
  Content: string;
  Description: string;
  SeminarId: number;
  EventId: number | null;
  EventDate: string;
  StartTime: string;
  DurationCode: string;
  DurationQuantity: number;
  LanguageCode: string;
  SeminarName: string;
  SeminarImage: string;
  BannerImage: string;
  SocialImage: string;
  Name: string;
  EmbeddedCode: string;
}

export interface QuestionnaireFormData {
  [key: string]: unknown; // Placeholder for questionnaire fields
}

export interface AffordabilityFormData {
  [key: string]: unknown; // Placeholder for affordability fields
}

export interface ProfileFormData {
  [key: string]: unknown; // Placeholder for profile fields
}