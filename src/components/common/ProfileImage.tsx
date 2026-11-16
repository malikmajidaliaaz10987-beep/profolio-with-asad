import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ProfileImageProps {
  className?: string;
  shape?: 'rounded' | 'circle';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  priority?: boolean;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  className = '',
  shape = 'rounded',
  size = 'hero',
  priority = false,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    hero: 'w-full aspect-[4/5] sm:aspect-square max-w-sm sm:max-w-md',
  };

  const shapeOuter = shape === 'circle' ? 'rounded-full' : 'rounded-3xl';
  const shapeInner = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

  return (
    <div
      className={`relative p-1 sm:p-1.5 bg-gradient-to-tr from-[#1769FF] via-[#16B89A] to-[#1769FF] shadow-2xl shadow-[#1769FF]/15 ${shapeOuter} ${sizeClasses[size]} ${className}`}
    >
      <div className={`w-full h-full overflow-hidden bg-slate-950 ${shapeInner}`}>
        <img
          src={PERSONAL_INFO.defaultPortrait}
          alt="Asad Ali Awan — Digital Marketing Specialist, Web Developer & AI Solutions Specialist"
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[1.01] transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
    </div>
  );
};
