import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from apps/web/.env.local
dotenv.config({ path: './apps/web/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const BLOOD_BANKS = [
  { name: 'Red Cross Blood Bank', address: '1 Red Cross Road', city: 'Delhi', state: 'Delhi', verified: true },
  { name: 'AIIMS Blood Centre', address: 'Ansari Nagar East', city: 'Delhi', state: 'Delhi', verified: true },
  { name: 'Rotary Blood Bank', address: 'Tughlakabad Institutional Area', city: 'Delhi', state: 'Delhi', verified: true },
  { name: 'Tata Memorial Hospital Blood Bank', address: 'Dr. E Borges Road, Parel', city: 'Mumbai', state: 'Maharashtra', verified: true },
  { name: 'Sankalp Blood Bank', address: 'Andheri West', city: 'Mumbai', state: 'Maharashtra', verified: true },
  { name: 'KEM Hospital Blood Bank', address: 'Acharya Donde Marg, Parel', city: 'Mumbai', state: 'Maharashtra', verified: true },
  { name: 'Lions Blood Bank', address: 'MG Road, Camp', city: 'Pune', state: 'Maharashtra', verified: true },
  { name: 'NIMHANS Blood Bank', address: 'Hosur Road, Lakkasandra', city: 'Bangalore', state: 'Karnataka', verified: true },
  { name: 'Rotary TTK Blood Bank', address: 'New Thippasandra', city: 'Bangalore', state: 'Karnataka', verified: true },
  { name: 'Lions Blood Bank', address: 'Egmore', city: 'Chennai', state: 'Tamil Nadu', verified: true },
  { name: 'Rajiv Gandhi Government General Hospital Blood Bank', address: 'Park Town', city: 'Chennai', state: 'Tamil Nadu', verified: true },
  { name: 'CMC Vellore Blood Bank', address: 'Ida Scudder Road', city: 'Vellore', state: 'Tamil Nadu', verified: true },
  { name: 'Chiranjeevi Blood Bank', address: 'Jubilee Hills', city: 'Hyderabad', state: 'Telangana', verified: true },
  { name: 'NTR Trust Blood Bank', address: 'Banjara Hills', city: 'Hyderabad', state: 'Telangana', verified: true },
  { name: 'Indian Red Cross Society', address: 'Vidhana Soudha', city: 'Hyderabad', state: 'Telangana', verified: true },
  { name: 'Gujarat Research & Medical Institute Blood Bank', address: 'Shahibag', city: 'Ahmedabad', state: 'Gujarat', verified: true },
  { name: 'Prathama Blood Centre', address: 'Vasna', city: 'Ahmedabad', state: 'Gujarat', verified: true },
  { name: 'Surat Raktadan Kendra', address: 'Udhna Magdalla Road', city: 'Surat', state: 'Gujarat', verified: true },
  { name: 'Kolkata Medical College Blood Bank', address: 'College Square', city: 'Kolkata', state: 'West Bengal', verified: true },
  { name: 'Lions Blood Bank', address: 'Deshapriya Park', city: 'Kolkata', state: 'West Bengal', verified: true },
  { name: 'SMS Hospital Blood Bank', address: 'JLN Marg', city: 'Jaipur', state: 'Rajasthan', verified: true },
  { name: 'Mahatma Gandhi Hospital Blood Bank', address: 'Sitapura', city: 'Jaipur', state: 'Rajasthan', verified: true },
  { name: 'PGI Blood Bank', address: 'Sector 12', city: 'Chandigarh', state: 'Chandigarh', verified: true },
  { name: 'IGMC Blood Bank', address: 'Lakkar Bazaar', city: 'Shimla', state: 'Himachal Pradesh', verified: true },
  { name: 'Doon Hospital Blood Bank', address: 'Dehradun City', city: 'Dehradun', state: 'Uttarakhand', verified: true },
  { name: 'SGPGIMS Blood Bank', address: 'Raebareli Road', city: 'Lucknow', state: 'Uttar Pradesh', verified: true },
  { name: 'KGMU Blood Bank', address: 'Chowk', city: 'Lucknow', state: 'Uttar Pradesh', verified: true },
  { name: 'PMCH Blood Bank', address: 'Ashok Rajpath', city: 'Patna', state: 'Bihar', verified: true },
  { name: 'RIMS Blood Bank', address: 'Bariatu', city: 'Ranchi', state: 'Jharkhand', verified: true },
  { name: 'SCB Medical College Blood Bank', address: 'Manglabag', city: 'Cuttack', state: 'Odisha', verified: true },
  { name: 'Capital Hospital Blood Bank', address: 'Unit-6', city: 'Bhubaneswar', state: 'Odisha', verified: true },
  { name: 'GMC Blood Bank', address: 'Bhangagarh', city: 'Guwahati', state: 'Assam', verified: true },
  { name: 'Civil Hospital Blood Bank', address: 'Police Bazar', city: 'Shillong', state: 'Meghalaya', verified: true },
  { name: 'RIMS Blood Bank', address: 'Lamphelpat', city: 'Imphal', state: 'Manipur', verified: true },
  { name: 'GMC Blood Bank', address: 'Bambolim', city: 'Goa', state: 'Goa', verified: true },
  { name: 'Medical College Blood Bank', address: 'Kumarapuram', city: 'Thiruvananthapuram', state: 'Kerala', verified: true },
  { name: 'Amrita Hospital Blood Bank', address: 'Edappally', city: 'Kochi', state: 'Kerala', verified: true },
  { name: 'JIPMER Blood Bank', address: 'Dhanvantri Nagar', city: 'Puducherry', state: 'Puducherry', verified: true },
  { name: 'MY Hospital Blood Bank', address: 'Residency Area', city: 'Indore', state: 'Madhya Pradesh', verified: true },
  { name: 'AIIMS Bhopal Blood Bank', address: 'Saket Nagar', city: 'Bhopal', state: 'Madhya Pradesh', verified: true }
];

async function runSeeding() {
  console.log(`🚀 Starting to seed ${BLOOD_BANKS.length} Blood Banks across India...`);

  const { error } = await supabase.from('blood_banks').insert(BLOOD_BANKS);

  if (error) {
    console.error("❌ Failed to seed blood banks:", error.message);
  } else {
    console.log("✅ Successfully seeded all blood banks into the database!");
  }
}

runSeeding().catch(console.error);
