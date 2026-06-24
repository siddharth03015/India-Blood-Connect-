// Comprehensive list of Indian cities — major metros, state capitals, tier-2, and tier-3 cities
// Organized by state/UT for maintainability

const INDIA_CITIES_BY_STATE: Record<string, string[]> = {
  // Andhra Pradesh
  'Andhra Pradesh': [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry',
    'Tirupati', 'Kakinada', 'Kadapa', 'Anantapur', 'Eluru', 'Ongole', 'Vizianagaram',
    'Machilipatnam', 'Adoni', 'Tenali', 'Proddatur', 'Chittoor', 'Hindupur', 'Bhimavaram',
    'Madanapalle', 'Guntakal', 'Srikakulam', 'Dharmavaram', 'Gudivada', 'Narasaraopet',
    'Tadipatri', 'Mangalagiri', 'Chilakaluripet', 'Amaravati'
  ],

  // Arunachal Pradesh
  'Arunachal Pradesh': [
    'Itanagar', 'Naharlagun', 'Tawang', 'Ziro', 'Pasighat', 'Bomdila', 'Along', 'Tezu', 'Roing'
  ],

  // Assam
  'Assam': [
    'Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur',
    'Bongaigaon', 'Karimganj', 'Goalpara', 'Sivasagar', 'Lakhimpur', 'Diphu', 'Dhubri',
    'Nalbari', 'Kokrajhar', 'Barpeta', 'Mangaldoi', 'Haflong'
  ],

  // Bihar
  'Bihar': [
    'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Arrah',
    'Bihar Sharif', 'Begusarai', 'Chapra', 'Katihar', 'Munger', 'Hajipur', 'Sasaram',
    'Dehri', 'Siwan', 'Bettiah', 'Saharsa', 'Motihari', 'Nawada', 'Buxar', 'Jehanabad',
    'Aurangabad', 'Samastipur', 'Madhubani', 'Sitamarhi', 'Lakhisarai', 'Jamui'
  ],

  // Chhattisgarh
  'Chhattisgarh': [
    'Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Raigarh',
    'Jagdalpur', 'Ambikapur', 'Mahasamund', 'Dhamtari', 'Chirmiri', 'Kawardha',
    'Dalli Rajhara', 'Dongargarh', 'Mungeli', 'Kanker', 'Kirandul'
  ],

  // Goa
  'Goa': [
    'Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem',
    'Sanquelim', 'Cuncolim', 'Sanguem', 'Canacona', 'Quepem', 'Pernem'
  ],

  // Gujarat
  'Gujarat': [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh',
    'Gandhinagar', 'Gandhidham', 'Anand', 'Navsari', 'Morbi', 'Nadiad', 'Surendranagar',
    'Bharuch', 'Mehsana', 'Bhuj', 'Porbandar', 'Palanpur', 'Valsad', 'Vapi', 'Godhra',
    'Veraval', 'Patan', 'Kalol', 'Dahod', 'Botad', 'Amreli', 'Deesa', 'Jetpur',
    'Gondal', 'Kutch', 'Dwarka', 'Daman', 'Silvassa'
  ],

  // Haryana
  'Haryana': [
    'Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar',
    'Karnal', 'Sonipat', 'Panchkula', 'Bhiwani', 'Sirsa', 'Bahadurgarh', 'Jind',
    'Thanesar', 'Kaithal', 'Rewari', 'Palwal', 'Hansi', 'Narnaul', 'Fatehabad',
    'Mahendragarh', 'Hodal', 'Pehowa', 'Manesar', 'Dharuhera', 'Tosham', 'Sohna'
  ],

  // Himachal Pradesh
  'Himachal Pradesh': [
    'Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Palampur', 'Baddi', 'Nahan',
    'Hamirpur', 'Una', 'Kullu', 'Manali', 'Bilaspur', 'Chamba', 'Kangra',
    'Parwanoo', 'Sundernagar', 'Paonta Sahib', 'Kasauli', 'Dalhousie'
  ],

  // Jharkhand
  'Jharkhand': [
    'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar', 'Giridih',
    'Ramgarh', 'Phusro', 'Medininagar', 'Chaibasa', 'Chatra', 'Dumka', 'Godda',
    'Gumla', 'Latehar', 'Lohardaga', 'Pakur', 'Sahebganj', 'Seraikela'
  ],

  // Karnataka
  'Karnataka': [
    'Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Dharwad', 'Belgaum', 'Gulbarga',
    'Bellary', 'Davangere', 'Shimoga', 'Tumkur', 'Raichur', 'Bijapur', 'Bidar',
    'Hassan', 'Udupi', 'Mandya', 'Chitradurga', 'Kolar', 'Hospet', 'Gadag',
    'Bagalkot', 'Ramanagara', 'Chikmagalur', 'Chamarajanagar', 'Haveri', 'Yadgir',
    'Karwar', 'Koppal', 'Ranebennur', 'Robertson Pet', 'Bhadravati', 'Gangavati'
  ],

  // Kerala
  'Kerala': [
    'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur',
    'Alappuzha', 'Kottayam', 'Palakkad', 'Malappuram', 'Thalassery', 'Kasaragod',
    'Munnar', 'Wayanad', 'Idukki', 'Pathanamthitta', 'Perinthalmanna', 'Guruvayur',
    'Changanassery', 'Kayamkulam', 'Nedumangad', 'Attingal', 'Irinjalakuda', 'Shoranur'
  ],

  // Madhya Pradesh
  'Madhya Pradesh': [
    'Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna',
    'Ratlam', 'Rewa', 'Murwara', 'Singrauli', 'Burhanpur', 'Khandwa', 'Morena',
    'Bhind', 'Chhindwara', 'Vidisha', 'Shivpuri', 'Damoh', 'Mandsaur', 'Hoshangabad',
    'Itarsi', 'Sehore', 'Betul', 'Datia', 'Shahdol', 'Seoni', 'Neemuch', 'Khargone',
    'Tikamgarh', 'Guna', 'Ashok Nagar', 'Chhatarpur', 'Balaghat', 'Pithampur'
  ],

  // Maharashtra
  'Maharashtra': [
    'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur',
    'Amravati', 'Navi Mumbai', 'Sangli', 'Jalgaon', 'Akola', 'Latur', 'Dhule',
    'Ahmednagar', 'Chandrapur', 'Parbhani', 'Jalna', 'Ichalkaranji', 'Bhiwandi',
    'Panvel', 'Satara', 'Beed', 'Yavatmal', 'Kamptee', 'Gondia', 'Wardha', 'Nanded',
    'Ratnagiri', 'Osmanabad', 'Hinganghat', 'Baramati', 'Vasai', 'Virar', 'Badlapur',
    'Ambernath', 'Ulhasnagar', 'Mira-Bhayandar', 'Kalyan', 'Dombivli', 'Lonavala',
    'Malegaon', 'Washim', 'Hingoli', 'Sindhudurg', 'Alibag'
  ],

  // Manipur
  'Manipur': [
    'Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Ukhrul', 'Senapati', 'Tamenglong',
    'Kakching', 'Moreh', 'Lilong'
  ],

  // Meghalaya
  'Meghalaya': [
    'Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar', 'Baghmara', 'Resubelpara',
    'Nongpoh', 'Mairang', 'Cherrapunji'
  ],

  // Mizoram
  'Mizoram': [
    'Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Saiha', 'Lawngtlai', 'Mamit'
  ],

  // Nagaland
  'Nagaland': [
    'Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Mon', 'Zunheboto',
    'Phek', 'Peren', 'Kiphire'
  ],

  // Odisha
  'Odisha': [
    'Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri',
    'Balasore', 'Bhadrak', 'Baripada', 'Jeypore', 'Jharsuguda', 'Bargarh',
    'Angul', 'Koraput', 'Paradip', 'Dhenkanal', 'Kendrapara', 'Sunabeda',
    'Rayagada', 'Jatani', 'Byasanagar', 'Brahmapur'
  ],

  // Punjab
  'Punjab': [
    'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur',
    'Batala', 'Pathankot', 'Moga', 'Abohar', 'Malerkotla', 'Khanna', 'Muktsar',
    'Barnala', 'Rajpura', 'Firozpur', 'Kapurthala', 'Phagwara', 'Mansa', 'Sangrur',
    'Faridkot', 'Fazilka', 'Gurdaspur', 'Zirakpur', 'Ropar', 'Nabha', 'Tarn Taran'
  ],

  // Rajasthan
  'Rajasthan': [
    'Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara',
    'Alwar', 'Bharatpur', 'Sri Ganganagar', 'Sikar', 'Pali', 'Tonk', 'Kishangarh',
    'Beawar', 'Hanumangarh', 'Dhaulpur', 'Gangapur City', 'Sawai Madhopur',
    'Barmer', 'Churu', 'Jhunjhunu', 'Chittorgarh', 'Nagaur', 'Bundi', 'Jhalawar',
    'Banswara', 'Dungarpur', 'Rajsamand', 'Karauli', 'Sirohi', 'Jaisalmer',
    'Mount Abu', 'Pushkar', 'Neemrana', 'Dausa', 'Baran', 'Pratapgarh'
  ],

  // Sikkim
  'Sikkim': [
    'Gangtok', 'Namchi', 'Mangan', 'Gyalshing', 'Rangpo', 'Singtam', 'Jorethang', 'Pelling'
  ],

  // Tamil Nadu
  'Tamil Nadu': [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli',
    'Tirupur', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul', 'Thanjavur',
    'Ranipet', 'Sivakasi', 'Karur', 'Kumbakonam', 'Nagercoil', 'Kanchipuram',
    'Hosur', 'Neyveli', 'Cuddalore', 'Ambur', 'Vaniyambadi', 'Pollachi',
    'Nagapattinam', 'Rajapalayam', 'Gudiyatham', 'Pudukkottai', 'Villupuram',
    'Tambaram', 'Avadi', 'Tiruvannamalai', 'Krishnagiri', 'Dharmapuri', 'Ariyalur',
    'Perambalur', 'Ooty', 'Kodaikanal', 'Mahabalipuram', 'Chidambaram'
  ],

  // Telangana
  'Telangana': [
    'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Ramagundam', 'Khammam',
    'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet', 'Miryalaguda', 'Siddipet',
    'Jagtial', 'Mancherial', 'Kamareddy', 'Nirmal', 'Bodhan', 'Zaheerabad',
    'Sangareddy', 'Medak', 'Wanaparthy', 'Secunderabad'
  ],

  // Tripura
  'Tripura': [
    'Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Belonia', 'Ambassa',
    'Khowai', 'Teliamura', 'Sabroom', 'Sonamura'
  ],

  // Uttar Pradesh
  'Uttar Pradesh': [
    'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Prayagraj', 'Bareilly',
    'Aligarh', 'Moradabad', 'Saharanpur', 'Gorakhpur', 'Noida', 'Firozabad',
    'Jhansi', 'Muzaffarnagar', 'Mathura', 'Budaun', 'Rampur', 'Shahjahanpur',
    'Farrukhabad', 'Ayodhya', 'Mau', 'Hapur', 'Etawah', 'Mirzapur', 'Bulandshahr',
    'Sambhal', 'Amroha', 'Hardoi', 'Fatehpur', 'Raebareli', 'Orai', 'Unnao',
    'Lakhimpur Kheri', 'Sitapur', 'Bahraich', 'Deoria', 'Sultanpur', 'Azamgarh',
    'Bijnor', 'Banda', 'Gonda', 'Ballia', 'Jaunpur', 'Ghazipur', 'Pratapgarh',
    'Greater Noida', 'Ghaziabad', 'Vrindavan', 'Faizabad', 'Lalitpur', 'Sonbhadra',
    'Etah', 'Mainpuri', 'Hathras', 'Kasganj', 'Baghpat'
  ],

  // Uttarakhand
  'Uttarakhand': [
    'Dehradun', 'Haridwar', 'Haldwani', 'Roorkee', 'Rishikesh', 'Kashipur',
    'Rudrapur', 'Kotdwar', 'Ramnagar', 'Pithoragarh', 'Almora', 'Mussoorie',
    'Nainital', 'Pauri', 'Tehri', 'Chamoli', 'Uttarkashi', 'Bageshwar',
    'Champawat', 'Bazpur', 'Manglaur', 'Jaspur', 'Tanakpur', 'Lansdowne',
    'Srinagar', 'Kichha', 'Sitarganj', 'Lalkuan', 'Khatima', 'Dineshpur'
  ],

  // West Bengal
  'West Bengal': [
    'Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman',
    'Malda', 'Baharampur', 'Habra', 'Kharagpur', 'Shantipur', 'Haldia',
    'Raiganj', 'Krishnanagar', 'Nabadwip', 'Medinipur', 'Jalpaiguri',
    'Balurghat', 'Basirhat', 'Bankura', 'Cooch Behar', 'Darjeeling',
    'Alipurduar', 'Purulia', 'Ranaghat', 'Barrackpore', 'Chinsurah',
    'Contai', 'Diamond Harbour', 'English Bazar', 'Kalyani', 'Rishra',
    'Serampore', 'Tamluk'
  ],

  // Union Territories
  'Delhi': [
    'New Delhi', 'Delhi', 'Dwarka', 'Rohini', 'Saket', 'Lajpat Nagar',
    'Karol Bagh', 'Chandni Chowk', 'Connaught Place', 'Nehru Place',
    'Pitampura', 'Janakpuri', 'Vikaspuri', 'Shahdara', 'Preet Vihar',
    'Mayur Vihar', 'Vasant Kunj', 'Greater Kailash'
  ],

  'Chandigarh': ['Chandigarh'],

  'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],

  'Jammu & Kashmir': [
    'Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Sopore', 'Kathua',
    'Udhampur', 'Rajouri', 'Poonch', 'Kupwara', 'Pulwama', 'Ganderbal',
    'Shopian', 'Kulgam', 'Bandipora', 'Budgam', 'Leh', 'Kargil'
  ],

  'Ladakh': ['Leh', 'Kargil', 'Diskit', 'Nubra'],

  'Andaman & Nicobar': ['Port Blair', 'Diglipur', 'Rangat', 'Mayabunder'],

  'Dadra & Nagar Haveli and Daman & Diu': ['Silvassa', 'Daman', 'Diu'],

  'Lakshadweep': ['Kavaratti', 'Agatti', 'Minicoy']
};

// Flatten into a single sorted array of unique city names
export const INDIA_CITIES: string[] = Array.from(
  new Set(
    Object.values(INDIA_CITIES_BY_STATE).flat()
  )
).sort((a, b) => a.localeCompare(b));

// Also export the state-grouped version for potential use
export const INDIA_CITIES_GROUPED = INDIA_CITIES_BY_STATE;

// Total count for reference
export const INDIA_CITIES_COUNT = INDIA_CITIES.length;
