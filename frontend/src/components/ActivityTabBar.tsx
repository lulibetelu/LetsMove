import  { useState } from 'react';

interface ActivityTabBarProps {
    onTabChange?: (tab: 'posts' | 'events') => void;
    defaultTab?: 'posts' | 'events';
}

export default function ActivityTabBar({onTabChange, defaultTab = 'posts'}: ActivityTabBarProps) {
    const [activeTab, setActiveTab] = useState<'posts' | 'events'>(defaultTab);

    const handleTabChange = (tab: 'posts' | 'events') => {
        setActiveTab(tab);
        onTabChange?.(tab);
    };

    const tabs = [
        { id: 'posts', label: 'Posts' },
        { id: 'events', label: 'Events' }
    ] as const;

    return (
        <div className="border-b border-white/5">
            <div className="flex gap-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`relative px-6 py-4 text-sm font-semibold transition-colors duration-200 ${
                            activeTab === tab.id
                                ? 'text-white'
                                : 'text-white/50 hover:text-white/70'
                        }`}
                    >
                        {tab.label}

                        {/* Underline indicator */}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8A9A5B] animate-pulse"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

