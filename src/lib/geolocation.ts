// Geolocation service for detecting user location from IP
interface GeolocationData {
  city: string;
  region: string;
  country: string;
  ip: string;
  isp?: string;
  timezone?: string;
}

// Free IP geolocation service
export async function getLocationFromIP(): Promise<GeolocationData | null> {
  try {
    console.log('🔍 Detecting user location from IP...');
    
    // Try multiple free services for redundancy
    const services = [
      'https://ipapi.co/json/',
      'https://ipinfo.io/json',
      'http://ip-api.com/json'
    ];
    
    for (const service of services) {
      try {
        const response = await fetch(service, {
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Location data received:', data);
          
          // Normalize data from different services
          const locationData: GeolocationData = {
            city: data.city || data.locality || 'Unknown',
            region: data.region || data.regionName || data.state || 'Unknown',
            country: data.country || data.countryCode || 'Unknown',
            ip: data.ip || 'Unknown',
            isp: data.isp || data.org || 'Unknown',
            timezone: data.timezone || data.time_zone || 'Unknown'
          };
          
          console.log('📍 Detected location:', locationData);
          return locationData;
        }
      } catch (error) {
        console.log(`⚠️ Failed to fetch from ${service}:`, error);
        continue;
      }
    }
    
    console.log('❌ All geolocation services failed');
    return null;
  } catch (error) {
    console.error('❌ Error detecting location:', error);
    return null;
  }
}

// Get region based on city/state (for personalization)
export function getRegionFromLocation(location: GeolocationData): string {
  const city = location.city.toLowerCase();
  const region = location.region.toLowerCase();
  const country = location.country.toLowerCase();
  
  // Maharashtra region detection
  if (city.includes('mumbai') || city.includes('pune') || 
      city.includes('nagpur') || city.includes('aurangabad') ||
      region.includes('maharashtra') || region.includes('mh')) {
    return 'maharashtra';
  }
  
  // Delhi region detection
  if (city.includes('delhi') || city.includes('new delhi') ||
      region.includes('delhi') || region.includes('dl')) {
    return 'delhi';
  }
  
  // Default to maharashtra for Indian users
  if (country === 'in' || country === 'india') {
    return 'maharashtra';
  }
  
  // Default for other countries
  return 'delhi';
}

// Enhanced location detection with VPN awareness
export async function getEnhancedLocation(): Promise<{
  city: string;
  region: string;
  country: string;
  isVPN: boolean;
  originalLocation?: GeolocationData;
}> {
  const location = await getLocationFromIP();
  
  if (!location) {
    return {
      city: 'Pune',
      region: 'maharashtra',
      country: 'India',
      isVPN: false
    };
  }
  
  // Detect potential VPN usage
  const isVPN = detectVPNUsage(location);
  const region = getRegionFromLocation(location);
  
  return {
    city: location.city,
    region,
    country: location.country,
    isVPN,
    originalLocation: location
  };
}

// Simple VPN detection (not 100% accurate)
function detectVPNUsage(location: GeolocationData): boolean {
  const isp = location.isp?.toLowerCase() || '';
  
  // Common VPN/Proxy indicators
  const vpnKeywords = [
    'vpn', 'proxy', 'tunnel', 'nord', 'express', 'surfshark',
    'cyberghost', 'private internet access', 'pia', 'windscribe'
  ];
  
  return vpnKeywords.some(keyword => isp.includes(keyword));
} 