
import {
  AlarmClock,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  BadgePlus,
  BarChart3,
  Boxes,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Circle,
  Cog,
  Copy,
  CreditCard,
  Crop,
  DollarSign,
  Download,
  Edit,
  Eye,
  EyeOff,
  FileTerminal,
  Filter,
  Footprints,
  GalleryVerticalEnd,
  Gem,
  HardHat,
  Heart,
  Image,
  LayoutDashboard,
  ListOrderedIcon,
  Loader2,
  LocateIcon,
  LockIcon,
  LogOut,
  Mailbox,
  Menu,
  MessageSquare,
  Minus,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  PackageSearch,
  Pencil,
  PencilRuler,
  PercentIcon,
  Phone,
  Plus,
  PlusCircle,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldQuestion,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sliders,
  SlidersHorizontal,
  Star,
  Store,
  SunMedium,
  Tag,
  Trash,
  Twitter,
  UploadCloud,
  User,
  Volume2,
  VolumeX,
  Wallet,
  X,
  type LucideIcon,
  type LucideProps,
  HomeIcon,
  Bolt,
  Mail,
  Bell,
  Building2,
  Usb,
  Timer,
  FileUpIcon,
  Bot,
  ExternalLink,
  Zap,
  FileJson,
  File,
  AreaChart,
  AppWindowIcon,
  Monitor,
  ListTodo,
} from "lucide-react";

export type Icon = LucideIcon | any;

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  star: Star,
  twitter: Twitter,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronUpDown: ChevronsUpDown,
  arrowUp: ArrowUp,
  order: ListOrderedIcon,
  lock: LockIcon,
  success: BadgeCheck,
  arrowDown: ArrowDown,
  home:HomeIcon,
  graph:AreaChart,
  application:AppWindowIcon,
  monitor:Monitor,
  task:ListTodo,

  menu: Menu,
  attribute: Cog,
  tag: Tag,
  verticalThreeDots: MoreVertical,
  horizontalThreeDots: MoreHorizontal,
  verticalSliders: Sliders,
  horizontalSliders: SlidersHorizontal,
  circle: Circle,
  check: Check,
  plus: BadgePlus,
  gem: Gem,
  review: Mailbox,
  phone: Phone,
  percent: PercentIcon,
  add: Plus,
  addCircle: PlusCircle,
  remove: Minus,
  eyeOff: EyeOff,
  view: Eye,
  hide: EyeOff,
  question: ShieldQuestion,
  products: PackageSearch,
  trash: Trash,
  arrowPrev: ChevronLeft,
  arrowNext: ChevronRight,
  edit: Edit,
  dashboard: LayoutDashboard,
  slidersHorizontal: SlidersHorizontal,
  moreHorizontal: MoreHorizontal,
  crop: Crop,
  address: LocateIcon,
  message: MessageSquare,
  reset: RefreshCw,
  send: Send,
  email:Mail,
  bell:Bell,
  copy: Copy,
  downlaod: Download,
  warning: AlertTriangle,
  search: Search,
  filter: Filter,
  alarm: AlarmClock,
  pencil: Pencil,
  calendar: CalendarDays,
  user: User,
  card: CreditCard,
  wishlist: Heart,
  terminal: FileTerminal,
  settings: Settings,
  logout: LogOut,
  group: Boxes,
  volumne: Volume2,
  volumneMute: VolumeX,
  billing: CreditCard,
  wallet: Wallet,
  storehouse: Store,
  category: GalleryVerticalEnd,
  author: PencilRuler,
  dollarSign: DollarSign,
  cart: ShoppingCart,
  product: Package,
  store: ShoppingBag,
  chart: BarChart3,
  upload: UploadCloud,
  placeholder: Image,
  clothing: Shirt,
  shoes: Footprints,
  accessories: HardHat,
  nextjs: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
      />
    </svg>
  ),
  imageGenarator: (props: LucideProps) => (
    <Image
      {...props}
      className='text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out'
    />
  ),
 
 
  PDFGenerator: (props: LucideProps) => (
    <File
      {...props}
      className='text-purple-500 hover:text-purple-700 transition duration-200 ease-in-out'
    />
  ),
  fileGenerator: (props: LucideProps) => (
    <File
      {...props}
      className='text-indigo-500 hover:text-indigo-700 transition duration-200 ease-in-out'
    />
  ),
  textToJson: (props: LucideProps) => (
    <FileJson
      {...props}
      className='text-amber-500 hover:text-amber-700 transition duration-200 ease-in-out'
    />
  ),
  trigger: (props: LucideProps) => (
    <Zap
      {...props}
      className='text-pink-500 hover:text-pink-700 transition duration-200 ease-in-out'
    />
  ),
  extractData: (props: LucideProps) => (
    <ExternalLink
      {...props}
      className='text-teal-500 hover:text-teal-700 transition duration-200 ease-in-out'
    />
  ),
  ai: (props: LucideProps) => (
    <Bot
      {...props}
      className='text-gray-500 hover:text-gray-700 transition duration-200 ease-in-out'
    />
  ),
  fileUploader: (props: LucideProps) => (
    <FileUpIcon
      {...props}
      className='text-red-500 hover:text-red-700 transition duration-200 ease-in-out'
    />
  ),
  timer: (props: LucideProps) => (
    <Timer
      {...props}
      className='text-green-500 hover:text-green-700 transition duration-200 ease-in-out'
    />
  ),
  apiConnector: (props: LucideProps) => (
    <Usb
      {...props}
      className='text-cyan-500 hover:text-cyan-700 transition duration-200 ease-in-out'
    />
  ),
  scraper: (props: LucideProps) => (
    <Building2
      {...props}
      className='text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out'
    />
  ),
  condition: (props: LucideProps) => (
    <svg
     
      viewBox='0 0 0.6 0.6'
      xmlns='http://www.w3.org/2000/svg'

      {...props}
      
    >
      <path d='m0.484 0.209 0.097 -0.097L0.486 0.016l-0.018 0.018L0.534 0.1H0.35v0.2H0.199a0.088 0.088 0 1 0 0 0.025H0.275v0.175h0.258l-0.066 0.066 0.018 0.018 0.097 -0.097 -0.096 -0.096 -0.018 0.018L0.534 0.475H0.3v-0.15h0.075V0.125h0.158L0.467 0.191zM0.113 0.375A0.063 0.063 0 1 1 0.175 0.313 0.063 0.063 0 0 1 0.113 0.375' />
      <path fill='none' d='M0 0h0.6v0.6H0z' />
    </svg>
  ),
  slack: (props: LucideProps) => (
    <svg
      viewBox='0 0 16 16'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      {...props}
    >
      <g fill-rule='evenodd' clip-rule='evenodd'>
        <path
          fill='#E01E5A'
          d='M2.471 11.318a1.474 1.474 0 001.47-1.471v-1.47h-1.47A1.474 1.474 0 001 9.846c.001.811.659 1.469 1.47 1.47zm3.682-2.942a1.474 1.474 0 00-1.47 1.471v3.683c.002.811.66 1.468 1.47 1.47a1.474 1.474 0 001.47-1.47V9.846a1.474 1.474 0 00-1.47-1.47z'
        />

        <path
          fill='#36C5F0'
          d='M4.683 2.471c.001.811.659 1.469 1.47 1.47h1.47v-1.47A1.474 1.474 0 006.154 1a1.474 1.474 0 00-1.47 1.47zm2.94 3.682a1.474 1.474 0 00-1.47-1.47H2.47A1.474 1.474 0 001 6.153c.002.812.66 1.469 1.47 1.47h3.684a1.474 1.474 0 001.47-1.47z'
        />

        <path
          fill='#2EB67D'
          d='M9.847 7.624a1.474 1.474 0 001.47-1.47V2.47A1.474 1.474 0 009.848 1a1.474 1.474 0 00-1.47 1.47v3.684c.002.81.659 1.468 1.47 1.47zm3.682-2.941a1.474 1.474 0 00-1.47 1.47v1.47h1.47A1.474 1.474 0 0015 6.154a1.474 1.474 0 00-1.47-1.47z'
        />

        <path
          fill='#ECB22E'
          d='M8.377 9.847c.002.811.659 1.469 1.47 1.47h3.683A1.474 1.474 0 0015 9.848a1.474 1.474 0 00-1.47-1.47H9.847a1.474 1.474 0 00-1.47 1.47zm2.94 3.682a1.474 1.474 0 00-1.47-1.47h-1.47v1.47c.002.812.659 1.469 1.47 1.47a1.474 1.474 0 001.47-1.47z'
        />
      </g>
    </svg>
  ),
  CheckMarkCircle: (props: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 330 330'
      fill='currentColor'
      {...props}
      className='text-green-500 hover:text-green-700 transition duration-200 ease-in-out'
    >
      <path d='M165 0C74.019 0 0 74.019 0 165s74.019 165 165 165 165-74.019 165-165S255.981 0 165 0zm0 300c-74.44 0-135-60.561-135-135S90.56 30 165 30s135 60.561 135 135-60.561 135-135 135z' />
      <path d='M226.872 106.664l-84.854 84.853-38.89-38.891c-5.857-5.857-15.355-5.858-21.213-.001-5.858 5.858-5.858 15.355 0 21.213l49.496 49.498a15 15 0 0010.606 4.394h.001c3.978 0 7.793-1.581 10.606-4.393l95.461-95.459c5.858-5.858 5.858-15.355 0-21.213-5.858-5.858-15.355-5.859-21.213-.001z' />
    </svg>
  ),
  input: ({ ...props }: LucideProps) => (
    <svg
      viewBox='0 0 76 76'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className='text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out rounded'
      {...props}
    >
      <path
        fillOpacity='1'
        strokeWidth='0.2'
        strokeLinejoin='round'
        d='M 15.8333,23.75L 60.1667,23.75C 61.9156,23.75 63.3333,25.1678 63.3333,26.9167L 63.3333,49.0833C 63.3333,50.8322 61.9156,52.25 60.1667,52.25L 15.8333,52.25C 14.0844,52.25 12.6667,50.8322 12.6667,49.0833L 12.6667,26.9167C 12.6667,25.1678 14.0844,23.75 15.8333,23.75 Z M 17.4166,28.5L 17.4166,47.5L 58.5833,47.5L 58.5833,28.5L 17.4166,28.5 Z '
      />
    </svg>
  ),

  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="discord"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  facebook: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" {...props}>
      <path
        fill="currentColor"
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
      />
    </svg>
  ),
  discord: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
      <path
        fill="currentColor"
        d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
      />
    </svg>
  ),

  bakery: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 512 512"
      width="512"
      height="512"
      fill="currentColor"
      {...props}
    >
      <path
        d="M213.056,231.438a8,8,0,1,0,5.888-14.876c-18.527-7.335-42.3-11.374-66.944-11.374s-48.417,4.039-66.944,11.374a8,8,0,1,0,5.888,14.876c16.7-6.61,38.382-10.25,61.056-10.25S196.357,224.828,213.056,231.438Z"
        fill="currentColor"
      />
      <path
        d="M416,16H384c-23.366,0-43.613,25.444-58.552,73.58-7.08,22.815-12.528,49.446-16.163,78.42H144v.118c-32.288.855-62.486,6.86-85.746,17.149C31.006,197.319,16,214.135,16,232.617c0,15.891,11.317,30.777,32,42.266V422.049a65.688,65.688,0,0,0-23.435,38.717,29.684,29.684,0,0,0,6.2,24.659A28.79,28.79,0,0,0,53.047,496H346.953a28.681,28.681,0,0,0,17.852-6.229A34.1,34.1,0,0,0,384,496h32c23.366,0,43.613-25.444,58.552-73.58C488.383,377.854,496,318.751,496,256s-7.617-121.854-21.448-166.42C459.613,41.444,439.366,16,416,16ZM53.047,480a12.848,12.848,0,0,1-9.929-4.743,13.738,13.738,0,0,1-2.851-11.416,49.465,49.465,0,0,1,29.246-36.168,111.883,111.883,0,0,0-4.867,19.063A47.027,47.027,0,0,0,71.416,480ZM104,480H99.361c-4.729,0-9.3-2.31-12.859-6.5-5.263-6.195-7.531-15.233-6.067-24.177,4-24.452,16.7-44.92,33.932-56.125a86.14,86.14,0,0,0-.505,38.033l9.6,45.7a23.548,23.548,0,0,0,.886,3.067Zm18.94-108.547c-18.246,5.984-33.872,19.364-44.576,37.26A63.07,63.07,0,0,0,64,412.654V270.061a8,8,0,0,0-4.415-7.152C41.8,253.993,32,243.235,32,232.617,32,221.024,43.929,209.1,64.727,199.9,87.905,189.646,118.9,184,152,184s64.1,5.646,87.273,15.9c20.8,9.2,32.727,21.125,32.727,32.718,0,10.618-9.8,21.376-27.585,30.292A8,8,0,0,0,240,270.061v66.433a82.933,82.933,0,0,0-19.088-6.381,104.007,104.007,0,0,0-41.824,0,82.889,82.889,0,0,0-52.978,36.075C124.979,367.91,123.938,369.673,122.94,371.453Zm147.539,56.485-9.6,45.707A8.037,8.037,0,0,1,253.05,480H146.95a8.037,8.037,0,0,1-7.829-6.355l-9.6-45.707a69.688,69.688,0,0,1,9.962-52.964,66.994,66.994,0,0,1,42.8-29.184,88.1,88.1,0,0,1,35.426,0,66.994,66.994,0,0,1,42.8,29.184A69.688,69.688,0,0,1,270.479,427.938ZM313.5,473.5c-3.563,4.193-8.13,6.5-12.859,6.5H275.651a23.579,23.579,0,0,0,.886-3.066l9.6-45.706a86.14,86.14,0,0,0-.5-38.033c17.233,11.2,29.929,31.674,33.932,56.126C321.029,458.265,318.761,467.3,313.5,473.5ZM277.06,371.453c-1-1.78-2.039-3.543-3.17-5.265A84.568,84.568,0,0,0,256,346.53V274.883c20.683-11.489,32-26.375,32-42.266,0-18.482-15.006-35.3-42.254-47.35-.982-.435-2-.848-3-1.267h64.745C305.194,206.984,304,231.205,304,256c0,56.555,6.13,109.782,17.4,152.319C310.705,390.619,295.172,377.393,277.06,371.453Zm79.822,103.8A12.848,12.848,0,0,1,346.953,480H328.584a47.028,47.028,0,0,0,6.77-33.265,111.965,111.965,0,0,0-4.867-19.062,49.463,49.463,0,0,1,29.246,36.169A13.737,13.737,0,0,1,356.882,475.257ZM384,480a18.245,18.245,0,0,1-9.814-3.218,29.809,29.809,0,0,0,1.249-16.016A65.552,65.552,0,0,0,339.708,414.3a401.074,401.074,0,0,1-9.879-42.129c11.047-3.1,35.55-7.273,67.641,3.423v0a8,8,0,1,0,5.058-15.17v0l-.089-.029-.113-.035c-34.435-11.43-61.2-7.762-75.142-4.084a677.754,677.754,0,0,1-7.164-94.85c9.779-3.326,35.077-9.281,69.448,2.176v0a8,8,0,1,0,5.058-15.17v0l-.088-.028-.116-.037c-33.673-11.174-60.012-7.529-74.241-3.655a669.018,669.018,0,0,1,6.836-87.643c9.119-3,35.244-9.227,70.549,2.541v0a8,8,0,1,0,5.058-15.17v0l-.089-.029-.113-.035c-32.393-10.752-57.989-8.143-72.517-4.733a393.693,393.693,0,0,1,10.918-45.292C352.84,55.3,369.016,32,384,32s31.16,23.3,43.271,62.322C440.639,137.4,448,194.812,448,256s-7.361,118.605-20.729,161.678C415.16,456.7,398.984,480,384,480Zm75.271-62.322C447.16,456.7,430.984,480,416,480h-1.859c10.781-12.331,20.367-31.659,28.411-57.58C456.383,377.854,464,318.751,464,256s-7.617-121.854-21.448-166.42c-8.044-25.921-17.63-45.249-28.411-57.58H416c14.984,0,31.16,23.3,43.271,62.322C472.639,137.4,480,194.812,480,256S472.639,374.605,459.271,417.678Z"
        fill="currentColor"
      />
    </svg>
  ),
  book: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24.6"
      height="19.335"
      viewBox="0 0 24.6 19.335"
      fill="currentColor"
      {...props}
    >
      <g id="Books" transform="translate(-24.7 -30.187)">
        <g
          id="Group_12308"
          data-name="Group 12308"
          transform="translate(25 32.504)"
        >
          <g
            id="Group_12306"
            data-name="Group 12306"
            transform="translate(0 0)"
          >
            <path
              id="Path_17416"
              data-name="Path 17416"
              d="M32.612,50.142h0a34.57,34.57,0,0,0-7.238.8h0l0,0V35a0,0,0,0,1,0,0h.583a0,0,0,0,0,0,0v-.357a0,0,0,0,0,0,0h-.771a.183.183,0,0,0-.183.183V51.164a.182.182,0,0,0,.183.183.181.181,0,0,0,.036,0,28.735,28.735,0,0,1,9.287-.669.006.006,0,0,0,.006,0,.005.005,0,0,0,0-.006Z"
              transform="translate(-25 -34.629)"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.6"
            />
          </g>
          <g
            id="Group_12307"
            data-name="Group 12307"
            transform="translate(14.922 0)"
          >
            <path
              id="Path_17417"
              data-name="Path 17417"
              d="M64.983,34.629h-.776V35H64.8V50.957c-.5-.063-1.009-.13-1.515-.2a47.178,47.178,0,0,0-6.073-.546l-.013,0-1.075.311a.048.048,0,0,0,.017.094,37.04,37.04,0,0,1,7.1.5c.576.076,1.152.152,1.724.223a.183.183,0,0,0,.205-.181V34.812A.183.183,0,0,0,64.983,34.629Z"
              transform="translate(-56.088 -34.629)"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.6"
            />
          </g>
        </g>
        <g
          id="Group_12309"
          data-name="Group 12309"
          transform="translate(26.919 30.542)"
        >
          <path
            id="Path_17418"
            data-name="Path 17418"
            d="M49.16,30.842a.183.183,0,0,0-.166-.182c-.314-.029-7.587-.67-9.915,1.365-2.327-2.035-9.6-1.393-9.915-1.365a.183.183,0,0,0-.166.182v15.7a.183.183,0,0,0,.195.183c.073,0,7.272-.441,9.754,2.133a.187.187,0,0,0,.062.042h0a.186.186,0,0,0,.069.013.182.182,0,0,0,.069-.013h0a.187.187,0,0,0,.062-.042c2.481-2.573,9.682-2.138,9.754-2.133a.187.187,0,0,0,.137-.049.183.183,0,0,0,.058-.134Zm-19.8,15.51V31.011c1.122-.085,7.578-.49,9.531,1.336V48.314c-2.072-1.743-6.2-1.988-8.356-1.988C30.006,46.326,29.594,46.341,29.364,46.352Zm19.429,0c-1.16-.056-6.948-.212-9.531,1.962V32.347c1.954-1.827,8.409-1.421,9.531-1.336Z"
            transform="translate(-28.998 -30.542)"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </g>
      </g>
    </svg>
  ),
  dress: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24.6"
      height="19.335"
      viewBox="0 0 24.6 19.335"
      fill="currentColor"
      {...props}
    >
      <g id="Books" transform="translate(-24.7 -30.187)">
        <g
          id="Group_12308"
          data-name="Group 12308"
          transform="translate(25 32.504)"
        >
          <g
            id="Group_12306"
            data-name="Group 12306"
            transform="translate(0 0)"
          >
            <path
              id="Path_17416"
              data-name="Path 17416"
              d="M32.612,50.142h0a34.57,34.57,0,0,0-7.238.8h0l0,0V35a0,0,0,0,1,0,0h.583a0,0,0,0,0,0,0v-.357a0,0,0,0,0,0,0h-.771a.183.183,0,0,0-.183.183V51.164a.182.182,0,0,0,.183.183.181.181,0,0,0,.036,0,28.735,28.735,0,0,1,9.287-.669.006.006,0,0,0,.006,0,.005.005,0,0,0,0-.006Z"
              transform="translate(-25 -34.629)"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.6"
            />
          </g>
          <g
            id="Group_12307"
            data-name="Group 12307"
            transform="translate(14.922 0)"
          >
            <path
              id="Path_17417"
              data-name="Path 17417"
              d="M64.983,34.629h-.776V35H64.8V50.957c-.5-.063-1.009-.13-1.515-.2a47.178,47.178,0,0,0-6.073-.546l-.013,0-1.075.311a.048.048,0,0,0,.017.094,37.04,37.04,0,0,1,7.1.5c.576.076,1.152.152,1.724.223a.183.183,0,0,0,.205-.181V34.812A.183.183,0,0,0,64.983,34.629Z"
              transform="translate(-56.088 -34.629)"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.6"
            />
          </g>
        </g>
        <g
          id="Group_12309"
          data-name="Group 12309"
          transform="translate(26.919 30.542)"
        >
          <path
            id="Path_17418"
            data-name="Path 17418"
            d="M49.16,30.842a.183.183,0,0,0-.166-.182c-.314-.029-7.587-.67-9.915,1.365-2.327-2.035-9.6-1.393-9.915-1.365a.183.183,0,0,0-.166.182v15.7a.183.183,0,0,0,.195.183c.073,0,7.272-.441,9.754,2.133a.187.187,0,0,0,.062.042h0a.186.186,0,0,0,.069.013.182.182,0,0,0,.069-.013h0a.187.187,0,0,0,.062-.042c2.481-2.573,9.682-2.138,9.754-2.133a.187.187,0,0,0,.137-.049.183.183,0,0,0,.058-.134Zm-19.8,15.51V31.011c1.122-.085,7.578-.49,9.531,1.336V48.314c-2.072-1.743-6.2-1.988-8.356-1.988C30.006,46.326,29.594,46.341,29.364,46.352Zm19.429,0c-1.16-.056-6.948-.212-9.531,1.962V32.347c1.954-1.827,8.409-1.421,9.531-1.336Z"
            transform="translate(-28.998 -30.542)"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </g>
      </g>
    </svg>
  ),
 clickboard: ({ ...props }: LucideProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                opacity="0.5"
                d="M16 4.00195C18.175 4.01406 19.3529 4.11051 20.1213 4.87889C21 5.75757 21 7.17179 21 10.0002V16.0002C21 18.8286 21 20.2429 20.1213 21.1215C19.2426 22.0002 17.8284 22.0002 15 22.0002H9C6.17157 22.0002 4.75736 22.0002 3.87868 21.1215C3 20.2429 3 18.8286 3 16.0002V10.0002C3 7.17179 3 5.75757 3.87868 4.87889C4.64706 4.11051 5.82497 4.01406 8 4.00195"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path d="M8 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 10.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 17.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
 )
};


export function getFlairSize(size: "sm" | "md" | "lg"): string {
  switch (size) {
    case "sm":
      return "size-2"
    case "lg":
      return "size-6"
    default:
      return "size-4"
  }
}

