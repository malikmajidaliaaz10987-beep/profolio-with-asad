import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

export function useLeadFormNavigation() {
  const navigate = useNavigate();
  const { setSelectedServiceForInquiry } = useProfile();

  const scrollToLeadForm = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForInquiry(serviceName);
    }

    const existingTarget = document.getElementById('lead-form');
    if (existingTarget) {
      existingTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    navigate('/contact#lead-form');
  };

  return { scrollToLeadForm };
}
