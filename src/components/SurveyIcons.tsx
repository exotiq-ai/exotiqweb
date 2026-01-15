import React from 'react';
import { Users, TrendingUp, Star } from 'lucide-react';

interface SurveyIconsProps {
  type: string;
}

const SurveyIcons: React.FC<SurveyIconsProps> = ({ type }) => {
  const iconMap = {
    small: Users,
    scaling: TrendingUp,
    exotic: Star
  };

  const Icon = iconMap[type as keyof typeof iconMap] || Users;

  return <Icon className="w-8 h-8 text-primary-500" />;
};

export default SurveyIcons;
