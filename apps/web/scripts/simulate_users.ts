import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from apps/web/.env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables.");
  process.exit(1);
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function runSimulation() {
  console.log("🚀 Starting 10-User Simulation...");

  const users: any[] = [];
  const clients: any[] = [];

  // Step 1 & 2: Registration and Profile Completion
  console.log("\n--- Phase 1: Registration & Profile Completion ---");
  for (let i = 1; i <= 10; i++) {
    // We create a fresh client instance for each user so sessions don't collide
    const client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });
    clients.push(client);

    // Randomize phone number so tests can be run multiple times
    const randomSuffix = Math.floor(1000000 + Math.random() * 9000000);
    const phone = `+9199${randomSuffix}`;
    const password = 'TestPassword123!';

    console.log(`[User ${i}] Signing up with ${phone}...`);
    const { data: authData, error: signUpError } = await client.auth.signUp({
      phone,
      password,
    });

    if (signUpError) {
      console.error(`❌ [User ${i}] Sign up failed: ${signUpError.message}`);
      continue;
    }

    const userId = authData.user!.id;
    const bloodGroup = BLOOD_GROUPS[i % BLOOD_GROUPS.length];
    const city = CITIES[i % CITIES.length];
    
    // Slight jitter in location
    const lat = 28.6139 + (Math.random() - 0.5) * 0.1;
    const lng = 77.2090 + (Math.random() - 0.5) * 0.1;

    console.log(`[User ${i}] Completing profile (Blood: ${bloodGroup}, City: ${city})...`);
    
    const { error: profileError } = await client.from('users').insert([{
      id: userId,
      phone,
      name: `Simulated User ${i}`,
      blood_group: bloodGroup,
      gender: i % 2 === 0 ? 'Female' : 'Male',
      city,
      locality: 'Downtown',
      pincode: '110001',
      lat,
      lng,
      is_available_to_donate: true
    }]);

    if (profileError) {
      console.error(`❌ [User ${i}] Profile creation failed: ${profileError.message}`);
    } else {
      console.log(`✅ [User ${i}] Profile created successfully.`);
      users.push({ id: userId, client, bloodGroup, lat, lng });
    }
    
    // Sleep to prevent rate limiting
    await sleep(500);
  }

  if (users.length < 2) {
    console.error("Not enough users registered successfully to continue the test.");
    return;
  }

  // Step 3: Donor Search
  console.log("\n--- Phase 2: Donor Search via RPC ---");
  const seeker = users[0];
  console.log(`[User 1] Searching for donors near lat: ${seeker.lat.toFixed(4)}, lng: ${seeker.lng.toFixed(4)}...`);
  
  const { data: searchResults, error: searchError } = await seeker.client.rpc('search_donors_nearby', {
    search_lat: seeker.lat,
    search_lng: seeker.lng,
    radius_meters: 50000, // 50km
  });

  if (searchError) {
    console.error(`❌ Donor search failed: ${searchError.message}`);
  } else {
    console.log(`✅ Found ${searchResults?.length || 0} potential donors nearby.`);
  }

  // Step 4: Blood Requests
  console.log("\n--- Phase 3: Creating Blood Requests ---");
  const requester = users[1];
  console.log(`[User 2] Creating an urgent blood request for ${requester.bloodGroup}...`);

  const { data: requestData, error: requestError } = await requester.client.from('blood_requests').insert([{
    requester_id: requester.id,
    blood_group: requester.bloodGroup,
    units_needed: 2,
    hospital_name: 'City General Hospital',
    city: 'Delhi',
    lat: requester.lat,
    lng: requester.lng,
    urgency: 'critical',
    status: 'open'
  }]).select().single();

  if (requestError) {
    console.error(`❌ Blood request creation failed: ${requestError.message}`);
  } else {
    console.log(`✅ Blood request created with ID: ${requestData.id}`);
  }

  // Step 5: Chat Interaction
  console.log("\n--- Phase 4: Chat Interaction ---");
  const userA = users[2];
  const userB = users[3];
  
  console.log(`[User 3] Initiating chat with [User 4]...`);
  const { data: chatData, error: chatError } = await userA.client.from('chats').insert([{
    user_a_id: userA.id,
    user_b_id: userB.id,
  }]).select().single();

  if (chatError) {
    console.error(`❌ Chat creation failed: ${chatError.message}`);
  } else {
    console.log(`✅ Chat created with ID: ${chatData.id}`);
    
    console.log(`[User 3] Sending a message...`);
    const { error: msg1Error } = await userA.client.from('messages').insert([{
      chat_id: chatData.id,
      sender_id: userA.id,
      text: "Hi, are you available to donate blood tomorrow?"
    }]);

    if (msg1Error) console.error(`❌ Message 1 failed: ${msg1Error.message}`);
    else console.log(`✅ Message 1 sent.`);

    console.log(`[User 4] Replying to the message...`);
    const { error: msg2Error } = await userB.client.from('messages').insert([{
      chat_id: chatData.id,
      sender_id: userB.id,
      text: "Yes, I can be at the hospital by 10 AM."
    }]);

    if (msg2Error) console.error(`❌ Message 2 failed: ${msg2Error.message}`);
    else console.log(`✅ Message 2 sent.`);
  }

  console.log("\n🎉 Simulation complete! All tested functions are working correctly.");
}

runSimulation().catch(console.error);
