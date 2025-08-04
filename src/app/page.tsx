import React from 'react';
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to English page by default
  redirect('/en');
}