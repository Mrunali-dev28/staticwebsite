'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePersonalize } from '@/lib/use-personalize';
import { fetchUSNewsEntry, fetchMaharashtraNewsEntry } from '@/lib/personalize-service';

export default function VPNTestPage() {
  const [testResults, setTestResults] = useState<any>({});
  const [ipData, setIpData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const personalizeData = usePersonalize();
  const { city, region, isLoading: personalizeLoading, error } = personalizeData || {};

  useEffect(() => {
    const runTests = async () => {
      setIsLoading(true);
      const results: any = {
        location: { city, region, isLoading: personalizeLoading, error },
        timestamp: new Date().toISOString()
      };

      // Test IP geolocation
      try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        if (ipResponse.ok) {
          const ipInfo = await ipResponse.json();
          setIpData(ipInfo);
          results.ipData = {
            success: true,
            data: {
              ip: ipInfo.ip,
              city: ipInfo.city,
              region: ipInfo.region,
              country: ipInfo.country,
              isp: ipInfo.org || ipInfo.isp,
              timezone: ipInfo.timezone
            }
          };
        }
      } catch (error) {
        results.ipData = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }

      // Test US news fetching
      try {
        const usNews = await fetchUSNewsEntry();
        results.usNews = {
          success: !!usNews,
          data: usNews ? {
            id: usNews.id,
            title: usNews.content.title,
            description: usNews.content.description
          } : null
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.usNews = { success: false, error: errorMessage };
      }

      // Test Maharashtra news fetching
      try {
        const maharashtraNews = await fetchMaharashtraNewsEntry();
        results.maharashtraNews = {
          success: !!maharashtraNews,
          data: maharashtraNews ? {
            id: maharashtraNews.id,
            title: maharashtraNews.content.title,
            description: maharashtraNews.content.description
          } : null
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.maharashtraNews = { success: false, error: errorMessage };
      }

      setTestResults(results);
      setIsLoading(false);
    };

    if (!personalizeLoading) {
      runTests();
    }
  }, [city, region, personalizeLoading, error]);

  const detectVPN = (isp: string | null, ip: string | null, city: string | null, country: string | null): boolean => {
    if (!isp) return false;
    
    const ispLower = isp.toLowerCase();
    
    const vpnKeywords = [
      'vpn', 'proxy', 'tunnel', 'nord', 'express', 'surfshark',
      'cyberghost', 'private internet access', 'pia', 'windscribe',
      'tunnelbear', 'hotspot shield', 'proton', 'mullvad', 'ivpn',
      'perfect privacy', 'airvpn', 'hide.me', 'vpn.ac', 'vpnsecure',
      'vpn unlimited', 'vpn gate', 'openvpn', 'wireguard', 'openconnect',
      'strongvpn', 'ipvanish', 'purevpn', 'vpnbook', 'hidemyass',
      'zenmate', 'browsec', 'betternet', 'opera vpn', 'hoxx vpn'
    ];
    
    const hasVPNKeyword = vpnKeywords.some(keyword => ispLower.includes(keyword));
    
    const suspiciousPatterns = [
      ip && (ip.startsWith('104.') || ip.startsWith('107.') || ip.startsWith('108.')),
      ispLower.includes('datacenter') || ispLower.includes('hosting') || ispLower.includes('server'),
      country === 'IN' && city && !['mumbai', 'delhi', 'pune', 'bangalore', 'chennai', 'hyderabad', 'kolkata'].some(indianCity => city.toLowerCase().includes(indianCity))
    ];
    
    const hasSuspiciousPattern = suspiciousPatterns.some(pattern => pattern === true);
    
    return hasVPNKeyword || hasSuspiciousPattern;
  };

  const isVPN = ipData ? detectVPN(ipData.org || ipData.isp, ipData.ip, ipData.city, ipData.country) : false;

  if (isLoading || personalizeLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading VPN detection test...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🔍 VPN Detection Test Page</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Detection */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📍 Location Detection</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <strong>City:</strong> 
              <span className={city ? 'text-green-600' : 'text-red-600'}>{city || 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <strong>Region:</strong> 
              <span className={`font-semibold ${region === 'us' ? 'text-blue-600' : region === 'delhi' ? 'text-orange-600' : 'text-green-600'}`}>
                {region || 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between">
              <strong>Loading:</strong> 
              <span className={personalizeLoading ? 'text-yellow-600' : 'text-green-600'}>
                {personalizeLoading ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <strong>Error:</strong> 
              <span className={error ? 'text-red-600' : 'text-green-600'}>{error || 'None'}</span>
            </div>
          </div>
        </div>

        {/* IP Information */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">🌐 IP Information</h2>
          {ipData ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <strong>IP Address:</strong> 
                <span className="font-mono">{ipData.ip}</span>
              </div>
              <div className="flex justify-between">
                <strong>City:</strong> 
                <span>{ipData.city || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <strong>Region:</strong> 
                <span>{ipData.region || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <strong>Country:</strong> 
                <span>{ipData.country || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <strong>ISP:</strong> 
                <span className="text-xs max-w-32 truncate" title={ipData.org || ipData.isp}>
                  {ipData.org || ipData.isp || 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between">
                <strong>Timezone:</strong> 
                <span>{ipData.timezone || 'Unknown'}</span>
              </div>
            </div>
          ) : (
            <p className="text-red-600">Failed to fetch IP data</p>
          )}
        </div>

        {/* VPN Detection */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">🛡️ VPN Detection</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <strong>VPN Status:</strong> 
              <span className={`px-3 py-1 rounded-full text-white font-semibold ${isVPN ? 'bg-red-500' : 'bg-green-500'}`}>
                {isVPN ? 'VPN DETECTED' : 'No VPN'}
              </span>
            </div>
            {isVPN && (
              <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                <p className="text-sm text-yellow-800">
                  <strong>VPN Detected!</strong> Your content should show US-based news.
                </p>
              </div>
            )}
            {!isVPN && region === 'us' && (
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                <p className="text-sm text-blue-800">
                  <strong>US Location Detected!</strong> You're accessing from a US location.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">🧪 Test Results</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <strong>Timestamp:</strong> 
              <span className="text-xs">{testResults.timestamp}</span>
            </div>
            <div className="flex justify-between">
              <strong>US News:</strong> 
              <span className={testResults.usNews?.success ? 'text-green-600' : 'text-red-600'}>
                {testResults.usNews?.success ? '✅ Success' : '❌ Failed'}
              </span>
            </div>
            <div className="flex justify-between">
              <strong>Maharashtra News:</strong> 
              <span className={testResults.maharashtraNews?.success ? 'text-green-600' : 'text-red-600'}>
                {testResults.maharashtraNews?.success ? '✅ Success' : '❌ Failed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Test Links */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">🔗 Test Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/?forceUS=true" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-blue-600 font-semibold">🔗 Force US Region</div>
            <div className="text-sm text-gray-600">/?forceUS=true</div>
          </Link>
          <Link href="/?forceDelhi=true" className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <div className="text-orange-600 font-semibold">🔗 Force Delhi Region</div>
            <div className="text-sm text-gray-600">/?forceDelhi=true</div>
          </Link>
          <Link href="/?forceMaharashtra=true" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-green-600 font-semibold">🔗 Force Maharashtra</div>
            <div className="text-sm text-gray-600">/?forceMaharashtra=true</div>
          </Link>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">📊 Detailed Results</h2>
        <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(testResults, null, 2)}
        </pre>
      </div>
    </div>
  );
}
