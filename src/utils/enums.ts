
export const approvalStatus = ["pending", "approved", "rejected"] as const
export const maritalStatus = ["Single", "Divorced", "Widowed"] as const
export const gender = ["Male", "Female"] as const

export const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Parsi", "Jewish"] as const

export const castes = [
  "24 Manai Telugu Chettiar", "96 Kuli Maratha", "Aaru Nattu Vellala", "Achirapakkam Chettiar", "Ad Dharmi", "Adi Andhra", "Adi Dravidar", "Adi Karnataka", "Agamudayar / Arcot / Thuluva Vellala", "Agaram Vellan Chettiar", "Agarwal", "Agnikula Kshatriya", "Agrahari", "Agri", "Aguri / Ugra Kshatriya", "Aheriya", "Ahir Shimpi", "Ahirwar", "Ahom", "Ambalavasi", "Amil Sindhi", "Amma Kodava", "Anavil Brahmin", "Anjana (Chowdary) Patel", "Arakh / Arakvanshiya", "Aramari / Gabit", "Arekatica", "Arora", "Arunthathiyar", "Arya Vysya", "Asathi", "Audichya Brahmin", "Ayira Vysya", "Ayodhyavasi", "Ayyaraka",
  "Badaga", "Bagdi", "Baibhand Sindhi", "Baidya", "Bairagi", "Bairwa", "Baishnab", "Baishya", "Bajantri", "Balai", "Balija", "Balija Naidu", "Balija Reddy", "Banayat Oriya", "Banik", "Baniya", "Baniya - Bania", "Baniya - Kumuti", "Banjara", "Baori", "Barai", "Barendra Brahmin", "Bargi", "Bari", "Baria", "Barnwal", "Barujibi", "Bavaria", "Bazigar", "Beldar", "Beri Chettiar", "Besta", "Bhand", "Bhandari", "Bhanusali Sindhi", "Bhar", "Bharbhunja", "Bhatia", "Bhatia Sindhi", "Bhatraju", "Bhatt Brahmin", "Bhavasar Kshatriya", "Bhil", "Bhoi", "Bhovi", "Bhoyar", "Bhulia / Meher", "Bhumihar Brahmin", "Billava", "Bind", "Bishnoi/Vishnoi", "Bondili", "Boyar", "Brahmakshtriya", "Brahmbatt",
  "Brahmin - Anavil", "Brahmin - Anaviln Desai", "Brahmin - Audichya", "Brahmin - Bagra", "Brahmin - Baidhiki/Vaidhiki", "Brahmin - Baragaon", "Brahmin - Bardai", "Brahmin - Barendra", "Brahmin - Bhargav", "Brahmin - Bhatt", "Brahmin - Bhojak", "Brahmin - Bhumihar", "Brahmin - Chaubisa", "Brahmin - Dadhich", "Brahmin - Daivadnya", "Brahmin - Dakaut", "Brahmin - Danua", "Brahmin - Deshastha", "Brahmin - Dhiman", "Brahmin - Dravida", "Brahmin - Embrandiri", "Brahmin - Garhwali", "Brahmin - Gaur", "Brahmin - Goswami/Gosavi", "Brahmin - Gujar Gaur", "Brahmin - Gurukkal", "Brahmin - Halua", "Brahmin - Havyaka", "Brahmin - Hoysala", "Brahmin - Iyengar", "Brahmin - Iyer", "Brahmin - Jangid",
  "Brahmin - Jhadua", "Brahmin - Jyotish", "Brahmin - Kanyakubj", "Brahmin - Karhade", "Brahmin - Khadayata", "Brahmin - Khandelwal", "Brahmin - Khedaval", "Brahmin - Kokanastha", "Brahmin - Kota", "Brahmin - Koteshwara / Kota (Madhwa )", "Brahmin - Kulin", "Brahmin - Kumaoni", "Brahmin - Madhwa", "Brahmin - Maithil", "Brahmin - Mevada", "Brahmin - Modh", "Brahmin - Mohyal", "Brahmin - Nagar", "Brahmin - Namboodiri", "Brahmin - Narmadiya", "Brahmin - Niyogi", "Brahmin - Paliwal", "Brahmin - Panda", "Brahmin - Pandit", "Brahmin - Panicker", "Brahmin - Pareek", "Brahmin - Pushkarna", "Brahmin - Rajgor", "Brahmin - Rarhi", "Brahmin - Rarhi/Radhi", "Brahmin - Rigvedi", "Brahmin - Rudraj",
  "Brahmin - Sakaldwipi", "Brahmin - Sanadya", "Brahmin - Sanketi", "Brahmin - Saraswat", "Brahmin - Sarua", "Brahmin - Saryuparin", "Brahmin - Shivalli (Madhva)", "Brahmin - Shivhalli", "Brahmin - Shri Gaud", "Brahmin - Shri Mali", "Brahmin - Shrimali", "Brahmin - Shukla Yajurvedi", "Brahmin - Sikhwal", "Brahmin - Smartha", "Brahmin - Sri Vaishnava", "Brahmin - Stanika", "Brahmin - Tapodhan", "Brahmin - Tyagi", "Brahmin - Vaidiki", "Brahmin - Vaikhanasa", "Brahmin - Valam", "Brahmin - Velanadu", "Brahmin - Vyas", "Brahmin - Zalora", "Brahmin - Jijhotia", "Brahmin - Malviya", "Brajastha Maithil", "Bunt (Shetty)",
  "CKP", "Chakkala Nair", "Chalawadi and Holeya", "Chambhar", "Chandravanshi Kahar", "Charan", "Chasa", "Chattada Sri Vaishnava", "Chaturth", "Chaudary", "Chaurasia", "Chennadasar", "Cherakula Vellala", "Chero", "Chettiar", "Chhapru Sindhi", "Chhetri", "Chippolu (Mera)", "Choudhary", "Coorgi",
  "Dadu Sindhi", "Daivadnya Brahmin", "Danua Brahmin", "Darji", "Dasapalanjika / Kannada Saineegar", "Deshastha Brahmin", "Deshmukh", "Desikar", "Desikar Thanjavur", "Devadiga", "Devandra Kula Vellala", "Devang Koshthi", "Devanga", "Devanga Chettiar", "Devar/Thevar/Mukkulathor", "Devrukhe Brahmin", "Dhakad", "Dhanak", "Dhangar", "Dhanka", "Dhanuk", "Dheevara", "Dhiman", "Dhiman Brahmin", "Dhoba", "Dhor / Kakkayya", "Dommala", "Dosar / Dusra", "Dravida Brahmin", "Dumal", "Dusadh (Paswan)",
  "Ediga", "Ediga /Goud (Balija)", "Elur Chetty", "Embrandiri Brahmin", "Ezhava", "Ezhava Panicker", "Ezhava Thandan", "Ezhuthachan",
  "Gabit", "Gahoi", "Gajula / Kavarai", "Ganda", "Gandha Vanika", "Gandharb", "Gandla", "Gandla / Ganiga", "Ganiga", "Garhwali", "Garhwali Brahmin", "Garo / Garoda", "Gatti", "Gaur Brahmin", "Gavandi", "Gavara", "Gavaria", "Gawali", "Ghisadi", "Ghumar", "Goala", "Goan", "Gomantak", "Gond", "Gondhali", "Gopal / Gopala", "Goswami/Gosavi Brahmin", "Goud",
  "Gounder", "Gounder - Kongu Vellala Gounder", "Gounder - Nattu Gounder", "Gounder - Urali Gounder", "Gounder - Vanniya Kula Kshatriyar", "Gounder - Vettuva Gounder",
  "Gowda", "Gowda - Kuruba Gowda", "Gramani", "Gudia", "Gujar Gaur Brahmin", "Gujjar", "Gulahre", "Gupta", "Guptan", "Gurav", "Gurjar", "Gurukkal Brahmin",
  "Haihaivanshi", "Halba Koshti", "Halua Brahmin", "Havyaka Brahmin", "Heggade", "Helava", "Holar", "Hoysala Brahmin", "Hugar (Jeer)", "Hyderabadi Sindhi",
  "Illaththu Pillai", "Intercaste", "Irani", "Isai Vellala", "Iyengar Brahmin", "Iyer Brahmin",
  "Jaalari", "Jaiswal", "Jandra", "Jangam", "Jangid Brahmin", "Jangra - Brahmin", "Jat", "Jatav", "Jeer", "Jetty/Malla", "Jhadav", "Jhadua Brahmin", "Jijhotia Brahmin", "Jingar", "Jogi (Nath)", "Julaha",
  "Kachara", "Kadava Patel", "Kadia", "Kahar", "Kaibarta", "Kaikaala", "Kalal", "Kalanji", "Kalar", "Kalbelia", "Kalinga", "Kalinga Vysya", "Kalita", "Kalwar", "Kamboj", "Kamma", "Kamma Naidu", "Kanakkan Padanna", "Kandara", "Kandera", "Kanjar", "Kansari", "Kansyakaar", "Kanyakubj Brahmin", "Kanykubj Bania", "Kapu", "Kapu Naidu", "Kapu Reddy", "Karakala Bhakthula", "Karana", "Karhade Brahmin", "Karkathar", "Karmakar", "Karni Bhakthula", "Karuneegar", "Kasar", "Kasaundhan", "Kasera", "Kashyap", "Kasukara", "Katiya", "Kavara", "Kavuthiyya/Ezhavathy", "Kayastha", "Kayastha (Bengali)", "Kerala Mudali", "Keshri (Kesarwani)", "Khandayat", "Khandelwal", "Kharwa", "Kharwar", "Khatik", "Khatri", "Kirar",
  "Kodava", "Kodikal Pillai", "Koiri", "Kokanastha Brahmin", "Kokanastha Maratha", "Kokna", "Koli", "Koli Mahadev", "Koli Patel", "Komti /Arya Vaishya", "Kongu Chettiar", "Kongu Nadar", "Kongu Vellala Gounder", "Konkani", "Korama", "Kori", "Kori/Koli", "Kosthi", "Kota Brahmin", "Krishnavaka", "Kshatriya", "Kshatriya Kurmi", "Kshatriya Raju", "Kudumbi", "Kulal", "Kulalar", "Kulin Brahmin", "Kulita", "Kumaoni Brahmin", "Kumaoni Rajput", "Kumawat", "Kumbhakar", "Kumbhar", "Kumhar", "Kummari", "Kunbi", "Kunbi Lonari", "Kunbi Maratha", "Kunbi Tirale", "Kuravan", "Kurmi", "Kurmi/Kurmi Kshatriya", "Kurni", "Kuruba", "Kuruhina Shetty", "Kuruhini Chetty", "Kurumbar", "Kuruva", "Kushwaha (Koiri)", "Kutchi",
  "Lad", "Lakhara / Lakhera / Laxkar", "Lambadi", "Larai Sindhi", "Larkana Sindhi", "Laxminarayan gola", "Leva patel", "Leva patil", "Linga Balija", "Lingayath", "Lodhi Rajput", "Lohana", "Lohana Sindhi", "Lohar", "Loniya", "Lubana",
  "Madhesiya/Kanu/Halwai", "Madhwa Brahmin", "Madiga", "Madivala / Dhobi", "Mahajan", "Mahar", "Mahendra", "Maheshwari", "Maheshwari / Meshri", "Mahishya", "Mahor", "Mahuri", "Mair Rajput Swarnkar", "Maithil Brahmin", "Majabi", "Mala", "Mali", "Mallah", "Malviya Brahmin", "Malwani", "Mangalorean", "Manipuri", "Manjapudur Chettiar", "Mannadiyar", "Mannan / Velan / Vannan", "Mapila", "Maratha", "Maratha Kshatriya", "Maruthuvar", "Matang", "Mathur", "Mathur Vaishya", "Matia Patel", "Maurya / Shakya", "Meena", "Meenavar", "Meghwal", "Mehar", "Mehra", "Mera", "Meru Darji", "Mochi", "Modak", "Modh Brahmin", "Modh Ghanchi", "Modi", "Modikarlu", "Mogaveera", "Mohyal Brahmin", "Mudaliyar", "Mudiraj", "Mukkulathor", "Munnuru Kapu", "Musahar", "Musukama", "Muthuraja / Mutharaiyar",
  "Naagavamsam", "Nabit", "Nadar", "Nagar Brahmin", "Nagaralu", "Nai / Nayi Brahmin", "Naicker", "Naicker - Vanniya Kula Kshatriyar", "Naidu", "Naik", "Naika", "Nair", "Namasudra / Namassej", "Nambiar", "Namboodiri Brahmin", "Namdarlu", "Nanjil Mudali", "Nanjil Nattu Vellala", "Nanjil Vellala", "Nanjil pillai", "Nankudi Vellala", "Napit", "Narmadiya Brahmin", "Nat", "Nath", "Nattu Gounder", "Nattukottai Chettiar", "Nayaka", "Neeli", "Neeli Saali", "Nema", "Nepali", "Nessi", "Nhavi", "Niari", "Niyogi Brahmin",
  "Odan", "Ontari", "Oraon", "Oswal", "Otari", "Othuvaar",
  "Padmasali", "Padmashali", "Padmavati Porwal", "Pagadala", "Pal", "Pallan / Devandra Kula Vellalan", "Panan", "Panchal", "Panda Brahmin", "Pandaram", "Pandit Brahmin", "Pandiya Vellala", "Panicker", "Pannirandam Chettiar", "Paravan / Bharatar", "Parit", "Parkavakulam / Udayar", "Parsi", "Partraj", "Parvatha Rajakulam", "Pasi", "Paswan", "Paswan / Dusadh", "Patel", "Pathare Prabhu", "Patil", "Patnaick/Sistakaranam", "Patra", "Pattinavar", "Pattusali", "Patwa", "Perika", "Perika/Puragiri Kshatriya", "Pillai", "Poddar", "Poosala", "Porwal", "Porwal / Porwar", "Poundra", "Prajapati", "Pulaya / Cheruman", "Pushkarna Brahmin",
  "Rabari", "Radhi / Niari", "Raigar", "Rajaka / Vannar", "Rajastani", "Rajbhar", "Rajbonshi", "Rajpurohit", "Rajput", "Raju / Kshatriya Raju", "Ramanandi", "Ramdasia", "Ramgariah", "Ramoshi", "Rarhi Brahmin", "Rastogi", "Rathi", "Rauniar", "Ravana Rajput", "Ravidasia", "Rawat", "Reddy", "Relli", "Rigvedi Brahmin", "Rohiri Sindhi", "Rohit / Chamar", "Ror", "Rudraj Brahmin",
  "SC", "SKP", "ST", "Sadgope", "Sadhu Chetty", "Sagara (Uppara)", "Saha", "Sahariya", "Sahiti Sindhi", "Sahu", "Saini", "Saiva Pillai Thanjavur", "Saiva Pillai Tirunelveli", "Saiva Vellan chettiar", "Sakaldwipi Brahmin", "Sakkhar Sindhi", "Saliya", "Saliyar", "Salvi", "Samagar", "Sambava", "Sanadya Brahmin", "Sanketi Brahmin", "Sansi", "Saraswat Brahmin", "Sargara", "Saryuparin Brahmin", "Sathwara", "Satnami", "Savji", "Sehwani Sindhi", "Senai Thalaivar", "Senguntha Mudaliyar", "Sengunthar/Kaikolar", "Settibalija", "Setty Balija", "Shah", "Shaw / Sahu/Teli", "Shettigar", "Shetty", "Shikarpuri Sindhi", "Shilpkar", "Shimpi/Namdev", "Shivhalli Brahmin", "Shrimali Brahmin", "Sikhwal Brahmin",
  "Sindhi", "Sindhi-Amil", "Sindhi-Baibhand", "Sindhi-Bhanusali", "Sindhi-Bhatia", "Sindhi-Chhapru", "Sindhi-Dadu", "Sindhi-Hyderabadi", "Sindhi-Larai", "Sindhi-Larkana", "Sindhi-Lohana", "Sindhi-Rohiri", "Sindhi-Sahiti", "Sindhi-Sakkhar", "Sindhi-Sehwani", "Sindhi-Shikarpuri", "Sindhi-Thatai",
  "Sirvi / Janwa", "Smartha Brahmin", "Sonar", "Sondhia", "Soni", "Sonkar", "Sourashtra", "Sozhia Chetty", "Sozhiya Vellala", "Sri Vaishnava Brahmin", "Srisayana", "Stanika Brahmin", "Sugali (Naika)", "Sunari", "Sundhi", "Surya Balija", "Suthar", "Swakula Saali", "Swakula Sali", "Swarnakar",
  "Tamboli", "Tammali", "Tanti", "Tantubai", "Telaga", "Teli", "Telugupatti", "Thakkar", "Thakore", "Thakur", "Thandan", "Tharakan", "Thatai Sindhi", "Thigala", "Thiyya", "Thiyya Thandan", "Thogata Veera Kshatriya", "Thogata Veerakshathriya", "Thondai Mandala Vellala", "Thota", "Tili", "Tiyar/Tiar", "Togata", "Tonk Kshatriya", "Turupu Kapu", "Tyagi Brahmin",
  "Ummar / Umre / Bagaria", "Urali Gounder", "Urs",
  "Vada Balija", "Vadambar", "Vadar", "Vaddera", "Vadugan", "Vaidiki Brahmin", "Vaikhanasa Brahmin", "Vaish", "Vaishnav", "Vaishnav Dishaval", "Vaishnav Kapol", "Vaishnav Khadyata", "Vaishnav Lad", "Vaishnav Modh", "Vaishnav Porvad", "Vaishnav Shrimali", "Vaishnav Sorathaiya", "Vaishnav Vania", "Vaishnava", "Vaishya", "Vaishya Vani", "Valar", "Valluvan", "Valmiki", "Valsad", "Vani", "Vani / Vaishya", "Vania", "Vanika Vyshya", "Vaniya",
  "Vaniya Chettiar", "Vanjara", "Vanjari", "Vankar", "Vannar", "Vannia Kula Kshatriyar", "Vanyakulakshatriya", "Variar", "Varshney", "Varshney (Barahseni)", "Veera Saivam", "Veerakodi Vellala", "Velaan", "Velama", "Velanadu Brahmin", "Vellala Pillai", "Vellala", "Vellan Chettiars", "Veluthedathu Nair", "Vettuva Gounder", "Vettuvan", "Vijayvargia", "Vilakithala Nair", "Vilakkithala Nair", "Vishwakarma", "Viswabrahmin", "Vokkaliga", "Vyas Brahmin", "Vysya",
  "Yadav", "Yadava Naidu", "Yellapu",
] as const

export const languages = ["Tamil", "Telugu", "Malayalam", "Kannada", "Hindi", "English", "Bengali", "Marathi", "Gujarati", "Punjabi", "Odia", "Urdu"] as const
export const educationLevels = ["No Education", "Below SSLC", "SSLC", "HSS", "Diploma", "Bachelor's", "Master's", "Doctorate"] as const
export const proffessionalSectors = ["Government", "Private", "IT / Software", "Self-Employed / Freelance", "Entrepreneur / Business Owner", "Unemployed", "Student", "Retired", "Homemaker", "Informal Sector", "NGO / Non-Profit", "Agricultural", "Creative / Media / Entertainment", "Healthcare", "Education", "Other"] as const

export const professions = [
  "Unemployed",
  "Accountant", "AC Technician", "Actuary", "Actor", "Affiliate Marketer", "Agricultural Scientist", "Air Hostess", "Animator", "App Reskinner", "Architect", "Army Officer", "Art Director", "Artist", "Astronomer", "Author",
  "Baker", "Banker", "Barber", "Bartender", "Beautician", "Blogger", "Blockchain Developer", "Brand Manager", "Business Analyst", "Business Development Manager",
  "CA (Chartered Accountant)", "Call Center Agent", "Carpenter", "Chef", "Cleaner", "Cloud Engineer", "Civil Servant", "Clerk", "Coach (Life/Fitness)", "Content Creator", "Content Marketer", "Construction Worker", "Copywriter", "Court Clerk", "Criminal Investigator", "Curriculum Developer", "Customer Support Executive", "Cybersecurity Analyst",
  "Data Analyst", "Data Scientist", "Delivery Executive", "Dentist", "Designer", "Developer", "Digital Marketer", "DJ", "Doctor", "Driver", "Dropshipper",
  "Economist", "Editor", "Electrician", "Embedded Systems Engineer", "Embassy Staff", "Entrepreneur", "Environmental Scientist", "Event Planner",
  "Factory Worker", "Farmer", "Fashion Designer", "Filmmaker", "Financial Analyst", "Firefighter", "Fisheries Worker", "Flight Attendant", "Florist", "Forensic Analyst", "Forest Officer", "Frontend Developer", "Full Stack Developer", "Fund Manager",
  "Game Developer", "Graphic Designer",
  "Hairdresser", "Hardware Engineer", "Home Health Aide", "Homemaker", "Horticulturist", "Hotel Manager", "Housekeeper", "HR Executive",
  "Illustrator", "Influencer", "Insurance Agent", "Instructional Designer", "Interior Designer", "Investment Banker", "Irrigation Engineer", "IT Support Specialist",
  "Journalist", "Judge",
  "Lab Technician", "Lawyer", "Librarian", "Life Coach", "Loan Officer",
  "Machine Operator", "Makeup Artist", "Manager", "Market Research Analyst", "Marketing Manager", "Mason", "Mechanical Engineer", "Mechanic", "Medical Assistant", "Medical Coder", "Model", "Mobile App Developer", "Motion Graphics Artist", "Musician",
  "Network Engineer", "NGO Worker", "Nurse", "Nutritionist",
  "Occupational Therapist", "Online Tutor", "Optometrist",
  "Paramedic", "Paralegal", "Pest Control Technician", "Pharmacist", "Photographer", "Physiotherapist", "Pilot", "Plumber", "Police Officer", "Politician", "Postal Worker", "Principal", "Product Manager", "Professor", "Property Manager", "Psychiatrist", "Psychologist", "Public Health Worker", "Public Prosecutor",
  "QA Tester",
  "Radiologist", "Real Estate Agent", "Recruiter", "Religious Worker", "Researcher", "Restaurant Manager", "Retired", "Risk Manager", "Robotics Engineer",
  "Scientist", "School Principal", "Scriptwriter", "Security Guard", "Self-Employed", "SEO Specialist", "Server Admin", "Site Reliability Engineer", "Social Media Manager", "Social Worker", "Software Developer", "Software Engineer", "Sound Engineer", "Speech Therapist", "Stock Broker", "Student", "Surgeon", "Systems Administrator",
  "Tailor", "Tattoo Artist", "Teacher", "Technical Writer", "Technician", "Telemarketer", "Tour Guide", "Traffic Controller", "Train Operator", "Translator", "Travel Agent", "Tutor",
  "UI/UX Designer", "Underwriter", "UX Researcher",
  "VA (Virtual Assistant)", "Veterinarian", "Video Editor", "Videographer", "Vlogger",
  "Waiter", "Warehouse Manager", "Web Developer", "Welder", "Writer",
  "YouTuber"
] as const

export const nakshatra = [
  'Ashwini (அசுவினி)', 'Bharani (பரணி)', 'Krittika (கிருத்திகை)', 'Rohini (ரோஹிணி)', 'Mrigashira (மிருகசீரிடம்)',
  'Ardra (திருவாதிரை)', 'Punarvasu (புனர்பூசம்)', 'Pushya (பூசம்)', 'Ashlesha (ஆயில்யம்)', 'Magha (மகம்)',
  'Purva Phalguni (பூரம்)', 'Uttara Phalguni (உத்திரம்)', 'Hasta (ஹஸ்தம்)', 'Chitra (சித்திரை)', 'Swati (சுவாதி)',
  'Vishakha (விசாகம்)', 'Anuradha (அனுஷம்)', 'Jyeshtha (கேட்டை)', 'Mula (மூலம்)', 'Purva Ashadha (பூராடம்)',
  'Uttara Ashadha (உத்திராடம்)', 'Shravana (திரோண)', 'Dhanishta (அவிட்டம்)', 'Shatabhisha (சதயம்)',
  'Purva Bhadrapada (பூரட்டாதி)', 'Uttara Bhadrapada (உத்திரட்டாதி)', 'Revati (ரேவதி)'
] as const;

export const planets = [
  'Sun (சூரியன்)', 'Moon (சந்திரன்)', 'Mars (செவ்வாய்)', 'Mercury (புதன்)', 'Jupiter (குரு)',
  'Venus (சுக்ரன்)', 'Saturn (சனி)', 'Rahu (ராகு)', 'Ketu (கேது)'
] as const;

export const raasi = [
  'Aries (மேஷம்)', 'Taurus (ரிஷபம்)', 'Gemini (மிதுனம்)', 'Cancer (கடகம்)', 'Leo (சிம்மம்)',
  'Virgo (கன்னி)', 'Libra (துலாம்)', 'Scorpio (விருச்சிகம்)', 'Sagittarius (தனுசு)', 'Capricorn (மகரம்)',
  'Aquarius (கும்பம்)', 'Pisces (மீனம்)'
] as const;

export const nakshatraMap = {
  Ashwini: 'அசுவினி',
  Bharani: 'பரணி',
  Krittika: 'கிருத்திகை',
  Rohini: 'ரோஹிணி',
  Mrigashira: 'மிருகசீரிடம்',
  Ardra: 'திருவாதிரை',
  Punarvasu: 'புனர்பூசம்',
  Pushya: 'பூசம்',
  Ashlesha: 'ஆயில்யம்',
  Magha: 'மகம்',
  'Purva Phalguni': 'பூரம்',
  'Uttara Phalguni': 'உத்திரம்',
  Hasta: 'ஹஸ்தம்',
  Chitra: 'சித்திரை',
  Swati: 'சுவாதி',
  Vishakha: 'விசாகம்',
  Anuradha: 'அனுஷம்',
  Jyeshtha: 'கேட்டை',
  Mula: 'மூலம்',
  'Purva Ashadha': 'பூராடம்',
  'Uttara Ashadha': 'உத்திராடம்',
  Shravana: 'திரோண',
  Dhanishta: 'அவிட்டம்',
  Shatabhisha: 'சதயம்',
  'Purva Bhadrapada': 'பூரட்டாதி',
  'Uttara Bhadrapada': 'உத்திரட்டாதி',
  Revati: 'ரேவதி'
} as const;

export const planetsMap = {
  Sun: 'சூரியன்',
  Moon: 'சந்திரன்',
  Mars: 'செவ்வாய்',
  Mercury: 'புதன்',
  Jupiter: 'குரு',
  Venus: 'சுக்ரன்',
  Saturn: 'சனி',
  Rahu: 'ராகு',
  Ketu: 'கேது'
} as const;

export const raasiMap = {
  Aries: 'மேஷம்',
  Taurus: 'ரிஷபம்',
  Gemini: 'மிதுனம்',
  Cancer: 'கடகம்',
  Leo: 'சிம்மம்',
  Virgo: 'கன்னி',
  Libra: 'துலாம்',
  Scorpio: 'விருச்சிகம்',
  Sagittarius: 'தனுசு',
  Capricorn: 'மகரம்',
  Aquarius: 'கும்பம்',
  Pisces: 'மீனம்'
} as const;

export const ageRange = [
  { label: 'Below 25', value: 'below_25' },
  { label: '25 to 30', value: '25_30' },
  { label: '30 to 40', value: '30_40' },
  { label: 'Above 40', value: 'above_50' },
] as const

export const salaryRange = [
  { label: 'Below ₹20,000', value: 'below_20000' },
  { label: '₹20,000 - ₹30,000', value: '20000_30000' },
  { label: '₹30,000 - ₹40,000', value: '30000_40000' },
  { label: '₹40,000 - ₹50,000', value: '40000_50000' },
  { label: 'Above ₹50,000', value: 'above_50000' },
] as const

export const aliveOptions = [
  { label: "Alive", value: true },
  { label: "Deceased", value: false }
] as const

export const acceptedImagesTypes = {
  'image/*': ['.png', ".jpg", ".jpeg", ".webp"],
} as const

export const tokenEnums = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
} as const

export const tokenValidity = {
  accessToken: 60 * 30, // 30 min
  refreshToken: 60 * 60 * 24 * 7, // 7 days
} as const
