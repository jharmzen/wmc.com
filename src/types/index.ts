// API Response Types
export interface AjaxResponse {
  Success: boolean;
  Msg: string;
  InsertId: number;
  AlertType: 'success' | 'warning' | 'error' | 'info';
}

// User Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
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
  email: string;
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
export interface Event {
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
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
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