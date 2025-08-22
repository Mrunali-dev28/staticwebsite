'use client';

import { useState, useEffect } from 'react';
import { setUserCity, getCurrentUserUid } from './personalize-service';

interface PersonalizeData {
  city: string | null;
  region: 'us' | 'delhi' | 'maharashtra' | null;
  isLoading: boolean;
  error: string | null;
}

export function usePersonalize(): PersonalizeData {
  console.log('🔍 usePersonalize: Hook initialized');
  
  const [data, setData] = useState<PersonalizeData>({
    city: null,
    region: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const detectLocation = async () => {
      console.log('🔍 usePersonalize: detectLocation started');
      
      try {
        setData(prev => ({ ...prev, isLoading: true, error: null }));

        // Check for URL parameters first (for testing)
        const urlParams = new URLSearchParams(window.location.search);
        const forceUSParam = urlParams.get('forceUS');
        const forceDelhiParam = urlParams.get('forceDelhi');
        const forceMaharashtraParam = urlParams.get('forceMaharashtra');

        if (forceUSParam === 'true') {
          console.log('🔍 Force US region detected from URL parameter');
          await setUserCity('ashburn');
          setData({
            city: 'ashburn',
            region: 'us',
            isLoading: false,
            error: null
          });
          return;
        }

        if (forceDelhiParam === 'true') {
          console.log('🔍 Force Delhi region detected from URL parameter');
          await setUserCity('delhi');
          setData({
            city: 'delhi',
            region: 'delhi',
            isLoading: false,
            error: null
          });
          return;
        }

        if (forceMaharashtraParam === 'true') {
          console.log('🔍 Force Maharashtra region detected from URL parameter');
          await setUserCity('pune');
          setData({
            city: 'pune',
            region: 'maharashtra',
            isLoading: false,
            error: null
          });
          return;
        }

        // Try to get location from browser
        if ('geolocation' in navigator) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                enableHighAccuracy: false
              });
            });

            const { latitude, longitude } = position.coords;
            console.log('🔍 Browser geolocation:', { latitude, longitude });

            // Use a geolocation service to get city/region
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            
            if (response.ok) {
              const locationData = await response.json();
              const city = locationData.city || locationData.locality;
              const country = locationData.countryName;
              
              console.log('🔍 Location data:', { city, country, locationData });

              // Determine region based on country and city
              let region: 'us' | 'delhi' | 'maharashtra' | null = null;
              
              if (country === 'United States') {
                region = 'us';
              } else if (country === 'India') {
                if (city && (city.toLowerCase().includes('delhi') || city.toLowerCase().includes('new delhi'))) {
                  region = 'delhi';
                } else if (city && (city.toLowerCase().includes('pune') || city.toLowerCase().includes('mumbai') || city.toLowerCase().includes('maharashtra'))) {
                  region = 'maharashtra';
                }
              }

              await setUserCity(city);
              setData({
                city,
                region,
                isLoading: false,
                error: null
              });
            } else {
              throw new Error('Failed to get location data');
            }
          } catch (geolocationError) {
            console.log('🔍 Geolocation failed, trying IP-based detection:', geolocationError);
            await detectLocationByIP();
          }
        } else {
          console.log('🔍 Geolocation not available, trying IP-based detection');
          await detectLocationByIP();
        }
      } catch (error) {
        console.error('❌ Location detection error:', error);
        setData({
          city: null,
          region: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    const detectLocationByIP = async () => {
      try {
        // Use multiple IP geolocation services for better accuracy
        const services = [
          'https://ipapi.co/json/',
          'https://ipinfo.io/json',
          'http://ip-api.com/json'
        ];
        
        let ipData = null;
        
        for (const service of services) {
          try {
            console.log(`🔍 Trying IP geolocation service: ${service}`);
            const response = await fetch(service, {
              headers: {
                'Accept': 'application/json',
              },
            });
            
            if (response.ok) {
              ipData = await response.json();
              console.log(`✅ IP data received from ${service}:`, ipData);
              break;
            }
          } catch (serviceError) {
            console.log(`❌ Failed to fetch from ${service}:`, serviceError);
            continue;
          }
        }
        
        if (ipData) {
          const city = ipData.city || ipData.locality || null;
          const country = ipData.country || ipData.countryCode || ipData.country_name || null;
          const region = ipData.region || ipData.regionName || ipData.state || null;
          const isp = ipData.isp || ipData.org || null;
          const ip = ipData.ip || null;
          
          console.log('🔍 IP-based location data:', { city, country, region, isp, ip, ipData });

          // Enhanced region detection
          let detectedRegion: 'us' | 'delhi' | 'maharashtra' | null = null;
          
          // Check for US location
          if (country === 'US' || country === 'United States' || country === 'USA') {
            detectedRegion = 'us';
            console.log('🔍 US location detected from IP');
          } else if (country === 'IN' || country === 'India') {
            // Check for specific Indian cities
            if (city && (city.toLowerCase().includes('delhi') || city.toLowerCase().includes('new delhi'))) {
              detectedRegion = 'delhi';
              console.log('🔍 Delhi location detected from IP');
            } else if (city && (city.toLowerCase().includes('pune') || city.toLowerCase().includes('mumbai') || city.toLowerCase().includes('maharashtra'))) {
              detectedRegion = 'maharashtra';
              console.log('🔍 Maharashtra location detected from IP');
            } else {
              // Default to Maharashtra for other Indian cities
              detectedRegion = 'maharashtra';
              console.log('🔍 Defaulting to Maharashtra for Indian location');
            }
          }
          
          // Enhanced VPN detection
          const isVPN = detectVPN(isp, ip, city, country);
          
          if (isVPN) {
            console.log('🔍 VPN detected! Switching to US region for personalized content');
            detectedRegion = 'us';
            // Update city to a US city for better personalization
            const usCity = city && (city.toLowerCase().includes('new york') || city.toLowerCase().includes('los angeles') || city.toLowerCase().includes('chicago')) ? city : 'New York';
            await setUserCity(usCity);
            setData({
              city: usCity,
              region: 'us',
              isLoading: false,
              error: null
            });
            return;
          }

          await setUserCity(city);
          setData({
            city,
            region: detectedRegion,
            isLoading: false,
            error: null
          });
        } else {
          // Fallback to default location (Pune)
          console.log('🔍 IP detection failed, using default location (Pune)');
          await setUserCity('pune');
          setData({
            city: 'pune',
            region: 'maharashtra',
            isLoading: false,
            error: null
          });
        }
      } catch (ipError) {
        console.log('🔍 IP detection failed, using default location (Pune):', ipError);
        await setUserCity('pune');
        setData({
          city: 'pune',
          region: 'maharashtra',
          isLoading: false,
          error: null
        });
      }
    };

    // Enhanced VPN detection function
    const detectVPN = (isp: string | null, ip: string | null, city: string | null, country: string | null): boolean => {
      if (!isp) return false;
      
      const ispLower = isp.toLowerCase();
      
      // Common VPN/Proxy service keywords
      const vpnKeywords = [
        'vpn', 'proxy', 'tunnel', 'nord', 'express', 'surfshark',
        'cyberghost', 'private internet access', 'pia', 'windscribe',
        'tunnelbear', 'hotspot shield', 'proton', 'mullvad', 'ivpn',
        'perfect privacy', 'airvpn', 'hide.me', 'vpn.ac', 'vpnsecure',
        'vpn unlimited', 'vpn gate', 'openvpn', 'wireguard', 'openconnect',
        'strongvpn', 'ipvanish', 'purevpn', 'vpnbook', 'hidemyass',
        'zenmate', 'browsec', 'betternet', 'opera vpn', 'hoxx vpn'
      ];
      
      // Check if ISP contains VPN keywords
      const hasVPNKeyword = vpnKeywords.some(keyword => ispLower.includes(keyword));
      
      // Additional VPN indicators
      const suspiciousPatterns = [
        // Datacenter IP ranges (common for VPNs)
        ip && (ip.startsWith('104.') || ip.startsWith('107.') || ip.startsWith('108.')),
        // Generic ISP names that often indicate VPN
        ispLower.includes('datacenter') || ispLower.includes('hosting') || ispLower.includes('server'),
        // Unusual city/country combinations
        country === 'IN' && city && !['mumbai', 'delhi', 'pune', 'bangalore', 'chennai', 'hyderabad', 'kolkata'].some(indianCity => city.toLowerCase().includes(indianCity))
      ];
      
      const hasSuspiciousPattern = suspiciousPatterns.some(pattern => pattern === true);
      
      console.log('🔍 VPN Detection Results:', {
        isp,
        hasVPNKeyword,
        hasSuspiciousPattern,
        isVPN: hasVPNKeyword || hasSuspiciousPattern
      });
      
      return hasVPNKeyword || hasSuspiciousPattern;
    };

    detectLocation();
  }, []);

  return data;
} 