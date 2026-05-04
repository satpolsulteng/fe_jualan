import React from 'react';

interface HeroProps {
    title: string;
    description: string;
}

const Hero: React.FC<HeroProps> = ({ title, description }) => {
    return (
        <div className="bg-primary pt-16 pb-28 px-6 text-white text-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-dark/50 rounded-full -ml-10 -mb-10 blur-2xl"></div>

            <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-extrabold font-heading mb-3 tracking-tight">
                    {title}
                </h1>
                <p className="text-primary-100 opacity-90 max-w-xl mx-auto text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Hero;
