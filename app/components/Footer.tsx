import { CreditCard, ShoppingCartIcon as Paypal } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Payment Methods */}
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-gray-500 mb-3 text-center md:text-left">Accepted Payment Methods</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm">Visa</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Paypal className="h-5 w-5" />
                <span className="text-sm">PayPal</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm">Mastercard</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-right">
            <p className="text-xs text-gray-500">&copy; {currentYear} TechGadgets. All rights reserved.</p>
            <p className="text-xs text-gray-400 mt-1">Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

