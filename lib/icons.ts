import {
  Search,
  Tag,
  KeyRound,
  Building2,
  Wrench,
  Scale,
  Banknote,
  ShieldCheck,
  Package,
  ArrowRight,
  Sparkles,
  Star,
  Bot,
  BarChart3,
  Bell,
  TrendingUp,
  Video,
  HardHat,
  Globe,
  FileText,
  BookOpen,
  Home,
  Clock,
  Newspaper,
  Camera,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Waves,
  Dumbbell,
  CircleDot,
  Flame,
  Footprints,
  TreePine,
  Car,
  Bus,
  Train,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Utensils,
  Phone,
  Mail,
  MessageCircle,
  Heart,
  Zap,
  Shield,
  Eye,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Minus,
  Check,
  Info,
  AlertCircle,
  Compass,
  Navigation,
  Plane,
  Briefcase,
  Users,
  Baby,
  Gamepad2,
  Bike,
  ParkingCircle,
  Coffee,
  Wifi,
  Lock,
  Landmark,
  Theater,
  Music,
  Palette,
  Volleyball,
  type LucideIcon,
} from 'lucide-react'

// ─── Icon Registry ───
// Maps semantic keys to Lucide icon components

export const icons: Record<string, LucideIcon> = {
  // Services page
  'property-search': Search,
  'selling': Tag,
  'rental': KeyRound,
  'property-management': Building2,
  'renovation': Wrench,
  'legal': Scale,
  'financing': Banknote,
  'visa': ShieldCheck,
  'post-purchase': Package,

  // Navigation & UI
  'arrow-right': ArrowRight,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'sparkles': Sparkles,
  'star': Star,
  'close': X,
  'plus': Plus,
  'minus': Minus,
  'check': Check,
  'info': Info,
  'alert': AlertCircle,
  'download': Download,
  'external-link': ExternalLink,
  'eye': Eye,

  // About / Features
  'bot': Bot,
  'chart': BarChart3,
  'bell': Bell,
  'trending-up': TrendingUp,
  'video': Video,
  'heart': Heart,
  'zap': Zap,
  'shield': Shield,
  'briefcase': Briefcase,
  'users': Users,

  // Property specs
  'bed': Bed,
  'bath': Bath,
  'size': Maximize2,
  'location': MapPin,
  'camera': Camera,
  'home': Home,
  'building': Building2,
  'landmark': Landmark,

  // Facilities
  'pool': Waves,
  'gym': Dumbbell,
  'tennis': CircleDot,
  'bbq': Flame,
  'jogging': Footprints,
  'garden': TreePine,
  'parking': ParkingCircle,
  'playground': Baby,
  'basketball': Volleyball,
  'badminton': Volleyball,
  'yoga': Heart,
  'snooker': Gamepad2,
  'cycling': Bike,
  'cafe': Coffee,
  'wifi': Wifi,
  'security': Lock,
  'theater': Theater,
  'music': Music,
  'art': Palette,

  // Transit & Nearby
  'train': Train,
  'bus': Bus,
  'car': Car,
  'plane': Plane,
  'compass': Compass,
  'navigation': Navigation,
  'globe': Globe,

  // Nearby POI categories
  'school': GraduationCap,
  'hospital': Hospital,
  'shopping': ShoppingBag,
  'restaurant': Utensils,

  // Contact
  'phone': Phone,
  'mail': Mail,
  'whatsapp': MessageCircle,

  // News
  'construction': HardHat,
  'news': Newspaper,
  'document': FileText,
  'book': BookOpen,
  'clock': Clock,
}

// ─── Apple HIG-inspired color themes ───

export type IconTheme =
  | 'green'
  | 'blue'
  | 'amber'
  | 'purple'
  | 'pink'
  | 'red'
  | 'indigo'
  | 'teal'
  | 'orange'
  | 'slate'

export const iconThemeClasses: Record<IconTheme, { bg: string; text: string; border: string }> = {
  green:  { bg: 'bg-emerald-50',  text: 'text-emerald-600',  border: 'border-emerald-200' },
  blue:   { bg: 'bg-blue-50',     text: 'text-blue-600',     border: 'border-blue-200' },
  amber:  { bg: 'bg-amber-50',    text: 'text-amber-600',    border: 'border-amber-200' },
  purple: { bg: 'bg-purple-50',   text: 'text-purple-600',   border: 'border-purple-200' },
  pink:   { bg: 'bg-pink-50',     text: 'text-pink-600',     border: 'border-pink-200' },
  red:    { bg: 'bg-red-50',      text: 'text-red-600',      border: 'border-red-200' },
  indigo: { bg: 'bg-indigo-50',   text: 'text-indigo-600',   border: 'border-indigo-200' },
  teal:   { bg: 'bg-teal-50',     text: 'text-teal-600',     border: 'border-teal-200' },
  orange: { bg: 'bg-orange-50',   text: 'text-orange-600',   border: 'border-orange-200' },
  slate:  { bg: 'bg-slate-100',   text: 'text-slate-600',    border: 'border-slate-200' },
}

// ─── Semantic icon themes (which color for which context) ───

export const serviceIconThemes: Record<string, IconTheme> = {
  'property-search': 'blue',
  'selling': 'amber',
  'rental': 'green',
  'property-management': 'purple',
  'renovation': 'orange',
  'legal': 'indigo',
  'financing': 'teal',
  'visa': 'red',
  'post-purchase': 'green',
}

export const facilityIconThemes: Record<string, IconTheme> = {
  'pool': 'blue',
  'gym': 'red',
  'tennis': 'green',
  'bbq': 'orange',
  'jogging': 'teal',
  'garden': 'green',
  'parking': 'slate',
  'playground': 'pink',
  'basketball': 'amber',
  'badminton': 'purple',
  'yoga': 'pink',
  'snooker': 'indigo',
  'security': 'slate',
}

export const nearbyIconThemes: Record<string, IconTheme> = {
  'train': 'blue',
  'bus': 'green',
  'school': 'amber',
  'hospital': 'red',
  'shopping': 'purple',
  'restaurant': 'orange',
}

// ─── Helper: Get icon component by key ───

export function getIcon(key: string): LucideIcon {
  return icons[key] || Info
}

// ─── Helper: Get themed icon classes ───

export function getIconClasses(theme: IconTheme) {
  return iconThemeClasses[theme]
}
