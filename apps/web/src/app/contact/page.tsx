'use client';

import { Phone, MapPin, Clock } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { supabase } from 'shared';

export default function ContactUsPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('contact_messages').insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    });

    setLoading(false);
    
    if (error) {
      alert("Failed to send message: " + error.message);
    } else {
      alert("Your message has been sent successfully!");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 pt-28 pb-24">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white inline-block relative">
          Contact Us
          <div className="absolute -bottom-4 left-1/4 right-1/4 h-[2px] bg-[#d32f2f]"></div>
        </h1>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row bg-white dark:bg-neutral-900 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1)] border border-neutral-200 dark:border-neutral-800 rounded-sm overflow-hidden">
          
          {/* Left Column (Form) */}
          <div className="w-full lg:w-[60%] p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">Get In Touch</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-[15px] leading-relaxed">
              Please use this form to contact us regarding any questions, comments or concerns you may have.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" className="w-full px-4 py-3 rounded-[3px] border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-[#c82333] focus:border-[#c82333] outline-none transition-all text-[15px]" />
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className="w-full px-4 py-3 rounded-[3px] border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-[#c82333] focus:border-[#c82333] outline-none transition-all text-[15px]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" className="w-full px-4 py-3 rounded-[3px] border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-[#c82333] focus:border-[#c82333] outline-none transition-all text-[15px]" />
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" className="w-full px-4 py-3 rounded-[3px] border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-[#c82333] focus:border-[#c82333] outline-none transition-all text-[15px]" />
              </div>
              <div>
                <textarea required name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows={4} className="w-full px-4 py-3 rounded-[3px] border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-[#c82333] focus:border-[#c82333] outline-none transition-all resize-y text-[15px]"></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-3 bg-[#b52b2b] hover:bg-[#a31526] text-white font-semibold text-[15px] rounded-[3px] shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column (Info) */}
          <div className="w-full lg:w-[40%] bg-[#b52b2b] text-white p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-3">Reach Us</h2>
            <p className="text-red-100 text-[15px] leading-relaxed mb-10">
              Please call us regarding any questions, comments or concerns you may have.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 shrink-0 fill-white stroke-none" />
                <span className="font-bold text-[15px]">+91-7818801293</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 fill-white stroke-[#b52b2b]" />
                <span className="font-bold text-[15px] leading-relaxed">Address- IIT Kharagpur</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 shrink-0 stroke-white" />
                <span className="font-bold text-[15px]">Mon-Sat: 9:00 AM - 7:00PM</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
