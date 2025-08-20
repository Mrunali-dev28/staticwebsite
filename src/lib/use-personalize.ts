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
  const [data, setData] = useState<PersonalizeData>({
    city: null,
    region: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const detectLocation = async () => {
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
        // Use IP-based geolocation as fallback
        const response = await fetch('https://api.ipapi.com/api/check?access_key=YOUR_API_KEY');
        
        if (response.ok) {
          const ipData = await response.json();
          const city = ipData.city;
          const country = ipData.country_name;
          
          console.log('🔍 IP-based location data:', { city, country, ipData });

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

    detectLocation();
  }, []);

  return data;
} 