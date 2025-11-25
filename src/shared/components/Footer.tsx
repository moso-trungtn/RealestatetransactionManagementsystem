export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://lf-homepage-444859640964.us-central1.run.app/images/logo/loanfactory.svg"
                alt="LoanFactory Logo"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400" style={{ fontSize: '14px' }}>
              The complete transaction management system for real estate professionals.
            </p>
          </div>
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-500 transition-colors" style={{ fontSize: '14px' }}>Features</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors" style={{ fontSize: '14px' }}>Pricing</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors" style={{ fontSize: '14px' }}>Demo</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-500 transition-colors" style={{ fontSize: '14px' }}>About</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors" style={{ fontSize: '14px' }}>Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors" style={{ fontSize: '14px' }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-500 transition-colors" style={{ fontSize: '14px' }}>Privacy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors" style={{ fontSize: '14px' }}>Terms</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors" style={{ fontSize: '14px' }}>Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p style={{ fontSize: '14px' }}>© 2025 LoanFactory Transaction . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
