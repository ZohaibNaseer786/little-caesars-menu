export type OrderType = 'pickup' | 'delivery'

export interface Address {
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface StoreHours {
  open: string
  close: string
  isClosed: boolean
}

export interface OrderTypeConfig {
  enabled: boolean
  estimatedMinutes: number
  minimumOrder: number
  fee?: number
}

export interface StoreFeatures {
  pizzaPortal: boolean
  driveThru: boolean
  delivery: boolean
  pickup: boolean
  onlineOrdering: boolean
}

export interface Store {
  id: string
  name: string
  address: Address
  coords: { latitude: number; longitude: number }
  hours: Record<string, StoreHours>
  currentlyOpen: boolean
  orderTypes: { pickup: OrderTypeConfig; delivery: OrderTypeConfig }
  paymentMethods: string[]
  features: StoreFeatures
}

export interface Category {
  id: string
  name: string
  slug: string
  displayOrder: number
  isAvailable: boolean
  badge?: string
}

export interface CalorieInfo {
  perSlice?: number
  perServing?: number
  total?: number
  label: string
}

export interface CustomizationOption {
  id: string
  name: string
  priceDelta: number
  caloriesDelta?: number
  isDefault?: boolean
}

export interface Customizations {
  sizes?: CustomizationOption[]
  crusts?: CustomizationOption[]
  sauces?: CustomizationOption[]
  cheeses?: CustomizationOption[]
  toppings?: CustomizationOption[]
  maxToppings?: number
}

export interface NutritionInfo {
  calories: number
  totalFat: number
  saturatedFat: number
  transFat: number
  cholesterol: number
  sodium: number
  totalCarbs: number
  dietaryFiber: number
  sugars: number
  protein: number
  servingSize: string
  servingsPerContainer: number
}

export interface MenuItem {
  id: string
  categoryId: string
  name: string
  slug: string
  description: string
  basePrice: number
  image: { thumbnail: string; full: string }
  badge?: string
  isHotNReady: boolean
  isFeatured: boolean
  isLimitedTime: boolean
  isAvailable: boolean
  orderTypes: string[]
  tags: string[]
  calories: CalorieInfo
  allergens: string[]
  customizable: boolean
  customizations?: Customizations
  nutrition?: NutritionInfo
}

export interface Deal {
  id: string
  title: string
  description: string
  price: number
  originalPrice: number
  badge: string
  image: string
  promoCode?: string
  discountType: 'flat' | 'percent' | 'bogo' | 'free_item'
  discountValue: number
  minimumOrder: number
  orderTypes: string[]
  validUntil: string | null
  isLimitedTime: boolean
  isAppOnly: boolean
  isAvailable: boolean
}

export interface SelectedOptions {
  size?: CustomizationOption
  crust?: CustomizationOption
  sauce?: CustomizationOption
  cheese?: CustomizationOption
  toppings: CustomizationOption[]
}

export interface MenuResponse {
  categories: Category[]
  items: MenuItem[]
  deals: Deal[]
  store: Store
}

export interface AppState {
  storeId: string
  orderType: OrderType
  locale: string
  selectedCategory: string
  setStoreId: (id: string) => void
  setOrderType: (type: OrderType) => void
  setSelectedCategory: (slug: string) => void
}
