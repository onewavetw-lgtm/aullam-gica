/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  colorTheme: string; // Tailwind color class for background highlights
  tag: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  avatarText: string;
  badge: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PlanOption {
  id: 'basic' | 'premium';
  name: string;
  price: number;
  originalPrice?: number;
  installmentsText: string;
  savingsText?: string;
  image: string;
  description: string;
  includes: string[];
  isPopular?: boolean;
}
