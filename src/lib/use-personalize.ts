'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  setUserCity as personalizeSetUserCity,
  getCurrentUserUid,
  trackImpression as personalizeTrackImpression,
  trackConversion as personalizeTrackConversion,
  setUserAttributes
} from './personalize-service';

interface PersonalizeState {
  userUid: string | null;
  city: string | null;
  region: string | null;
  manifest: any | null;
  isLoading: boolean;
  error: string | null;
}

export const usePersonalize = () => {
  const [state, setState] = useState<PersonalizeState>({
    userUid: null,
    city: null,
    region: null,
    manifest: null,
    isLoading: false,
    error: null,
  });

  // Set user's city and get personalized content
  const setUserCity = useCallback(async (city: string) => {
    console.log('🔍 setUserCity: Starting with city:', city);
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      console.log('🔍 setUserCity: Calling personalizeSetUserCity...');
      const manifest = await personalizeSetUserCity(city);
      console.log('🔍 setUserCity: Manifest received:', manifest);
      const userUid = getCurrentUserUid();
      console.log('🔍 setUserCity: User UID:', userUid);
      
      // Dynamically determine region based on city
      const region = getRegionFromCity(city);
      
      // Set user attributes for personalization
      await setUserAttributes({
        city: city,
        region: region,
        location: `${city}, ${region}`,
        timestamp: new Date().toISOString()
      });
      
      setState(prev => ({
        ...prev,
        userUid,
        city,
        region,
        manifest,
        isLoading: false,
      }));
      console.log('🔍 setUserCity: State updated successfully');
    } catch (error) {
      console.error('❌ setUserCity: Error setting user city:', error);
      // Set fallback state even if Personalize API fails
      const region = getRegionFromCity(city);
      setState(prev => ({
        ...prev,
        city,
        region,
        isLoading: false,
        error: null, // Don't show error to user, just use fallback
      }));
    }
  }, []);

  // Dynamic region detection based on city
  const getRegionFromCity = (city: string): string => {
    const cityLower = city.toLowerCase();
    console.log('🔍 getRegionFromCity: Analyzing city:', city, 'lowercase:', cityLower);
    
    // Maharashtra cities
    if (cityLower.includes('pune') || cityLower.includes('mumbai') || 
        cityLower.includes('nagpur') || cityLower.includes('aurangabad') ||
        cityLower.includes('nashik') || cityLower.includes('kolhapur') ||
        cityLower.includes('vagholi') || cityLower.includes('maharashtra')) {
      console.log('✅ getRegionFromCity: Detected Maharashtra region');
      return 'maharashtra';
    }
    
    // Delhi cities
    if (cityLower.includes('delhi') || cityLower.includes('new delhi') ||
        cityLower.includes('gurgaon') || cityLower.includes('noida')) {
      console.log('✅ getRegionFromCity: Detected Delhi region');
      return 'delhi';
    }
    
    // US cities - expanded list including Ashburn
    if (cityLower.includes('new york') || cityLower.includes('los angeles') ||
        cityLower.includes('chicago') || cityLower.includes('houston') ||
        cityLower.includes('phoenix') || cityLower.includes('philadelphia') ||
        cityLower.includes('ashburn') || cityLower.includes('virginia') ||
        cityLower.includes('washington') || cityLower.includes('boston') ||
        cityLower.includes('atlanta') || cityLower.includes('miami') ||
        cityLower.includes('seattle') || cityLower.includes('denver') ||
        cityLower.includes('dallas') || cityLower.includes('san francisco') ||
        cityLower.includes('austin') || cityLower.includes('nashville') ||
        cityLower.includes('portland') || cityLower.includes('las vegas') ||
        cityLower.includes('detroit') || cityLower.includes('cleveland') ||
        cityLower.includes('pittsburgh') || cityLower.includes('baltimore') ||
        cityLower.includes('milwaukee') || cityLower.includes('minneapolis') ||
        cityLower.includes('omaha') || cityLower.includes('oakland') ||
        cityLower.includes('tulsa') || cityLower.includes('wichita') ||
        cityLower.includes('arlington') || cityLower.includes('new orleans') ||
        cityLower.includes('bakersfield') || cityLower.includes('tampa') ||
        cityLower.includes('honolulu') || cityLower.includes('anaheim') ||
        cityLower.includes('aurora') || cityLower.includes('santa ana') ||
        cityLower.includes('corpus christi') || cityLower.includes('riverside') ||
        cityLower.includes('lexington') || cityLower.includes('stockton') ||
        cityLower.includes('henderson') || cityLower.includes('saint paul') ||
        cityLower.includes('st. paul') || cityLower.includes('saint louis') ||
        cityLower.includes('st. louis') || cityLower.includes('cincinnati') ||
        cityLower.includes('anchorage') || cityLower.includes('greensboro') ||
        cityLower.includes('plano') || cityLower.includes('newark') ||
        cityLower.includes('durham') || cityLower.includes('lincoln') ||
        cityLower.includes('orlando') || cityLower.includes('chula vista') ||
        cityLower.includes('jersey city') || cityLower.includes('chandler') ||
        cityLower.includes('madison') || cityLower.includes('laredo') ||
        cityLower.includes('winston-salem') || cityLower.includes('lubbock') ||
        cityLower.includes('baton rouge') || cityLower.includes('garland') ||
        cityLower.includes('glendale') || cityLower.includes('reno') ||
        cityLower.includes('hialeah') || cityLower.includes('chesapeake') ||
        cityLower.includes('scottsdale') || cityLower.includes('north las vegas') ||
        cityLower.includes('irving') || cityLower.includes('fremont') ||
        cityLower.includes('irvine') || cityLower.includes('birmingham') ||
        cityLower.includes('rochester') || cityLower.includes('san bernardino') ||
        cityLower.includes('spokane') || cityLower.includes('gilbert') ||
        cityLower.includes('montgomery') || cityLower.includes('boise') ||
        cityLower.includes('richmond') || cityLower.includes('des moines') ||
        cityLower.includes('modesto') || cityLower.includes('fayetteville') ||
        cityLower.includes('akron') || cityLower.includes('tacoma') ||
        cityLower.includes('huntington beach') || cityLower.includes('moreno valley') ||
        cityLower.includes('huntington park') || cityLower.includes('yonkers') ||
        cityLower.includes('columbus') || cityLower.includes('spokane') ||
        cityLower.includes('yuma') || cityLower.includes('evansville') ||
        cityLower.includes('billings') || cityLower.includes('south bend') ||
        cityLower.includes('kalamazoo') || cityLower.includes('fargo') ||
        cityLower.includes('waterloo') || cityLower.includes('davenport') ||
        cityLower.includes('springfield') || cityLower.includes('rockford') ||
        cityLower.includes('new haven') || cityLower.includes('topeka') ||
        cityLower.includes('concord') || cityLower.includes('allen') ||
        cityLower.includes('vista') || cityLower.includes('grand rapids') ||
        cityLower.includes('new bedford') || cityLower.includes('west valley city') ||
        cityLower.includes('provo') || cityLower.includes('el monte') ||
        cityLower.includes('independence') || cityLower.includes('lakewood') ||
        cityLower.includes('salem') || cityLower.includes('kalispell') ||
        cityLower.includes('bend') || cityLower.includes('spokane valley') ||
        cityLower.includes('idaho falls') || cityLower.includes('pocatello') ||
        cityLower.includes('twin falls') || cityLower.includes('nampa') ||
        cityLower.includes('meridian') || cityLower.includes('caldwell') ||
        cityLower.includes('lewiston') || cityLower.includes('post falls') ||
        cityLower.includes('coeur d\'alene') || cityLower.includes('moscow') ||
        cityLower.includes('pullman') || cityLower.includes('kennewick') ||
        cityLower.includes('pasco') || cityLower.includes('richland') ||
        cityLower.includes('yakima') || cityLower.includes('wenatchee') ||
        cityLower.includes('bellingham') || cityLower.includes('everett') ||
        cityLower.includes('olympia') || cityLower.includes('vancouver') ||
        cityLower.includes('eugene') || cityLower.includes('medford') ||
        cityLower.includes('roseburg') || cityLower.includes('coos bay') ||
        cityLower.includes('astoria') || cityLower.includes('newport') ||
        cityLower.includes('corvallis') || cityLower.includes('albany') ||
        cityLower.includes('lebanon') || cityLower.includes('sweet home') ||
        cityLower.includes('sublimity') || cityLower.includes('stayton') ||
        cityLower.includes('scio') || cityLower.includes('lyons') ||
        cityLower.includes('mill city') || cityLower.includes('gates') ||
        cityLower.includes('detroit') || cityLower.includes('idanha') ||
        cityLower.includes('cascadia') || cityLower.includes('united states') ||
        cityLower.includes('usa') || cityLower.includes('america') ||
        cityLower.includes('american')) {
      console.log('✅ getRegionFromCity: Detected US region');
      return 'us';
    }
    
    // Default to local
    console.log('⚠️ getRegionFromCity: No specific region detected, defaulting to local');
    return 'local';
  };

  // Track impression
  const trackImpression = useCallback(async (experienceShortUid: string, variantShortUid: string) => {
    try {
      await personalizeTrackImpression(experienceShortUid, variantShortUid);
    } catch (error) {
      console.error('Error tracking impression:', error);
    }
  }, []);

  // Track conversion
  const trackConversion = useCallback(async (eventKey: string) => {
    try {
      await personalizeTrackConversion(eventKey);
    } catch (error) {
      console.error('Error tracking conversion:', error);
    }
  }, []);

  // Get personalized content for a specific experience
  const getPersonalizedContent = useCallback((experienceShortUid: string) => {
    if (!state.manifest?.experiences) return null;
    
    return state.manifest.experiences.find(
      (exp: any) => exp.experienceShortUid === experienceShortUid
    );
  }, [state.manifest]);

  // Auto-detect city based on IP (dynamic)
  useEffect(() => {
    const detectCity = async () => {
      console.log('🔍 usePersonalize: Starting city detection...');
      try {
        // Try to get location from IP dynamically
        const location = await getLocationFromIP();
        const detectedCity = location?.city || 'Pune'; // Fallback to Pune if detection fails
        console.log('🔍 usePersonalize: Detected city:', detectedCity);
        await setUserCity(detectedCity);
        console.log('🔍 usePersonalize: City set successfully');
      } catch {
        console.error('❌ usePersonalize: Error detecting city');
        // Set fallback state even if Personalize API fails
        const fallbackCity = 'Pune';
        const fallbackRegion = getRegionFromCity(fallbackCity);
        setState(prev => ({
          ...prev,
          city: fallbackCity,
          region: fallbackRegion,
          isLoading: false,
        }));
      }
    };

    detectCity();
  }, [setUserCity]);

  // Dynamic IP-based location detection
  const getLocationFromIP = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        return {
          city: data.city,
          region: data.region,
          country: data.country,
          ip: data.ip
        };
      }
    } catch (error) {
      console.log('⚠️ IP location detection failed, using fallback');
    }
    return null;
  };

  return {
    ...state,
    setUserCity,
    trackImpression,
    trackConversion,
    getPersonalizedContent,
  };
}; 