const CONTENTSTACK_AUTOMATION_URL = 'https://app.contentstack.com/automations-api/run/85bcaf66ce3244c88fa225fbc8ce2738';
const API_KEY = 'H9@envpjeh';

export async function callContentstackAutomation() {
  try {
    const response = await fetch(CONTENTSTACK_AUTOMATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ah-http-key': API_KEY,
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Contentstack automation response:', data);
    return data;
  } catch (error) {
    console.error('Error calling Contentstack automation:', error);
    throw error;
  }
}

export async function triggerContentstackAutomation() {
  try {
    console.log('Triggering Contentstack automation...');
    const result = await callContentstackAutomation();
    console.log('Automation triggered successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to trigger automation:', error);
    throw error;
  }
} 