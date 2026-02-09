'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Shield, Users, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">TalkON</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
        <FeatureCard 
          icon={<Shield className="text-blue-500" />}
          title="End-to-End Encrypted"
          description="Your messages are for your eyes only. Powered by Signal Protocol."
        />
        <FeatureCard 
          icon={<MessageSquare className="text-green-500" />}
          title="Real-time Chat"
          description="Instant delivery with WebSocket technology and global CDN."
        />
        <FeatureCard 
          icon={<Sparkles className="text-purple-500" />}
          title="AI Powered"
          description="Smart replies, transcription, and summarization built-in."
        />
        <FeatureCard 
          icon={<Users className="text-orange-500" />}
          title="Groups & Communities"
          description="Connect with thousands of people in organized spaces."
        />
      </div>

      <div className="mt-12">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
