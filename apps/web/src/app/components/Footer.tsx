import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#990a12] text-white pt-16 pb-8 border-t border-[#800000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 mb-16">
          
          {/* Column 1: Save Life */}
          <div>
            <h4 className="text-xl font-bold mb-6 tracking-wide">Save Life</h4>
            <ul className="space-y-4 text-sm text-red-100 font-medium">
              <li><Link href="/request" className="hover:text-white transition-colors">Request Blood</Link></li>
              <li><Link href="/blood-banks" className="hover:text-white transition-colors">Find Blood Bank</Link></li>
              <li><Link href="/camps" className="hover:text-white transition-colors">Find Blood Camp</Link></li>
            </ul>
          </div>

          {/* Column 2: Register */}
          <div>
            <h4 className="text-xl font-bold mb-6 tracking-wide">Register</h4>
            <ul className="space-y-4 text-sm text-red-100 font-medium">
              <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Signup</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xl font-bold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4 text-sm text-red-100 font-medium">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Brand & Description */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm shrink-0">
                <Heart className="w-4 h-4 text-[#990a12] fill-current" />
              </div>
              <h4 className="text-xl font-black tracking-widest uppercase">BLOODSYNC</h4>
            </div>
            <p className="text-sm text-red-100 font-medium leading-relaxed mb-6">
              BloodSync is a platform that helps to streamline blood donation and blood request which puts the power to save a life in the palm of your hand.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c2.258 0 4.083 1.825 4.083 4.083s-1.825 4.083-4.083 4.083zm0-1.583c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm6.5 1.583c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c2.258 0 4.083 1.825 4.083 4.083s-1.825 4.083-4.083 4.083zm0-1.583c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
