export interface NavbarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
    onSearch: (query: string) => void;

  }