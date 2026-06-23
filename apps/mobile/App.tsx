import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { supabase } from 'shared';

const { width } = Dimensions.get('window');

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Nav state
  const [currentScreen, setCurrentScreen] = useState<'LOGIN' | 'REGISTER' | 'PROFILE' | 'SEARCH' | 'CHAT'>('PROFILE');
  const [chatDonorId, setChatDonorId] = useState('');

  // Login state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');

  // Register state
  const [formData, setFormData] = useState({ name: '', blood_group: 'A+', gender: 'Male', city: '', locality: '', pincode: '', lat: '', lng: '' });

  // Search state
  const [searchBg, setSearchBg] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) checkProfile(session.user.id);
      else setLoading(false);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) checkProfile(session.user.id);
      else { setProfile(null); setCurrentScreen('LOGIN'); }
    });
  }, []);

  const checkProfile = async (userId: string) => {
    const { data } = await supabase.from('users').select('*').eq('id', userId).single();
    setProfile(data || 'NOT_FOUND');
    setCurrentScreen(data ? 'PROFILE' : 'REGISTER');
    setLoading(false);
  };

  const handleSendOtp = async () => {
    setLoading(true);
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
    setLoading(false);
    if (error) Alert.alert('Error', error.message);
    else setStep('OTP');
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    const { error } = await supabase.auth.verifyOtp({ phone: formattedPhone, token: otp, type: 'sms' });
    setLoading(false);
    if (error) Alert.alert('Error', error.message);
  };

  const handleGetLocation = async (forSearch = false) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied');
      return null;
    }
    let location = await Location.getCurrentPositionAsync({});
    if (!forSearch) {
      setFormData({ ...formData, lat: location.coords.latitude.toString(), lng: location.coords.longitude.toString() });
    }
    return location.coords;
  };

  const handleRegister = async () => {
    if (!session?.user) return;
    setLoading(true);
    const { error } = await supabase.from('users').insert([{
      id: session.user.id, phone: session.user.phone, ...formData,
      lat: formData.lat ? parseFloat(formData.lat) : null,
      lng: formData.lng ? parseFloat(formData.lng) : null,
      is_available_to_donate: true
    }]);
    setLoading(false);
    if (error) Alert.alert('Error', error.message);
    else checkProfile(session.user.id);
  };

  const handleSearch = async (useLocation = false) => {
    setSearching(true);
    setSearched(true);
    let lat = null, lng = null;
    if (useLocation) {
      const coords = await handleGetLocation(true);
      if (coords) { lat = coords.latitude; lng = coords.longitude; }
    }
    const { data, error } = await supabase.rpc('search_donors_nearby', {
      search_lat: lat, search_lng: lng, radius_meters: 50000,
      filter_blood_group: searchBg || null, filter_city: useLocation ? null : (searchCity || null)
    });
    setSearching(false);
    if (error) Alert.alert('Error', error.message);
    else setSearchResults(data || []);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#e11d48" />
        <Text style={{ marginTop: 10, color: '#e11d48', fontWeight: 'bold' }}>Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.authContainer}>
          <Text style={styles.headerTitle}>Blood Connect</Text>
          <Text style={styles.subtitle}>Login to save a life today.</Text>
          {step === 'PHONE' ? (
            <>
              <TextInput style={styles.input} placeholder="+91 9876543210" placeholderTextColor="#aaa" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
              <TouchableOpacity style={styles.primaryBtn} onPress={handleSendOtp}>
                <Text style={styles.primaryBtnText}>Send OTP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput style={styles.input} placeholder="123456" placeholderTextColor="#aaa" value={otp} onChangeText={setOtp} keyboardType="number-pad" />
              <TouchableOpacity style={styles.primaryBtn} onPress={handleVerifyOtp}>
                <Text style={styles.primaryBtnText}>Verify</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStep('PHONE')} style={{ marginTop: 15 }}>
                <Text style={styles.linkText}>Back to Phone</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (profile === 'NOT_FOUND') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.headerTitle}>Complete Profile</Text>
          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#aaa" value={formData.name} onChangeText={(t) => setFormData({...formData, name: t})} />
          <TextInput style={styles.input} placeholder="Blood Group (e.g. A+)" placeholderTextColor="#aaa" value={formData.blood_group} onChangeText={(t) => setFormData({...formData, blood_group: t})} />
          <TextInput style={styles.input} placeholder="City" placeholderTextColor="#aaa" value={formData.city} onChangeText={(t) => setFormData({...formData, city: t})} />
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TouchableOpacity style={[styles.secondaryBtn, { flex: 1 }]} onPress={() => handleGetLocation(false)}>
              <Text style={styles.secondaryBtnText}>Get Current Location</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister}>
            <Text style={styles.primaryBtnText}>Complete Registration</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'SEARCH') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitleSmall}>Find Donors</Text>
          <TouchableOpacity onPress={() => setCurrentScreen('PROFILE')} style={styles.headerActionBtn}>
            <Text style={styles.headerActionText}>Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchPanel}>
          <TextInput style={styles.searchInput} placeholder="Blood Group (e.g. O+)" placeholderTextColor="#999" value={searchBg} onChangeText={setSearchBg} />
          <TextInput style={styles.searchInput} placeholder="City or Pincode" placeholderTextColor="#999" value={searchCity} onChangeText={setSearchCity} />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 5 }}>
            <TouchableOpacity style={[styles.primaryBtn, { flex: 2 }]} onPress={() => handleSearch(false)}>
              <Text style={styles.primaryBtnText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondaryBtn, { flex: 1 }]} onPress={() => handleSearch(true)}>
              <Text style={styles.secondaryBtnText}>Near Me</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.resultsScroll} contentContainerStyle={{ paddingBottom: 30 }}>
          {searching ? (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#e11d48" />
              <Text style={{ marginTop: 10, color: '#e11d48', fontWeight: '600' }}>Finding donors...</Text>
            </View>
          ) : searched && searchResults.length === 0 ? (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 16 }}>No donors found matching criteria.</Text>
            </View>
          ) : (
            searchResults.map((d, i) => (
              <View key={d.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardName}>{d.name}</Text>
                    <Text style={styles.cardLocality}>{d.locality}, {d.city}</Text>
                  </View>
                  <View style={styles.bloodGroupBadge}>
                    <Text style={styles.bloodGroupText}>{d.blood_group}</Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  {d.distance_meters !== null && (
                    <Text style={styles.cardInfoText}>Distance: ~{(d.distance_meters / 1000).toFixed(1)} km</Text>
                  )}
                  <Text style={styles.cardInfoText}>
                    Last Donated: {d.last_donated_at ? new Date(d.last_donated_at).toLocaleDateString() : 'Never/Unknown'}
                  </Text>
                </View>

                <View style={styles.cardFooter}>
                  {d.is_available_to_donate ? (
                    <View style={styles.availableBadge}>
                      <View style={styles.availableDot} />
                      <Text style={styles.availableText}>Available Now</Text>
                    </View>
                  ) : (
                    <Text style={styles.unavailableText}>Unavailable</Text>
                  )}
                  
                  <TouchableOpacity style={styles.requestBtn} onPress={() => { setChatDonorId(d.id); setCurrentScreen('CHAT'); }}>
                    <Text style={styles.requestBtnText}>Request</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'CHAT') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitleSmall}>Chat</Text>
          <TouchableOpacity onPress={() => setCurrentScreen('SEARCH')} style={styles.headerActionBtn}>
            <Text style={styles.headerActionText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <View style={styles.chatPlaceholder}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>Chat Request Initiated</Text>
            <Text style={{ textAlign: 'center', color: '#666', lineHeight: 22 }}>
              A request has been sent to donor{'\n'}<Text style={{ fontWeight: 'bold' }}>{chatDonorId}</Text>{'\n'}
              You can start chatting once they accept.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // default PROFILE
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>{profile.name?.charAt(0)}</Text>
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profilePhone}>{profile.phone}</Text>
          <View style={styles.bloodGroupBadge}>
            <Text style={styles.bloodGroupText}>{profile.blood_group}</Text>
          </View>
        </View>

        <View style={{ marginTop: 40, width: '100%', gap: 15 }}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => { setSearchBg(''); setSearchCity(''); setSearchResults([]); setSearched(false); setCurrentScreen('SEARCH'); }}>
            <Text style={styles.primaryBtnText}>Search Donors</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.secondaryBtn, { backgroundColor: '#fee2e2', borderColor: '#fca5a5' }]} onPress={() => supabase.auth.signOut()}>
            <Text style={[styles.secondaryBtnText, { color: '#ef4444' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf2f2' },
  scrollContainer: { padding: 24, paddingTop: 40 },
  authContainer: { flex: 1, justifyContent: 'center', padding: 24 },
  profileContainer: { flex: 1, alignItems: 'center', padding: 24, paddingTop: 60 },
  
  headerTitle: { fontSize: 32, fontWeight: '900', color: '#e11d48', marginBottom: 10, textAlign: 'center' },
  headerTitleSmall: { fontSize: 22, fontWeight: '800', color: '#e11d48' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  
  headerBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#fce7f3' },
  headerActionBtn: { padding: 8, backgroundColor: '#ffe4e6', borderRadius: 20, paddingHorizontal: 15 },
  headerActionText: { color: '#e11d48', fontWeight: 'bold', fontSize: 14 },
  
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#fecdd3', padding: 16, borderRadius: 12, marginBottom: 15, fontSize: 16, color: '#333' },
  searchInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e5e5', padding: 14, borderRadius: 10, marginBottom: 10, fontSize: 15, color: '#333' },
  
  primaryBtn: { backgroundColor: '#e11d48', padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#e11d48', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  secondaryBtn: { backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#cbd5e1' },
  secondaryBtnText: { color: '#475569', fontWeight: 'bold', fontSize: 16 },
  
  linkText: { color: '#e11d48', textAlign: 'center', fontSize: 15, fontWeight: '600' },
  
  searchPanel: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2, zIndex: 10 },
  resultsScroll: { flex: 1, backgroundColor: '#f8fafc', padding: 15 },
  
  card: { backgroundColor: '#fff', padding: 18, borderRadius: 16, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#f1f5f9' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  cardName: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  cardLocality: { fontSize: 14, color: '#64748b', marginTop: 2 },
  
  bloodGroupBadge: { backgroundColor: '#ffe4e6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  bloodGroupText: { color: '#e11d48', fontWeight: '900', fontSize: 16 },
  
  cardBody: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 10, marginBottom: 15 },
  cardInfoText: { fontSize: 13, color: '#475569', marginBottom: 4 },
  
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 12 },
  availableBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ecfdf5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: '#d1fae5' },
  availableDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981', marginRight: 6 },
  availableText: { color: '#059669', fontSize: 12, fontWeight: 'bold' },
  unavailableText: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  
  requestBtn: { backgroundColor: '#1e293b', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  requestBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  
  chatPlaceholder: { backgroundColor: '#fff', padding: 30, borderRadius: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, width: width * 0.85 },
  
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  profileAvatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ffe4e6', justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderWidth: 3, borderColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 5 },
  profileAvatarText: { fontSize: 40, fontWeight: 'bold', color: '#e11d48' },
  profileName: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 5 },
  profilePhone: { fontSize: 16, color: '#64748b', marginBottom: 15 }
});
