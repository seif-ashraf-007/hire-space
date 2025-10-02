export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  HOST = 'host',
}

export enum SpaceStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  UNDER_REVIEW = 'under_review',
}

export enum RoomStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
