import { create } from 'zustand';

const DEFAULT_ACTIVE_LINK = 'home';

interface ActiveLinkState {
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const useActiveLinkStore = create<ActiveLinkState>()((set) => ({
  activeLink: `#${DEFAULT_ACTIVE_LINK}`,
  setActiveLink: (link) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${link}`);
    }
    set({activeLink: `#${link}`})
  },
}));

export default useActiveLinkStore;