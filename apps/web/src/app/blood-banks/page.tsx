import { supabase } from 'shared';
import BloodBankClient from './BloodBankClient';

export const metadata = {
  title: 'Blood Bank Directory — India Blood Connect',
  description: 'Find verified blood banks across India. Search by state and city to locate the nearest blood bank.',
};

export default async function BloodBanksPage() {
  // Server-side fetch for SEO
  const { data: banks } = await supabase
    .from('blood_banks')
    .select('*')
    .order('city', { ascending: true });

  return <BloodBankClient initialBanks={banks || []} />;
}
