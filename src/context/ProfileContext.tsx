import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { AvailabilityStatus, ContactInquiry, Project } from '../types';

interface ProfileContextType {
  profileImage: string;
  availabilityStatus: AvailabilityStatus;
  setAvailabilityStatus: (status: AvailabilityStatus) => void;
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  resetProjects: () => void;
  inquiries: ContactInquiry[];
  saveInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'submittedAt'>) => ContactInquiry;
  deleteInquiry: (id: string) => void;
  isHireModalOpen: boolean;
  openHireModal: (prefillService?: string) => void;
  closeHireModal: () => void;
  selectedServiceForInquiry: string;
  setSelectedServiceForInquiry: (service: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Fixed professional profile image - never changeable through the website
  const profileImage = PERSONAL_INFO.defaultPortrait;

  // Availability status state
  const [availabilityStatus, setAvailabilityStatusState] = useState<AvailabilityStatus>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('asad_availability_status') as AvailabilityStatus | null;
      if (saved) return saved;
    }
    return 'Available for Projects';
  });

  // Projects list state
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('asad_custom_projects');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore corrupted data
        }
      }
    }
    return INITIAL_PROJECTS;
  });

  // Saved Inquiries state
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('asad_contact_inquiries');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [];
  });

  // Modals state
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState('');

  // Persist availability status
  const setAvailabilityStatus = (status: AvailabilityStatus) => {
    setAvailabilityStatusState(status);
    localStorage.setItem('asad_availability_status', status);
  };

  // Persist projects
  const addProject = (project: Project) => {
    setProjects((prev) => {
      const updated = [project, ...prev];
      localStorage.setItem('asad_custom_projects', JSON.stringify(updated));
      return updated;
    });
  };

  const updateProject = (project: Project) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === project.id ? project : p));
      localStorage.setItem('asad_custom_projects', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem('asad_custom_projects', JSON.stringify(updated));
      return updated;
    });
  };

  const resetProjects = () => {
    setProjects(INITIAL_PROJECTS);
    localStorage.removeItem('asad_custom_projects');
  };

  // Inquiries
  const saveInquiry = (data: Omit<ContactInquiry, 'id' | 'submittedAt'>): ContactInquiry => {
    const newInquiry: ContactInquiry = {
      ...data,
      id: `inq_${Date.now()}`,
      submittedAt: new Date().toISOString()
    };
    setInquiries((prev) => {
      const updated = [newInquiry, ...prev];
      localStorage.setItem('asad_contact_inquiries', JSON.stringify(updated));
      return updated;
    });
    return newInquiry;
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      localStorage.setItem('asad_contact_inquiries', JSON.stringify(updated));
      return updated;
    });
  };

  const openHireModal = (prefillService?: string) => {
    if (prefillService) {
      setSelectedServiceForInquiry(prefillService);
    }
    setIsHireModalOpen(true);
  };

  const closeHireModal = () => setIsHireModalOpen(false);

  return (
    <ProfileContext.Provider
      value={{
        profileImage,
        availabilityStatus,
        setAvailabilityStatus,
        projects,
        addProject,
        updateProject,
        deleteProject,
        resetProjects,
        inquiries,
        saveInquiry,
        deleteInquiry,
        isHireModalOpen,
        openHireModal,
        closeHireModal,
        selectedServiceForInquiry,
        setSelectedServiceForInquiry
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
