import {
  HelpCircle,
  Shield,
  Clock,
  DollarSign,
  Users,
  Lock,
  TrendingUp,
  CreditCard,
  Banknote,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

export const faqData = [
  {
    question:
      "How does the deposit service work and when do I get my interest?",
    answer:
      "Our deposit service lets you securely save money with compounding returns. Savings interest is applied yearly from bank settings (default 6% p.a.). Funds are protected with bank-level security, and you can monitor growth anytime from your dashboard.",
    icon: <TrendingUp className="w-4 h-4" />,
    category: "Deposits",
  },
  {
    question:
      "Are there any fees for withdrawals and how fast are they processed?",
    answer:
      "Withdrawals create a pending request: funds are held immediately and released after admin/manager approval. Limits are controlled from Bank Settings. You’ll see status updates in your transactions list.",
    icon: <CreditCard className="w-4 h-4" />,
    category: "Withdrawals",
  },
  {
    question: "Can I transfer money to external banks and other users?",
    answer:
      "Yes! You can transfer funds between your own accounts instantly, send money to other users within our platform, and make external bank transfers. All transfers are secured with encryption and you'll receive real-time notifications for every transaction.",
    icon: <Users className="w-4 h-4" />,
    category: "Transfers",
  },
  {
    question: "What are the loan terms and interest rates?",
    answer:
      "We offer flexible loan amounts with a competitive flat interest rate configured by the bank (default 5% on principal). After admin approval funds are disbursed to your account, and you repay via secure Stripe checkout by installment.",
    icon: <DollarSign className="w-4 h-4" />,
    category: "Loans",
  },
  {
    question: "How secure is my money and personal information?",
    answer:
      "Your security is our top priority. We use bank-level encryption, multi-factor authentication, and comply with all financial regulations. Your funds are insured and stored in secure, regulated financial institutions. We never share your personal information with third parties.",
    icon: <Shield className="w-4 h-4" />,
    category: "Security",
  },
  {
    question: "What customer support is available if I need help?",
    answer:
      "We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our dedicated support team is trained to help with all aspects of your financial journey, from account setup to transaction assistance and loan guidance.",
    icon: <HelpCircle className="w-4 h-4" />,
    category: "Support",
  },
  {
    question:
      "How long does it take to set up an account and start using services?",
    answer:
      "Account setup takes just a few minutes! Simply provide your basic information, verify your identity, and you're ready to start. Deposits can be made immediately, and most services are available right after account verification. Our streamlined process gets you started quickly and securely.",
    icon: <Clock className="w-4 h-4" />,
    category: "Getting Started",
  },
  {
    question:
      "Are there any minimum amounts for deposits, withdrawals, or loans?",
    answer:
      "We keep minimums low to make our services accessible. There's no minimum for deposits or withdrawals, making it easy to manage any amount. Loan minimums vary based on your profile and creditworthiness, but we work to accommodate various financial needs and situations.",
    icon: <Lock className="w-4 h-4" />,
    category: "Limits",
  },
];

export const services = [
  {
    id: "deposit",
    title: "Deposit",
    icon: <ArrowDownLeft className="w-6 h-6" />,
    description: "Save your money and earn guaranteed returns",
    details: [
      "Secure your funds with our trusted deposit service",
      "Earn 0.08% interest annually on your deposited amount",
      "Interest is calculated and paid after 1 year of deposit",
      "No hidden fees or charges on your deposits",
      "24/7 access to monitor your deposit growth",
    ],
    highlight: "0.08% Annual Interest",
  },
  {
    id: "withdraw",
    title: "Withdraw",
    icon: <ArrowUpRight className="w-6 h-6" />,
    description: "Access your funds whenever you need them",
    details: [
      "Instant withdrawal processing for immediate access",
      "Multiple withdrawal methods available",
      "Secure transaction processing with encryption",
      "Real-time balance updates after withdrawal",
      "Transaction history tracking for all withdrawals",
    ],
    highlight: "Instant Access",
  },
  {
    id: "transfer",
    title: "Transfer",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Send money quickly and securely to any account",
    details: [
      "Transfer funds between your accounts instantly",
      "Send money to other users within our platform",
      "External bank transfer capabilities",
      "Real-time transaction notifications",
      "Secure encryption for all transfer operations",
    ],
    highlight: "Instant Transfers",
  },
  {
    id: "loan",
    title: "Loan",
    icon: <Banknote className="w-6 h-6" />,
    description: "Get the financial support you need with competitive rates",
    details: [
      "Flexible loan amounts based on your profile",
      "Quick approval process with minimal documentation",
      "Monthly payment schedule with 0.01% interest rate",
      "Early repayment options available",
      "Dedicated support throughout your loan term",
    ],
    highlight: "0.01% Monthly Interest",
  },
];
