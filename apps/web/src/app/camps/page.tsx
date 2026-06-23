import { supabase } from 'shared';
import CampsClient from './CampsClient';

export const metadata = {
  title: 'Donation Camps — India Blood Connect',
  description: 'Discover upcoming blood donation camps across India. Find camps near you organized by NGOs and hospitals.',
};

export default async function CampsPage() {
  const { data: camps } = await supabase
    .from('donation_camps')
    .select('*')
    .order('date_start', { ascending: true });

  return <CampsClient initialCamps={camps || []} />;
}
